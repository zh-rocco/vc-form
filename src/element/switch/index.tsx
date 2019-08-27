import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class SwitchControl extends ConnectMixin {
  render() {
    // console.log('render switch:', this.options.name)
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
  name: 'switch',
  description: '开关',
  component: SwitchControl,
  value: false
}

export default options
