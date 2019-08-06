import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class Rate extends ConnectMixin {
  render() {
    console.log('render rate:', this.options.name)
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
  component: Rate,
  value: 0
}

export default options
