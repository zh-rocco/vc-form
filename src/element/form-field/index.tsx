import { Component } from 'vue-property-decorator'
import { directiveStore } from '@/lib/directives'
import ConnectMixin from '../connect'
import { evalExpression } from '../utils'
import { FormFieldProps, RendererOptions } from '@/types'

const d = Object.entries(directiveStore.getAllDirectives())
  .reduce((acc: any, [key, directive]) => {
    acc[key] = directive()
    return acc
  }, {})

@Component({
  directives: d
})
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

  render() {
    console.log('render form field:', this.options.type, this.options.name)

    const directives = [
      // { name: 'visibleOn', value: this.options.visibleOn }
    ]

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
        {...{ directives }}
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
