import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import SelectDriver from '@/components/SelectDriver.vue'
import { RendererOptions } from '@/types'

@Component({
  components: { SelectDriver }
})
class VcSelect extends ConnectMixin {
  render() {
    console.log('render select')
    const { placeholder, clearable, options = [] } = this.options

    return (
      <select-driver
        vModel={this.localValue}
        data={options}
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}

const options: RendererOptions = {
  name: 'vc-select',
  description: '下拉选择器',
  component: VcSelect
}

export default options
