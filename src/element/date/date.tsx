import { Component } from 'vue-property-decorator'
import FormMixin from '../mixin'

@Component
export default class VcDate extends FormMixin {
  render() {
    console.log('render date:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-date-picker
        vModel={this.localValue}
        type="date"
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}
