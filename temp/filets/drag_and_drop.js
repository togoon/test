// React
import React, {PureComponent} from 'react'
import { render } from 'react-dom'

function dragover(ev) { 
  ev.preventDefault();
}

function drag(ev) {
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
      {/*
      onDragStart={drag} 
      */}
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
        width="336" height="69" >
        hahaha
      </div>
    </div>
  }
}

render(<Test />, document.getElementById('root'))

