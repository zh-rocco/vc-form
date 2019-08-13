import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class TextareaControl extends ConnectMixin {
  render() {
    console.log('render textarea:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-input
        vModel={this.localValue}
        type="textarea"
        placeholder={placeholder}
        clearable={clearable}
        disabled={this.isDisabled}
      />
    )
  }
}

const options: RendererOptions = {
  name: 'textarea',
  description: '文本框',
  component: TextareaControl
}

export default options
