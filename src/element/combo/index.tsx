import { Component, Prop, Vue } from 'vue-property-decorator'
import Combo from './combo'
import { RendererOptions } from '@/types'

@Component({
  components: { Combo }
})
class ComboDriver extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly model!: any // form 的数据模型
  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  private get prop () {
    const { name } = this.options
    return this.model[name]
  }

  // combo 组件的数据模型
  private get localValue () {
    return this.model[this.prop]
  }
  private set localValue (value: any[]) {
    this.model[this.prop] = value
  }

  render () {
    console.log('render text')

    return (
      <combo prop={this.prop || ''} {...{ attrs: this.options }}/>
    )
  }
}

const options: RendererOptions = {
  name: 'vc-combo',
  description: '可增删组件',
  component: ComboDriver
}

export default options
