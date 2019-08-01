import { Component } from 'vue-property-decorator'
import FormMixin from '../mixin'

@Component
export default class VcTime extends FormMixin {
  render() {
    console.log('render time:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-time-select
        vModel={this.localValue}
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}
