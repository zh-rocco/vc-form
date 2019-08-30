import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class SubmitAction extends ConnectMixin {
  private async submit() {
    console.log(this.__reactiveInjection__)
    const { formIns, formIns: { $emit, validateForm, model } } = this.__reactiveInjection__
    try {
      await validateForm()
      const value = JSON.parse(JSON.stringify(model))
      formIns.$emit('submit', value)
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    // console.log('render action:', this.options.type)
    const { placeholder, clearable } = this.options

    return (
      <el-button
        type="primary"
        onClick={this.submit}
      >
        {this.$slots.default}
      </el-button>
    )
  }
}

const options: RendererOptions = {
  type: 'form-action',
  name: 'submit',
  description: '表单提交',
  component: SubmitAction
}

export default options
