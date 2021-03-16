import * as tsx from 'vue-tsx-support'
import { ConnectMixin } from '@/core/connect'
import { typeConductionFunction } from '@/core/utils'
import { RendererOptions } from '@/types'

const TextControl = tsx.componentFactory.mixin(ConnectMixin).create({
  name: 'TextControl',

  render() {
    // console.log('render text:', this.options.name)
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
})

export default typeConductionFunction<RendererOptions<typeof TextControl>>({
  name: 'text',
  description: '文本框',
  component: TextControl
})
