import { Component, Prop } from 'vue-property-decorator'
import Combo from './combo'
import { RendererOptions } from '@/types'
import ConnectMixin from '../connect'

@Component({
  components: { Combo }
})
class VcCombo extends ConnectMixin {
  @Prop({ type: Object, default: () => ({}) }) readonly model!: any // form 的数据模型
  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  render() {
    console.log('render combo driver:', this.options.name)

    return (
      <combo
        prop={this.prop || ''}
        props={{ model: this.formModel }}
        attrs={this.options}
        class="inline"
      />
    )
  }
}

const options: RendererOptions = {
  name: 'vc-combo',
  description: '可增删组件',
  component: VcCombo,
  value: () => []
}

export default options
