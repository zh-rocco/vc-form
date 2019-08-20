import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class SliderControl extends ConnectMixin {
  render() {
    console.log('render slider:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-slider
        vModel={this.localValue}
        attrs={{ ...this.options }}
      />
    )
  }
}

const options: RendererOptions = {
  name: 'slider',
  description: '滑块',
  component: SliderControl,
  value: 0
}

export default options
