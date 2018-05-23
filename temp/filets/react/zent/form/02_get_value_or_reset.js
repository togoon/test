import React from 'react'
import {render} from 'react-dom' 
import 'zent/css/index.css'

import { Form, Radio, Checkbox, Button, Notify } from 'zent';
const { FormInputField, FormSelectField, FormRadioGroupField, FormCheckboxField, FormCheckboxGroupField, FormColorPickerField, FormDateRangePickerField, FormNumberInputField, FormSwitchField, createForm } = Form;

class FieldForm extends React.Component {
  state = {
    checkedList: []
  }

  onCheckboxChange = (checkedList) => {
    this.setState({ checkedList });
  }

  submit = (values, zentForm) => {
    Notify.success(JSON.stringify(values));
  };

  resetForm = () => {
    this.props.zentForm.resetFieldsValue();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit(this.submit)} >
        <FormInputField
          name="name"
          type="text"
          label="昵称:"
          required
          spellCheck={false}
          validations={{ required: true }}
          validationErrors={{ required: '请填写昵称' }}
        />
        <FormSelectField
          name="type"
          label="类型:"
          data = {[
            { value: 1, text: '普通用户' },
            { value: 2, text: '高级用户' }
          ]}
          required
          validations={{ required: true }}
          validationErrors={{ required: '请选择类型' }}
        />
        <FormRadioGroupField
          name="sex"
          label="性别:"
          required
          validations={{
            required(values, value) {
              return value !== ''
            }
          }}
          validationErrors={{
            required: '请选择性别'
          }}
        >
          <Radio value="1">男</Radio>
          <Radio value="2">女</Radio>
        </FormRadioGroupField>
        <FormCheckboxGroupField
          name="hobbies"
          label="兴趣标签:"
          value={this.state.checkedList}
          onChange={this.onCheckboxChange}
          required
          validations={{
            minLength: 1
          }}
          validationErrors={{
            minLength: '请选择标签'
          }}
        >
          <Checkbox value="movie">电影</Checkbox>
          <Checkbox value="book">书籍</Checkbox>
          <Checkbox value="travel">旅行</Checkbox>
        </FormCheckboxGroupField>
        <FormNumberInputField
          name="age"
          label="年龄:"
          showStepper
          value={12}
        />
        <FormColorPickerField
          name="color"
          label="喜欢的颜色:"
          value="#5197FF"
        />
        <FormDateRangePickerField
          name="dateRange"
          label="身份证有效期:"
          type="split"
          value={[]}
          validations={{
            required(values, value) {
              return value.length !== 0
            }
          }}
          validationErrors={{
            required: '请填写有效期'
          }}
        />
        <FormSwitchField
          name="isPublic"
          label="公开个人信息:"
          value={false}
        />
        <FormCheckboxField
          name="agree"
          label="同意许可条例:"
        >
          是
        </FormCheckboxField>
        <div className="zent-form__form-actions">
          <Button type="primary" htmlType="submit">获取表单值</Button>
          <Button type="primary" outline onClick={this.resetForm}>重置表单值</Button>
        </div>
      </Form>
    );
  }
};

const WrappedForm = createForm({scrollToError: true})(FieldForm)
render(<WrappedForm /> , document.getElementById('root'))
