import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import invariant from 'invariant';

import {provideDisplayName, omit} from '../utils';

// Export Higher Order Sortable Element Component
export default function sortableElement(WrappedComponent, config = {withRef: false}) {
  return class extends Component {
    static displayName = provideDisplayName('sortableElement', WrappedComponent);

    static contextTypes = {
      manager: PropTypes.object.isRequired, // 从上下文接收一个manager，暂时还不知其作用
    };

    static propTypes = {
      index: PropTypes.number.isRequired,
      collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      disabled: PropTypes.bool,
    };

    static defaultProps = {
      collection: 0, // 先不管
    };

    componentDidMount() {
      const {collection, disabled, index} = this.props;

      if (!disabled) {
        this.setDraggable(collection, index); // 设置draggable
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.index !== nextProps.index && this.node) {
        this.node.sortableInfo.index = nextProps.index;
      }
      if (this.props.disabled !== nextProps.disabled) {
        const {collection, disabled, index} = nextProps;
        if (disabled) {
          this.removeDraggable(collection);
        } else {
          this.setDraggable(collection, index);
        }
      } else if (this.props.collection !== nextProps.collection) {
        this.removeDraggable(this.props.collection);
        this.setDraggable(nextProps.collection, nextProps.index);
      }
    }

    componentWillUnmount() { // 移除draggable
      const {collection, disabled} = this.props;

      if (!disabled) this.removeDraggable(collection); 
    }

    setDraggable(collection, index) {
      const node = (this.node = findDOMNode(this));

      node.sortableInfo = { // 将拖动相关的信息注入到dom node里
        index,
        collection,
        manager: this.context.manager,
      };

      this.ref = {node};
      this.context.manager.add(collection, this.ref); // 注册到manager里
    }

    removeDraggable(collection) {
      this.context.manager.remove(collection, this.ref);
    }

    getWrappedInstance() {
      invariant(
        config.withRef,
        'To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call'
      );
      return this.refs.wrappedInstance;
    }

    render() {
      const ref = config.withRef ? 'wrappedInstance' : null;

      return (
        <WrappedComponent
          ref={ref}
          {...omit(this.props, 'collection', 'disabled', 'index')}
        />
      );
    }
  };
}
