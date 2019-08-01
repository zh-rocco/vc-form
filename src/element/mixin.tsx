import { Component, Prop, Inject, Vue } from 'vue-property-decorator'

@Component
export default class FormMixin extends Vue {
  @Inject({ default() { return {} } }) readonly formModel!: any

  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  public get prop() {
    return this.options.name
  }

  public get localValue() {
    return this.formModel[this.prop]
  }
  public set localValue(value: any) {
    this.formModel[this.prop] = value
  }

  created() {
    if (this.prop && !this.formModel[this.prop]) {
      this.$set(this.formModel, this.prop, null)
    }
  }
}
