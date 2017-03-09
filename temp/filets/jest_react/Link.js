import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

/*
 * 一个很普通的React组件，用来作为测试的例子
 * 主要特性是（也是需要测试的点）
 * 0、初始状态，class='normal'
 * 1、鼠标悬停，class='hovered'
 * 2、鼠标移开，class恢复为normal
 */
export default class Link extends React.Component {

  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  /*
   * 注：这里用enter和leave来处理hover，但在失效的按钮上行为会有异常
   * 所以暂时用万能的move + out
   */
  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}>
        {this.props.children}
      </a>
    );
  }

}
