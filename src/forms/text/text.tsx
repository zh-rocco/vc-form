import { Component, Prop, Inject, Vue } from 'vue-property-decorator'

@Component
export default class VcText extends Vue {
  @Inject({ default () { return {} } }) readonly formModel!: any

  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  private get prop () {
    const { name } = this.options
    return name
  }

  private get localValue () {
    return this.formModel[this.prop]
  }
  private set localValue (value: any[]) {
    this.formModel[this.prop] = value
  }

  render () {
    console.log('render text:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-input
        vModel={this.localValue}
        placeholder={placeholder}
        clearable={clearable} />
    )
  }
}
