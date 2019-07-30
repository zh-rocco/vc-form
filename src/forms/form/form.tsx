import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import { PlainObject } from '@/types'

@Component
export default class VcForm extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  @Provide('formModel')
  private model: PlainObject = {
    name: null,
    telephone: null
  }

  render () {
    console.log('render form')
    const { placeholder, clearable } = this.options

    return (
      <el-form
        ref="form"
        class="crm-form__main"
        props={{ model: this.model }}
        size="small"
        label-suffix=":"
        label-width="120px"
        label-position="right"
        {...{ attrs: this.options }} >
        {this.$slots.default}
      </el-form>
    )
  }
}
