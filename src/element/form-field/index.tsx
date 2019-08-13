import { Component } from 'vue-property-decorator'
import { directiveStore } from '@/lib/directives'
import ConnectMixin from '../connect'
import { evalExpression } from '../utils'
import { FormFieldProps, RendererOptions } from '@/types'

@Component
class FormField extends ConnectMixin {
  private canVisible(value: undefined | boolean | string) {
    if (value === undefined) {
      return true
    }

    if (typeof value === 'boolean') {
      return value
    }

    if (typeof value === 'string') {
      return evalExpression(value, this.formModel)
    }

    return true
  }

  genFormItemKey(schema: FormFieldProps) {
    const { name, controls = [] } = schema
    return name || controls.map(({ name }) => name).filter(name => name).join('@')
  }

  private runDirectives() {
    for (const [name, directive] of Object.entries(directiveStore.getAllDirectives())) {
      const value = this.options[name]
      if (value === undefined) continue
      directive(this.$el, value, this)
    }
  }

  render() {
    console.log('render form field:', this.options.type, this.options.name)

    if (!this.canVisible(this.options.visibleOn)) return

    const { label, name, rules, controls, style } = this.options
    const hasChildren = Array.isArray(controls) && controls.length
    const isRequired = controls && controls.some(({ rules }) => {
      return rules && rules.some(({ required }) => required)
    })

    return (
      <el-form-item
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
}

const options: RendererOptions = {
  name: 'form-field',
  description: '表单项',
  component: FormField
}

export default options
