/*
 * 官网的例子。好像什么行为都没有
 */
import React from 'react'
import {render} from 'react-dom' 
import 'zent/css/index.css'

import { Form, Icon, Pop } from 'zent';

const { FormInputField, createForm } = Form;

class FieldForm extends React.Component {
  render() {
    return (
      <Form horizontal>
        <FormInputField
          name="name"
          type="text"
          label={
            <span>用户名&nbsp;
              <Pop trigger="hover" content="用户名用于个人账号登录" centerArrow>
                <Icon type="error-circle-o" />
              </Pop>:
            </span>
          }
          helpDesc="用户名为5-25个字符"
          required
        />
        <FormInputField
          name="password"
          type="password"
          label="密码:"
          helpDesc={<span>密码由6-20位英文字母、数字组成，<a href="https://youzan.com">查看更多</a></span>}
          notice="重要提示：填写后无法修改，请谨慎设置"
          required
        />
      </Form>
    );
  }
}

const WrappedForm = createForm()(FieldForm);

render(<WrappedForm /> , document.getElementById('root'))
