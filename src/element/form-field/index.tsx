import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class FormField extends ConnectMixin {
  render() {
    console.log('render form field:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-form-item>
        {this.$slots.default}
      </el-form-item>
    )
  }
}

const options: RendererOptions = {
  name: 'vc-form-field',
  description: '表单项',
  component: FormField,
  value: 0
}

export default options
