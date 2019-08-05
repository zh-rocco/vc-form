import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class VcRate extends ConnectMixin {
  render() {
    console.log('render text:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-rate
        vModel={this.localValue}
      />
    )
  }
}

const options: RendererOptions = {
  name: 'vc-rate',
  description: '评分',
  component: VcRate
}

export default options
