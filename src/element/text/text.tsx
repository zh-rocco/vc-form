import { Component } from 'vue-property-decorator'
import FormMixin from '../mixin'

@Component
export default class VcText extends FormMixin {
  render() {
    console.log('render text:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-input
        vModel={this.localValue}
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}
