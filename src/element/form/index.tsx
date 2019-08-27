import { Component, Prop, Provide, Watch, Vue } from 'vue-property-decorator'
import { rendererStore } from '@/lib/renderers'
// import { directiveStore } from '@/lib/directives'
import FormField from '@/element/form-field'
import { walk, getStyle } from '../utils'
import { PlainObject, Schema, FormAction } from '@/types'

import { Button } from 'element-ui'

// // console.log(Button)

// // console.log(rendererStore.getAllComponents())
// // console.log(directiveStore.getAllDirectives())

@Component
class FormRenderer extends Vue {
  $refs!: {
    form: HTMLFormElement
  }

  @Prop({ type: Object, default: () => ({}) }) readonly options!: Schema

  @Provide('formModel') readonly model: PlainObject = {}
  @Provide() readonly formIns = this

  @Watch('options', { deep: true, immediate: true })
  onOptionsChange(nv: Schema) {
    if (nv) {
      this.genFormModel(nv)
    }
  }

  genFormModel(schema: Schema) {
    const { model, $set } = this

    walk(schema, (options) => {
      const { name, value } = options
      if (name && this.model[name] === undefined) {
        const _value = value === undefined ? rendererStore.getDefaultValue(options) : value
        $set(model, name, _value)
      }
    })
  }

  renderFormField(schema: Schema) {
    const { type, label, name, rules, controls, style } = schema
    const Tag = rendererStore.getRenderer(type) || type
    const hasChildren = Array.isArray(controls) && controls.length
    const isRequired = controls && controls.some(({ rules }) => {
      return rules && rules.some(({ required }) => required)
    })

    return (
      <FormField.component
        options={schema}
      >
        <Tag
          options={schema}
          {...{ attrs: { style: getStyle(style) } }}
        >
          {hasChildren ? this.renderFormFields(controls) : null}
        </Tag>
      </FormField.component>
    )
  }

  renderFormFields(schemas: Schema[] = []) {
    return schemas.map(schema => this.renderFormField(schema))
  }

  renderFormAction(action: FormAction) {
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

  renderFormActions(actions: FormAction[] = []) {
    if (!actions.length) return

    return (
      <FormField.component
        options={{ type: 'buttons', name: 'form-actions' }}
      >
        {actions.map(action => this.renderFormAction(action))}
      </FormField.component>
    )
  }

  renderFormContent() {
    return this.$slots.default
      ? this.$slots.default
      : (
        <div>
          {this.renderFormFields(this.options.controls)}
          {this.renderFormActions(this.options.actions)}
        </div>
      )
  }

  validateForm() {
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

  resetFields() {
    this.$refs.form.resetFields()
    this.$emit('reset')
  }

  render() {
    // console.log('render form')

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
        {this.renderFormContent()}
      </el-form>
    )
  }
}

export default FormRenderer
