import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class VcTextarea extends ConnectMixin {
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
  name: 'vc-textarea',
  description: '文本框',
  component: VcTextarea
}

export default options
