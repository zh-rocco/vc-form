import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class VcSwitch extends ConnectMixin {
  render() {
    console.log('render switch:', this.options.name)
    const { placeholder, clearable, disabled } = this.options

    return (
      <el-switch
        vModel={this.localValue}
        disabled={disabled}
      />
    )
  }
}

const options: RendererOptions = {
  name: 'vc-switch',
  description: '开关',
  component: VcSwitch
}

export default options
