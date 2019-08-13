import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class TimeControl extends ConnectMixin {
  render() {
    console.log('render time:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-time-select
        vModel={this.localValue}
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}

const options: RendererOptions = {
  name: 'time',
  description: '时间',
  component: TimeControl
}

export default options
