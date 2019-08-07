import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class SubmitAction extends ConnectMixin {
  private async submit() {
    const { validateForm, model } = this.formIns
    try {
      await validateForm()
      console.log(JSON.stringify(model))
    } catch { }
  }

  render() {
    console.log('render action:', this.options.type)
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
  name: 'submit',
  description: '表单提交',
  component: SubmitAction
}

export default options
