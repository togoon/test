// React
/*
 * react jss的最简单示例
 */
import React from 'react'
import injectSheet from 'react-jss'
import { render } from 'react-dom'

const styles = { // 定义一个style对象，跟jss很类似
  button: {
    /*
     * 特性：通过指定一个函数，可以从组件的props中取到样式！
     */
    background: props => props.color
  },
  label: {
    fontWeight: 'bold'
  }
}

/*
 * 正常地定义一个react的组件，可以是函数式，也可以用类（用类的话可以享受装饰器的语法糖）
 * 该组件会接收一个classes属性，里面包含了前面样式对象里各种样式的类名
 */
let Button = ({classes, children}) => (
  <button className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </button>
)

/*
 * 执行inject
 */
Button = injectSheet(styles)(Button)

/*
 * 这时一个自带样式的组件就这样诞生了，并且可以接收定义样式的属性
 */
render(
  <div>
    <Button color='red'>aa</Button>
    <Button color='red'>xx</Button>
  </div>
  , document.getElementById('root'))
