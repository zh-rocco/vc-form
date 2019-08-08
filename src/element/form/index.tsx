import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import { rendererStore } from '@/lib/renderers'
import { walk, getStyle } from '../utils'
import { PlainObject, Schema, FormAction } from '@/types'

import { Button } from 'element-ui'

console.log(Button)

console.log(rendererStore.getAllComponents())

@Component
class FormRenderer extends Vue {
  $refs!: {
    form: HTMLFormElement
  }

  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  @Provide('formModel') readonly model: PlainObject = {}
  @Provide() readonly formIns = this

  public genFormModel(schema: Schema) {
    const { model, $set } = this

    walk(schema, ({ type, name }) => {
      if (type !== 'vc-form' && name) {
        $set(model, name, rendererStore.getDefaultValue(type))
      }
    })
  }

  public renderFormItem(schema: Schema) {
    const { type, label, name, rules, controls, style } = schema
    const Tag = rendererStore.getRenderer(type) || type
    const hasChildren = Array.isArray(controls) && controls.length
    const isRequired = controls && controls.some(({ rules }) => {
      return rules && rules.some(({ required }) => required)
    })

    return (
      <el-form-item
        label={label}
        prop={name}
        rules={isRequired ? rules || { required: isRequired } : rules}
        class={hasChildren ? 'nested' : undefined}
      >
        <Tag
          options={schema}
          {...{ attrs: { style: getStyle(style) } }}
        >
          {hasChildren ? this.renderFormItems(controls) : null}
        </Tag>
      </el-form-item>
    )
  }

  public renderFormItems(schemas: Schema[] = []) {
    return schemas.map(schema => this.renderFormItem(schema))
  }

  public renderFormAction(action: FormAction) {
    const { type, label, style } = action
    const Tag = rendererStore.getActionRenderer(type) || Button

    return (
      <Tag
        options={action}
        {...{ attrs: { style: getStyle(style) } }}
      >
        {label}
      </Tag>
    )
  }

  public renderFormActions(actions: FormAction[] = []) {
    return (
      <el-form-item>
        {actions.map(action => this.renderFormAction(action))}
      </el-form-item>
    )
  }

  public validateForm() {
    return new Promise((resolve, reject) => {
      if (!this.$refs.form) return
      this.$refs.form.validate((valid: boolean | object) => {
        if (valid) {
          resolve(true)
        } else {
          reject(new Error('Validate Error.'))
        }
        this.$emit('validate', valid)
      })
    })
  }

  public resetFields() {
    // TODO: 修复重置时 combo 组件报错的 BUG
    try {
      this.$refs.form.resetFields()
    } catch { }
    this.$emit('reset')
  }

  public render() {
    console.log('render form')

    return (
      <el-form
        ref="form"
        class="form-renderer"
        label-suffix=":"
        label-width="120px"
        label-position="right"
        props={{ model: this.model }}
        attrs={{ ...this.options, style: getStyle(this.options.style) }}
      >
        {this.renderFormItems(this.options.controls)}
        {this.renderFormActions(this.options.actions)}
      </el-form>
    )
  }

  public created() {
    this.genFormModel(this.options)
  }
}

export default FormRenderer
