import { Component } from 'vue-property-decorator'
import FormMixin from '../mixin'
import SelectDriver from '@/components/SelectDriver.vue'

@Component({
  components: { SelectDriver }
})
export default class VcSelect extends FormMixin {
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
