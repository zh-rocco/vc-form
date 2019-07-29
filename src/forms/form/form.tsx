import { Component, Prop, Vue } from 'vue-property-decorator'
import { PlainObject } from '@/types'

@Component
export default class VcForm extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  private model: PlainObject = {}

  render () {
    console.log('render text')
    const { placeholder, clearable } = this.options

    return (
      <el-form
        ref="form"
        class="crm-form__main"
        model={this.model}
        size="small"
        label-suffix=":"
        label-width="120px"
        label-position="right"
        {...{ attrs: this.options }} />
    )
  }
}
