import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import { rendererStore } from '@/lib/renderers'
import { walk, getStyle } from '../utils'
import { PlainObject, Schema, FormAction } from '@/types'

import { Button } from 'element-ui'

console.log(Button)

console.log(rendererStore.getAllComponents())

@Component
class FormRenderer extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  @Provide('formModel')
  private model: PlainObject = {}

  private genFormModel(schema: Schema) {
    const { model, $set } = this

    walk(schema, ({ type, name }) => {
      if (type !== 'vc-form' && name) {
        $set(model, name, rendererStore.getDefaultValue(type))
      }
    })
  }

  private renderFormItem(schema: Schema) {
    const { type, label, name, rules, controls, style } = schema
    const Tag = rendererStore.getRenderer(type) || type

    return (
      <el-form-item label={label} prop={name} rules={rules}>
        <Tag
          options={schema}
          {...{ attrs: { style: getStyle(style) } }}
        >
          {Array.isArray(controls) ? this.renderFormItems(controls) : null}
        </Tag>
      </el-form-item>
    )
  }

  private renderFormItems(schemas: Schema[] = []) {
    return schemas.map(schema => this.renderFormItem(schema))
  }

  private renderFormAction(action: FormAction) {
    const { type, label, style } = action

    return (
      <Button
        {...{ attrs: { style: getStyle(style) } }}
      >
        {label}
      </Button>
    )
  }

  private renderFormActions(actions: FormAction[] = []) {
    return (
      <el-form-item>
        {actions.map(action => this.renderFormAction(action))}
      </el-form-item>
    )
  }

  render() {
    console.log('render form')

    return (
      <el-form
        ref="form"
        props={{ model: this.model }}
        label-suffix=":"
        label-width="120px"
        label-position="right"
        {...{ attrs: { ...this.options, style: getStyle(this.options.style) } }} >
        {this.renderFormItems(this.options.controls)}
        {this.renderFormActions(this.options.actions)}
      </el-form>
    )
  }

  created() {
    this.genFormModel(this.options)
  }
}

export default FormRenderer
