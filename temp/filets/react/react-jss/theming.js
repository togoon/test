// React
/*
 * theming
 */

import React from 'react'
import injectSheet, {ThemeProvider} from 'react-jss'
import {render} from 'react-dom'

const Button = ({classes, children}) => (
  <button className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </button>
)

/*
 * 使用theme模式时，style不再是一个对象，而是接收一个theme参数的函数
 */
const styles = theme => ({
  button: {
    background: theme.colorPrimary
  },
  label: {
    fontWeight: 'bold'
  }
})

/*
 * inject的方法与普通用法一样
 */
const StyledButton = injectSheet(styles)(Button)

const theme = {
  colorPrimary: 'green'
}

/*
 * 通过一个ThemeProvider注入theme的配置, 不增加dom层次
 */
const App = () => (
  <ThemeProvider theme={theme}>
    <StyledButton>I am a button with green background</StyledButton>
  </ThemeProvider>
)

render(<App />, document.getElementById('root'))
