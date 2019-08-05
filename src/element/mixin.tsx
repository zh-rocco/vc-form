import { Component, Prop, Inject, Vue } from 'vue-property-decorator'

@Component
export default class ConnectMixin extends Vue {
  @Inject({ default() { return {} } }) readonly formModel!: any

  @Prop({ default: null }) readonly value!: any
  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  public get prop() {
    return this.options.name
  }

  public get localValue() {
    return this.value || this.formModel[this.prop] || null
  }
  public set localValue(value: any) {
    this.$emit('input', value)
    if (this.prop) {
      this.formModel[this.prop] = value
    }
  }
}
