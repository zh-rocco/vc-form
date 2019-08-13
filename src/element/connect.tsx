import { get, set } from 'lodash'
import { Component, Prop, Inject, Vue } from 'vue-property-decorator'
import { evalExpression } from '@/element/utils'
import { FormFieldProps } from '@/types'

@Component
export default class ConnectMixin extends Vue {
  @Inject({ default() { return {} } }) readonly formModel!: any
  @Inject({ default() { return {} } }) readonly formIns!: any

  @Prop({ default: null }) readonly value!: any
  @Prop({ type: Object, default: () => ({}) }) readonly options!: FormFieldProps

  public get formRef() {
    return this.formIns.$refs.form
  }

  public get prop() {
    return this.options.name
  }

  public get localValue() {
    return this.value || get(this.formModel, this.prop) || null
  }
  public set localValue(value: any) {
    this.$emit('input', value)
    if (this.prop) {
      set(this.formModel, this.prop, value)
    }
  }

  public get isDisabled() {
    return this._isDisabled(this.options.disabledOn)
  }

  private _isDisabled(value: undefined | boolean | string) {
    if (value === undefined) {
      return false
    }

    if (typeof value === 'boolean') {
      return value
    }

    if (typeof value === 'string') {
      return evalExpression(value, this.formModel)
    }

    return true
  }

  private _autoFocus() {
    if (!this.options.autoFocus) return

    console.log('[autoFocus]:', this.options.name)

    const $input = this.$el.querySelector('input')

    if ($input) {
      setTimeout(() => {
        $input.focus()
      }, 0)
    }
  }

  public mounted() {
    this._autoFocus()
  }
}
