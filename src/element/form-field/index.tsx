import { Component } from 'vue-property-decorator'
import { directiveStore } from '@/lib/directives'
import ConnectMixin from '../connect'
import { evalExpression } from '../utils'
import { RendererOptions } from '@/types'

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

  private runDirectives() {
    for (const [name, directive] of Object.entries(directiveStore.getAllDirectives())) {
      const value = this.options[name]
      if (value === undefined) continue
      directive(this.$el, value, this)
    }
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
