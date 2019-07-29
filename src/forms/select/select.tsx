import { Component, Prop, Vue } from 'vue-property-decorator'
import SelectDriver from '@/components/SelectDriver.vue'

@Component({
  components: { SelectDriver }
})
export default class VcSelect extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly model!: any // form 的数据模型
  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  private get prop () {
    const { name } = this.options
    return this.model[name]
  }

  private get localValue () {
    return this.model[this.prop]
  }
  private set localValue (value: any[]) {
    this.model[this.prop] = value
  }

  render () {
    console.log('render select')
    const { placeholder, clearable, options = [] } = this.options

    return (
      <select-driver vModel={this.localValue} data={options} />
    )
  }
}
