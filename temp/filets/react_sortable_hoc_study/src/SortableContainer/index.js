import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import invariant from 'invariant';

import Manager from '../Manager';
import {
  closest,
  events,
  vendorPrefix,
  limit,
  getElementMargin,
  provideDisplayName,
  omit,
} from '../utils';

// Export Higher Order Sortable Container Component
export default function sortableContainer(WrappedComponent, config = {withRef: false}) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.manager = new Manager(); // 直接安装一个外部的manager
      this.events = {
        start: this.handleStart,
        move: this.handleMove,
        end: this.handleEnd,
      };

      invariant(
        !(props.distance && props.pressDelay),
        'Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.'
      );

      this.state = {};
    }

    static displayName = provideDisplayName('sortableList', WrappedComponent);

    static defaultProps = {
      axis: 'y',
      transitionDuration: 300,
      pressDelay: 0,
      pressThreshold: 5,
      distance: 0,
      useWindowAsScrollContainer: false,
      hideSortableGhost: true,
      shouldCancelStart: function(e) {
        // Cancel sorting if the event target is an `input`, `textarea`, `select` or `option`
        const disabledElements = ['input', 'textarea', 'select', 'option', 'button'];

        if (disabledElements.indexOf(e.target.tagName.toLowerCase()) !== -1) {
          return true; // Return true to cancel sorting
        }
      },
      lockToContainerEdges: false,
      lockOffset: '50%',
      getHelperDimensions: ({node}) => ({
        width: node.offsetWidth,
        height: node.offsetHeight,
      }),
    };

    static propTypes = {
      axis: PropTypes.oneOf(['x', 'y', 'xy']),
      distance: PropTypes.number,
      lockAxis: PropTypes.string,
      helperClass: PropTypes.string,
      transitionDuration: PropTypes.number,
      contentWindow: PropTypes.any,
      onSortStart: PropTypes.func,
      onSortMove: PropTypes.func,
      onSortEnd: PropTypes.func,
      shouldCancelStart: PropTypes.func,
      pressDelay: PropTypes.number,
      useDragHandle: PropTypes.bool,
      useWindowAsScrollContainer: PropTypes.bool,
      hideSortableGhost: PropTypes.bool,
      lockToContainerEdges: PropTypes.bool,
      lockOffset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        ),
      ]),
      getContainer: PropTypes.func,
      getHelperDimensions: PropTypes.func,
    };

    static childContextTypes = {
      manager: PropTypes.object.isRequired,
    };

    getChildContext() {
      return {
        manager: this.manager,
      };
    }

    componentDidMount() {
      const {
        getContainer,
        useWindowAsScrollContainer,
      } = this.props;

      /*
       *  Set our own default rather than using defaultProps because Jest
       *  snapshots will serialize window, causing a RangeError
       *  https://github.com/clauderic/react-sortable-hoc/issues/249
       */
      const contentWindow = this.props.contentWindow || window;

      // 取到container，通常是this的dom
      this.container = typeof getContainer === 'function'
        ? getContainer(this.getWrappedInstance())
        : findDOMNode(this);
      this.document = this.container.ownerDocument || document;
      this.scrollContainer = useWindowAsScrollContainer
        ? this.document.body
        : this.container;
      this.contentWindow = typeof contentWindow === 'function'
        ? contentWindow()
        : contentWindow;


      for (const key in this.events) { // 注册相关事件，包括鼠标以及手势的移动
        if (this.events.hasOwnProperty(key)) {
          events[key].forEach(eventName =>
            this.container.addEventListener(eventName, this.events[key], false)
          );
        }
      }
    }

    componentWillUnmount() {
      // 移除开始时注册的事件
      for (const key in this.events) {
        if (this.events.hasOwnProperty(key)) {
          events[key].forEach(eventName =>
            this.container.removeEventListener(eventName, this.events[key])
          );
        }
      }
    }

    handleStart = e => { // 开始拖动
      const {distance, shouldCancelStart} = this.props;

      // 如果是右键，或者是一些特殊的html元素比如一些表单控件，则取消拖动操作
      if (e.button === 2 || shouldCancelStart(e)) {
        return false;
      }

      this._touched = true;
      this._pos = {
        x: e.pageX,
        y: e.pageY,
      };

      // 一直往上追溯，找到打了sortable info标签的结点
      const node = closest(e.target, el => el.sortableInfo != null);

      // 如果是自己所管辖的SortableElement
      if (
        node &&
        node.sortableInfo &&
        this.nodeIsChild(node) && 
        !this.state.sorting
      ) {
        const {useDragHandle} = this.props;
        const {index, collection} = node.sortableInfo;

        if ( // 处理没有设置handle的情况
          useDragHandle && !closest(e.target, el => el.sortableHandle != null)
        )
          return;

        this.manager.active = {index, collection}; // 设置当前的active对象

        /*
				 * Fixes a bug in Firefox where the :active state of anchor tags
				 * prevent subsequent 'mousemove' events from being fired
				 * (see https://github.com/clauderic/react-sortable-hoc/issues/118)
				 */
        if (e.target.tagName.toLowerCase() === 'a') {
          e.preventDefault();
        }

        if (!distance) {
          if (this.props.pressDelay === 0) {
            this.handlePress(e);
          } else {
            this.pressTimer = setTimeout(
              () => this.handlePress(e),
              this.props.pressDelay
            );
          }
        }
      }
    };

    nodeIsChild = node => { // 判断是不是自己下属的SortableElement
      return node.sortableInfo.manager === this.manager;
    };

    handleMove = e => {
      const {distance, pressThreshold} = this.props;

      if (!this.state.sorting && this._touched) {
        this._delta = {
          x: this._pos.x - e.pageX,
          y: this._pos.y - e.pageY,
        };
        const delta = Math.abs(this._delta.x) + Math.abs(this._delta.y);

        if (!distance && (!pressThreshold || (pressThreshold && delta >= pressThreshold))) {
          clearTimeout(this.cancelTimer);
          this.cancelTimer = setTimeout(this.cancel, 0);
        } else if (distance && delta >= distance && this.manager.isActive()) {
          this.handlePress(e);
        }
      }
    };

    handleEnd = () => {
      const {distance} = this.props;

      this._touched = false;

      if (!distance) {
        this.cancel();
      }
    };

    cancel = () => { // 主要工作之一是取消press timer
      if (!this.state.sorting) {
        clearTimeout(this.pressTimer);
        this.manager.active = null;
      }
    };

    handlePress = e => { // 被handleStart调用
      /*
       * 之所以又单独分离一个handlePress，似乎本意是用来
       */
      const active = this.manager.getActive();

      if (active) {
        const {
          axis,
          getHelperDimensions,
          helperClass,
          hideSortableGhost,
          onSortStart,
          useWindowAsScrollContainer,
        } = this.props;

        // ... 一系列的设置
        const {node, collection} = active;
        const {index} = node.sortableInfo;
        const margin = getElementMargin(node);

        const containerBoundingRect = this.container.getBoundingClientRect();
        const dimensions = getHelperDimensions({index, node, collection});

        this.node = node;
        this.margin = margin;
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.marginOffset = {
          x: this.margin.left + this.margin.right,
          y: Math.max(this.margin.top, this.margin.bottom),
        };
        this.boundingClientRect = node.getBoundingClientRect();
        this.containerBoundingRect = containerBoundingRect;
        this.index = index;
        this.newIndex = index;

        this.axis = {
          x: axis.indexOf('x') >= 0,
          y: axis.indexOf('y') >= 0,
        };
        this.offsetEdge = this.getEdgeOffset(node);
        this.initialOffset = this.getOffset(e);
        this.initialScroll = {
          top: this.scrollContainer.scrollTop,
          left: this.scrollContainer.scrollLeft,
        };

        this.initialWindowScroll = {
          top: window.pageYOffset,
          left: window.pageXOffset,
        };

        /////////////////////// 生成拖动时候的helper ////////////////////////////
        /// 先把活动的node克隆一个
        const fields = node.querySelectorAll('input, textarea, select');
        const clonedNode = node.cloneNode(true);

        // 手动指定一下克隆出来的文本框的值
        const clonedFields = [
          ...clonedNode.querySelectorAll('input, textarea, select'),
        ]; // Convert NodeList to Array

        clonedFields.forEach((field, index) => {
          if (field.type !== 'file' && fields[index]) {
            field.value = fields[index].value;
          }
        });

        this.helper = this.document.body.appendChild(clonedNode);

        this.helper.style.position = 'fixed';
        this.helper.style.top = `${this.boundingClientRect.top - margin.top}px`;
        this.helper.style.left = `${this.boundingClientRect.left - margin.left}px`;
        this.helper.style.width = `${this.width}px`;
        this.helper.style.height = `${this.height}px`;
        this.helper.style.boxSizing = 'border-box';
        this.helper.style.pointerEvents = 'none';

        if (hideSortableGhost) {
          this.sortableGhost = node;
          node.style.visibility = 'hidden';
          node.style.opacity = 0;
        }

        // 暂时还不知道这两个值是什么来干嘛的
        this.minTranslate = {};
        this.maxTranslate = {};
        if (this.axis.x) {
          this.minTranslate.x = (useWindowAsScrollContainer
            ? 0
            : containerBoundingRect.left) -
            this.boundingClientRect.left -
            this.width / 2;
          this.maxTranslate.x = (useWindowAsScrollContainer
            ? this.contentWindow.innerWidth
            : containerBoundingRect.left + containerBoundingRect.width) -
            this.boundingClientRect.left -
            this.width / 2;
        }
        if (this.axis.y) {
          this.minTranslate.y = (useWindowAsScrollContainer ? 0 : containerBoundingRect.top) - this.boundingClientRect.top - this.height / 2;
          this.maxTranslate.y = (useWindowAsScrollContainer
            ? this.contentWindow.innerHeight
            : containerBoundingRect.top + containerBoundingRect.height) -
            this.boundingClientRect.top -
            this.height / 2;
        }

        if (helperClass) {
          this.helper.classList.add(...helperClass.split(' '));
        }

        this.listenerNode = e.touches ? node : this.contentWindow;
        events.move.forEach(eventName =>
          this.listenerNode.addEventListener(
            eventName,
            this.handleSortMove,
            false
          ));
        events.end.forEach(eventName =>
          this.listenerNode.addEventListener(
            eventName,
            this.handleSortEnd,
            false
          ));

        this.setState({
          sorting: true,
          sortingIndex: index,
        });

        if (onSortStart) onSortStart({node, index, collection}, e);
      }
    };

    handleSortMove = e => {
      const {onSortMove} = this.props;
      e.preventDefault(); // Prevent scrolling on mobile

      this.updatePosition(e);
      this.animateNodes();
      this.autoscroll();

      if (onSortMove) onSortMove(e);
    };

    handleSortEnd = e => {
      const {hideSortableGhost, onSortEnd} = this.props;
      const {collection} = this.manager.active;

      // Remove the event listeners if the node is still in the DOM
      if (this.listenerNode) {
        events.move.forEach(eventName =>
          this.listenerNode.removeEventListener(
            eventName,
            this.handleSortMove
          ));
        events.end.forEach(eventName =>
          this.listenerNode.removeEventListener(eventName, this.handleSortEnd));
      }

      // Remove the helper from the DOM
      this.helper.parentNode.removeChild(this.helper);

      if (hideSortableGhost && this.sortableGhost) {
        this.sortableGhost.style.visibility = '';
        this.sortableGhost.style.opacity = '';
      }

      const nodes = this.manager.refs[collection];
      for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i];
        const el = node.node;

        // Clear the cached offsetTop / offsetLeft value
        node.edgeOffset = null;

        // Remove the transforms / transitions
        el.style[`${vendorPrefix}Transform`] = '';
        el.style[`${vendorPrefix}TransitionDuration`] = '';
      }

      // Stop autoscroll
      clearInterval(this.autoscrollInterval);
      this.autoscrollInterval = null;

      // Update state
      this.manager.active = null;

      this.setState({
        sorting: false,
        sortingIndex: null,
      });

      if (typeof onSortEnd === 'function') {
        onSortEnd(
          {
            oldIndex: this.index,
            newIndex: this.newIndex,
            collection,
          },
          e
        );
      }

      this._touched = false;
    };

    getEdgeOffset(node, offset = {top: 0, left: 0}) {
      // Get the actual offsetTop / offsetLeft value, no matter how deep the node is nested
      if (node) {
        const nodeOffset = {
          top: offset.top + node.offsetTop,
          left: offset.left + node.offsetLeft,
        };
        if (node.parentNode !== this.container) {
          return this.getEdgeOffset(node.parentNode, nodeOffset);
        } else {
          return nodeOffset;
        }
      }
    }

    getOffset(e) { // 取到当前事件的绝对坐标
      return {
        x: e.touches ? e.touches[0].pageX : e.pageX,
        y: e.touches ? e.touches[0].pageY : e.pageY,
      };
    }

    getLockPixelOffsets() {
      let {lockOffset} = this.props;

      if (!Array.isArray(lockOffset)) {
        lockOffset = [lockOffset, lockOffset];
      }

      invariant(
        lockOffset.length === 2,
        'lockOffset prop of SortableContainer should be a single ' +
          'value or an array of exactly two values. Given %s',
        lockOffset
      );

      const [minLockOffset, maxLockOffset] = lockOffset;

      return [
        this.getLockPixelOffset(minLockOffset),
        this.getLockPixelOffset(maxLockOffset),
      ];
    }

    getLockPixelOffset(lockOffset) {
      let offsetX = lockOffset;
      let offsetY = lockOffset;
      let unit = 'px';

      if (typeof lockOffset === 'string') {
        const match = /^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(lockOffset);

        invariant(
          match !== null,
          'lockOffset value should be a number or a string of a ' +
            'number followed by "px" or "%". Given %s',
          lockOffset
        );

        offsetX = (offsetY = parseFloat(lockOffset));
        unit = match[1];
      }

      invariant(
        isFinite(offsetX) && isFinite(offsetY),
        'lockOffset value should be a finite. Given %s',
        lockOffset
      );

      if (unit === '%') {
        offsetX = offsetX * this.width / 100;
        offsetY = offsetY * this.height / 100;
      }

      return {
        x: offsetX,
        y: offsetY,
      };
    }

    updatePosition(e) { // 令helper的绝对位置跟随鼠标
      const {lockAxis, lockToContainerEdges} = this.props;

      const offset = this.getOffset(e);
      const translate = { // 取到坐标差
        x: offset.x - this.initialOffset.x,
        y: offset.y - this.initialOffset.y,
      };

      // Adjust for window scroll
      translate.y -= (window.pageYOffset - this.initialWindowScroll.top);
      translate.x -= (window.pageXOffset - this.initialWindowScroll.left);

      this.translate = translate;

      if (lockToContainerEdges) {
        const [minLockOffset, maxLockOffset] = this.getLockPixelOffsets();
        const minOffset = {
          x: this.width / 2 - minLockOffset.x,
          y: this.height / 2 - minLockOffset.y,
        };
        const maxOffset = {
          x: this.width / 2 - maxLockOffset.x,
          y: this.height / 2 - maxLockOffset.y,
        };

        translate.x = limit(
          this.minTranslate.x + minOffset.x,
          this.maxTranslate.x - maxOffset.x,
          translate.x
        );
        translate.y = limit(
          this.minTranslate.y + minOffset.y,
          this.maxTranslate.y - maxOffset.y,
          translate.y
        );
      }

      if (lockAxis === 'x') {
        translate.y = 0;
      } else if (lockAxis === 'y') {
        translate.x = 0;
      }

      this.helper.style[
        `${vendorPrefix}Transform`
      ] = `translate3d(${translate.x}px,${translate.y}px, 0)`;
    }

    animateNodes() { // 调整其他item的位置，并实现动画效果. 在handleMove的时候被调用
      const {transitionDuration, hideSortableGhost} = this.props;
      // nodes代表了用来排序的item
      const nodes = this.manager.getOrderedRefs();

      const deltaScroll = {
        left: this.scrollContainer.scrollLeft - this.initialScroll.left,
        top: this.scrollContainer.scrollTop - this.initialScroll.top,
      };
      const sortingOffset = {
        left: this.offsetEdge.left + this.translate.x + deltaScroll.left,
        top: this.offsetEdge.top + this.translate.y + deltaScroll.top,
      };
      const scrollDifference = {
        top: (window.pageYOffset - this.initialWindowScroll.top),
        left: (window.pageXOffset - this.initialWindowScroll.left),
      };
      this.newIndex = null;

      for (let i = 0, len = nodes.length; i < len; i++) {
        const {node} = nodes[i];
        const index = node.sortableInfo.index;
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const offset = {
          width: this.width > width ? width / 2 : this.width / 2,
          height: this.height > height ? height / 2 : this.height / 2,
        };

        const translate = {
          x: 0,
          y: 0,
        };
        let {edgeOffset} = nodes[i];

        // If we haven't cached the node's offsetTop / offsetLeft value
        if (!edgeOffset) {
          nodes[i].edgeOffset = (edgeOffset = this.getEdgeOffset(node));
        }

        // Get a reference to the next and previous node
        const nextNode = i < nodes.length - 1 && nodes[i + 1];
        const prevNode = i > 0 && nodes[i - 1];

        // Also cache the next node's edge offset if needed.
        // We need this for calculating the animation in a grid setup
        if (nextNode && !nextNode.edgeOffset) {
          nextNode.edgeOffset = this.getEdgeOffset(nextNode.node);
        }

        // If the node is the one we're currently animating, skip it
        if (index === this.index) {
          if (hideSortableGhost) {
            /*
						 * With windowing libraries such as `react-virtualized`, the sortableGhost
						 * node may change while scrolling down and then back up (or vice-versa),
						 * so we need to update the reference to the new node just to be safe.
						 */
            this.sortableGhost = node;
            node.style.visibility = 'hidden';
            node.style.opacity = 0;
          }
          continue;
        }

        if (transitionDuration) { // 设置transition
          node.style[
            `${vendorPrefix}TransitionDuration`
          ] = `${transitionDuration}ms`;
        }

        if (this.axis.x) { // 指的是水平方向的sortable
          if (this.axis.y) {
            // Calculations for a grid setup
            if (
              index < this.index &&
              (
                ((sortingOffset.left + scrollDifference.left) - offset.width <= edgeOffset.left &&
                (sortingOffset.top + scrollDifference.top) <= edgeOffset.top + offset.height) ||
                (sortingOffset.top + scrollDifference.top) + offset.height <= edgeOffset.top
              )
            ) {
              // If the current node is to the left on the same row, or above the node that's being dragged
              // then move it to the right
              translate.x = this.width + this.marginOffset.x;
              if (
                edgeOffset.left + translate.x >
                this.containerBoundingRect.width - offset.width
              ) {
                // If it moves passed the right bounds, then animate it to the first position of the next row.
                // We just use the offset of the next node to calculate where to move, because that node's original position
                // is exactly where we want to go
                translate.x = nextNode.edgeOffset.left - edgeOffset.left;
                translate.y = nextNode.edgeOffset.top - edgeOffset.top;
              }
              if (this.newIndex === null) {
                this.newIndex = index;
              }
            } else if (
              index > this.index &&
              (
                ((sortingOffset.left + scrollDifference.left) + offset.width >= edgeOffset.left &&
                (sortingOffset.top + scrollDifference.top) + offset.height >= edgeOffset.top) ||
                (sortingOffset.top + scrollDifference.top) + offset.height >= edgeOffset.top + height
              )
            ) {
              // If the current node is to the right on the same row, or below the node that's being dragged
              // then move it to the left
              translate.x = -(this.width + this.marginOffset.x);
              if (
                edgeOffset.left + translate.x <
                this.containerBoundingRect.left + offset.width
              ) {
                // If it moves passed the left bounds, then animate it to the last position of the previous row.
                // We just use the offset of the previous node to calculate where to move, because that node's original position
                // is exactly where we want to go
                translate.x = prevNode.edgeOffset.left - edgeOffset.left;
                translate.y = prevNode.edgeOffset.top - edgeOffset.top;
              }
              this.newIndex = index;
            }
          } else {
            if (
              index > this.index &&
              (sortingOffset.left + scrollDifference.left) + offset.width >= edgeOffset.left
            ) {
              translate.x = -(this.width + this.marginOffset.x);
              this.newIndex = index;
            } else if (
              index < this.index &&
              (sortingOffset.left + scrollDifference.left) <= edgeOffset.left + offset.width
            ) {
              translate.x = this.width + this.marginOffset.x;
              if (this.newIndex == null) {
                this.newIndex = index;
              }
            }
          }
        } 
        else if (this.axis.y) { // 竖直方向的sortable，默认（以及大多数场景）是这种情况
          if (
            index > this.index &&
            (sortingOffset.top + scrollDifference.top) + offset.height >= edgeOffset.top
          ) {
            translate.y = -(this.height + this.marginOffset.y);
            this.newIndex = index;
          } else if (
            index < this.index &&
            (sortingOffset.top + scrollDifference.top) <= edgeOffset.top + offset.height
          ) {
            translate.y = this.height + this.marginOffset.y;
            if (this.newIndex == null) {
              this.newIndex = index;
            }
          }
        }
        node.style[`${vendorPrefix}Transform`] = `translate3d(${translate.x}px,${translate.y}px,0)`; // 设置transform
      }

      if (this.newIndex == null) {
        this.newIndex = this.index;
      }
    }

    autoscroll = () => {
      const translate = this.translate;
      const direction = {
        x: 0,
        y: 0,
      };
      const speed = {
        x: 1,
        y: 1,
      };
      const acceleration = {
        x: 10,
        y: 10,
      };

      if (translate.y >= this.maxTranslate.y - this.height / 2) {
        direction.y = 1; // Scroll Down
        speed.y = acceleration.y * Math.abs((this.maxTranslate.y - this.height / 2 - translate.y) / this.height);
      } else if (translate.x >= this.maxTranslate.x - this.width / 2) {
        direction.x = 1; // Scroll Right
        speed.x = acceleration.x * Math.abs((this.maxTranslate.x - this.width / 2 - translate.x) / this.width);
      } else if (translate.y <= this.minTranslate.y + this.height / 2) {
        direction.y = -1; // Scroll Up
        speed.y = acceleration.y * Math.abs((translate.y - this.height / 2 - this.minTranslate.y) / this.height);
      } else if (translate.x <= this.minTranslate.x + this.width / 2) {
        direction.x = -1; // Scroll Left
        speed.x = acceleration.x * Math.abs((translate.x - this.width / 2 - this.minTranslate.x) / this.width);
      }

      if (this.autoscrollInterval) {
        clearInterval(this.autoscrollInterval);
        this.autoscrollInterval = null;
        this.isAutoScrolling = false;
      }

      if (direction.x !== 0 || direction.y !== 0) {
        this.autoscrollInterval = setInterval(
          () => {
            this.isAutoScrolling = true;
            const offset = {
              left: 1 * speed.x * direction.x,
              top: 1 * speed.y * direction.y,
            };
            this.scrollContainer.scrollTop += offset.top;
            this.scrollContainer.scrollLeft += offset.left;
            this.translate.x += offset.left;
            this.translate.y += offset.top;
            this.animateNodes();
          },
          5
        );
      }
    };

    getWrappedInstance() {
      invariant(
        config.withRef,
        'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call'
      );
      return this.refs.wrappedInstance;
    }

    render() {
      const ref = config.withRef ? 'wrappedInstance' : null;

      return (
        <WrappedComponent
          ref={ref}
          {...omit(
            this.props,
            'contentWindow',
            'useWindowAsScrollContainer',
            'distance',
            'helperClass',
            'hideSortableGhost',
            'transitionDuration',
            'useDragHandle',
            'pressDelay',
            'pressThreshold',
            'shouldCancelStart',
            'onSortStart',
            'onSortMove',
            'onSortEnd',
            'axis',
            'lockAxis',
            'lockOffset',
            'lockToContainerEdges',
            'getContainer',
            'getHelperDimensions'
          )}
        />
      );
    }
  };
}
