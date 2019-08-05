import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class VcText extends ConnectMixin {
  render() {
    console.log('render text:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-input
        vModel={this.localValue}
        placeholder={placeholder}
        clearable={clearable}
      />
    )
  }
}

const options: RendererOptions = {
  name: 'vc-text',
  description: '文本框',
  component: VcText
}

export default options
