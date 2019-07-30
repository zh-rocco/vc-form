import { Component, Prop, Inject, Vue } from 'vue-property-decorator'
import SelectDriver from '@/components/SelectDriver.vue'

@Component({
  components: { SelectDriver }
})
export default class VcSelect extends Vue {
  @Inject({ default() { return {} } }) readonly formModel!: any

  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  private get prop() {
    return this.options.name
  }

  private get localValue() {
    return this.formModel[this.prop]
  }
  private set localValue(value: any[]) {
    this.formModel[this.prop] = value
  }

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

  created() {
    if (!this.formModel[this.prop]) {
      this.$set(this.formModel, this.prop, null)
    }
  }
}
