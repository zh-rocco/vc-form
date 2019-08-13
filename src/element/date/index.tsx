import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class DateControl extends ConnectMixin {
  render() {
    console.log('render date:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-date-picker
        vModel={this.localValue}
        type="date"
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}

const options: RendererOptions = {
  name: 'date',
  description: '日期',
  component: DateControl
}

export default options
