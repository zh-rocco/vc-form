import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import _SelectDriver from './SelectDriver.vue'
import { RendererOptions } from '@/types'

const SelectDriver: any = Vue.extend(_SelectDriver)

@Component
class SelectControl extends ConnectMixin {
  render() {
    console.log('render select:', this.options.name)
    const { placeholder, clearable, options = [] } = this.options

    return (
      <SelectDriver
        vModel={this.localValue}
        data={options}
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}

const options: RendererOptions = {
  name: 'select',
  description: '下拉选择器',
  component: SelectControl
}

export default options
