// React
/*
 * 演示sortable里又包一个sortable的情况
 * 似乎结果还比较理想，内层sortable事件优先于外层
 */
import React, {Component} from 'react';
import {render, 
  // findDOMNode
} from 'react-dom';
import {SortableContainer, SortableElement, 
  // arrayMove,
} from 'react-sortable-hoc';
import {H, V} from './utils/components/Flex.js'

@SortableElement
class Div extends Component {
  render() {
    const {children} = this.props
    return <div style={{border:`1px solid gray`, flex:1}}>{children}</div>
  }
}

const Inner = SortableContainer(()=>{
  return <H>
    <Div index={1}>1</Div>
    <Div index={2}>2</Div>
    <Div index={3}>3</Div>
  </H>
})

const Test = SortableContainer(() => {
  return (
    <V style={{height:300, width:200, overflow:'auto'}} >
      <Div index={1}>1</Div>
      <Div index={2}>2</Div>
      <Div index={3}>3</Div>
      <Div index={4}>4</Div>
      <Div index={5}>5</Div>
      <Div index={6}>
        <Inner axis='x' />
      </Div>
    </V>
  );
});

render(<Test />, document.getElementById('root'));

