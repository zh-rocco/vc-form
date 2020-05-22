import * as tsx from 'vue-tsx-support'
import { get, set } from 'lodash'
import { Component, Prop, Inject, InjectReactive, Vue, Watch } from 'vue-property-decorator'
import { evalExpression } from '@/element/utils'
import { FormFieldProps, PlainObject } from '@/types'

@Component
export class ConnectMixin extends Vue {
  @Inject({ default() { return {} } }) readonly formModel!: PlainObject
  @Inject({ default() { return {} } }) readonly formIns!: any
  @Inject() readonly __reactiveInjection__!: any

  @Prop({ default: null }) readonly value!: any
  @Prop({ type: Object, default: () => ({}) }) readonly options!: FormFieldProps

  public watchers: { [propNames: string]: () => void } = {}

  public get formRef() {
    return this.formIns.$refs.form
  }

  public get $model() {
    return this.formModel
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

  public get isVisible() {
    return this._isVisible(this.options.visibleOn)
  }

  public get isDisabled() {
    return this._isDisabled(this.options.disabledOn)
  }

  @Watch('isVisible')
  public onVisibleChange(nv: boolean, ov: boolean) {
    if (!nv && this.$refs.formField) {
      (this.$refs.formField as HTMLFormElement).resetField()
    }
  }

  private _isVisible(value: undefined | boolean | string) {
    if (value === undefined) {
      return true
    }

    if (typeof value === 'boolean') {
      return value
    }

    if (typeof value === 'string') {
      return evalExpression(value, this.formModel)
    }

    return true
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

    // console.log('[autoFocus]:', this.options.name)

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

  public beforeDestroy() {
    Object.values(this.watchers).forEach((unwatch) => {
      unwatch()
    })
  }
}

export default tsx.componentFactory.create({
  name: 'ConnectMixin',

  inject: ['formModel']

})
