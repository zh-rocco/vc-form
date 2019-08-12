import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { evalExpression } from '../utils'
import { RendererOptions } from '@/types'

@Component
class FormField extends ConnectMixin {
  private canVisible(visibleOn: undefined | boolean | string) {
    if (visibleOn === undefined) {
      return true
    }

    if (typeof visibleOn === 'boolean') {
      return visibleOn
    }

    if (typeof visibleOn === 'string') {
      return evalExpression(visibleOn, this.formModel)
    }

    return true
  }

  render() {
    console.log('render form field:', this.options.type, this.options.name)
    const { placeholder, clearable, visibleOn } = this.options

    if (!this.canVisible(visibleOn)) return

    return (
      <el-form-item
        attrs={{ ...this.$attrs }}
      >
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
