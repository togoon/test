// React 
/*
 * zIndex的原理示例
 */

class Test extends PureComponent {
  render() {
    const div1 = {
      style : {
        // position : 'relative',
        // zIndex : 4,
      },
      onClick : e=>console.log(1),
    }

    const div11 = { 
      style : {
        position : 'fixed',
        top : 0,
        left : 0,
        width : 300,
        height : 300,
        backgroundColor : 'yellow',
        zIndex : 99,
      },
      onClick : e=>console.log(11),
    }

    const div2 = {
      style : {
        position : 'relative',
        width : 100,
        height : 100,
        backgroundColor : 'green',
        zIndex : 3,
      },
      onClick : e=>console.log(2),
    }

    const div22 = {
      style : {
        position : 'fixed',
        top : 50,
        left : 50,
        width : 30,
        height : 30,
        backgroundColor : 'red',
        zIndex : 9999, // zIndex最高，但仍然会被遮罩给遮住
      },
      onClick : e=>console.log(22),
    }

    return <div>
      <div {...div1}>
        <div {...div11} />
      </div>
      <div {...div2}>
        <div {...div22} />
      </div>
    </div>
  }
}

render(<Test />, document.getElementById('root'))

