// React
import React, {PureComponent} from 'react'
import { render } from 'react-dom'

/*
 * 注：一定要响应dragover，否则无法drop
 * 好像只需要preventDefault即可
 * 对象对外层元素prevent default之后，内层元素就不需要再preventDefault了
 */
function dragover(ev) {
  ev.preventDefault();
}

/*
 * 设置drag时传递的数据
 */
function dragstart(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

class Test extends PureComponent {

  render() {
    return <div>
      <p>Drag the W3Schools image into the rectangle:</p>
      <div id="div1" 
        style={{
          width: 350,
          height: 70,
          padding: 10,
          border: '1px solid #aaaaaa',
        }}
        onDragOver={dragover}
        onDrop={drop} 
      ></div>
      <br />
      <div id="drag1" draggable="true" 
        width="336" height="69" 
        onDragStart={dragstart} 
      >
        hahaha
      </div>
    </div>
  }
}

render(<Test />, document.getElementById('root'))

