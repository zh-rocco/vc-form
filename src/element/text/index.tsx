import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class TextControl extends ConnectMixin {
  render() {
    console.log('render text:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-input
        vModel={this.localValue}
        placeholder={placeholder}
        clearable={clearable}
        disabled={this.isDisabled}
      />
    )
  }
}

const options: RendererOptions = {
  name: 'text',
  description: '文本框',
  component: TextControl
}

export default options
