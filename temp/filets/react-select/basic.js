// @flow React 
/*
 * react-select的基本用法
 */
import React, { PureComponent } from 'react'
import {render} from 'react-dom'
import _ from 'lodash'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class App extends PureComponent {
  state = {
    selectedOption: '',
  }

  /*
   * 注：onChange得到的是整个option对象，而不是value
   */
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: `, selectedOption);
  }

  render() {
    const style = {
      /*
       * 最外层有一个wrapper，通常设置整体的样式的话，应优先考虑该属性
       */
      wrapperStyle : {
        width : 100,
      },

      /*
       * 应该是主控件的style
       */
      // style : {
      //   width : 100,
      // },

      /*
       * 选项有一个wrapper，也可以注入style
       */
      // menuContainerStyle : {
      //   width : 100,
      // },

      /*
       * 选项的style
       */
      // menuStyle : {
      //   width : 100,
      // },

      name : 'xxx', // 表单项的名字
    }

    return (
      <Select
        {...style}
        value={_.get(this, 'state.selectedOption.value')}
        onChange={this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
      />
    );
  }
}

render(<App />, document.getElementById('root'))

