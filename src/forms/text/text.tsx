import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class VcText extends Vue {
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
    console.log('render text')
    const { placeholder, clearable } = this.options

    return (
      <el-input
        vModel={this.localValue}
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}
