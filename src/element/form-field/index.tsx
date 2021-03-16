import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { FormFieldProps, RendererOptions } from '@/types'

@Component
class FormField extends ConnectMixin {
  genFormItemKey(schema: FormFieldProps) {
    const { name, controls = [] } = schema
    return name || controls.map(({ name }) => name).filter(name => name).join('@')
  }

  renderFormField() {
    const { label, name, rules, controls, style } = this.options
    const hasChildren = Array.isArray(controls) && controls.length
    const isRequired = controls && controls.some(({ rules }) => {
      return !!(rules && rules.some(({ required }) => required))
    })

    return (
      <el-form-item
        ref="formField"
        key={this.genFormItemKey(this.options)}
        label={label}
        prop={hasChildren ? undefined : name}
        rules={isRequired ? rules || { required: true } : rules}
        attrs={{ ...this.$attrs }}
        class={hasChildren ? 'nested' : undefined}
      >
        {this.$slots.default}
      </el-form-item>
    )
  }

  render() {
    // console.log('render form field:', this.options.type, this.options.name)

    return this.isVisible ? this.renderFormField() : undefined
  }
}

const options: RendererOptions = {
  name: 'form-field',
  description: '表单项',
  component: FormField
}

export default options
