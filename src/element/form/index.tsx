import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import { rendererStore } from '@/lib/renderers'
import { walk } from '../utils'
import { PlainObject, Schema } from '@/types'

console.log(rendererStore)

const getStyle = (styleObject: PlainObject | undefined) => {
  if (typeof styleObject !== 'object') return

  return Object.entries(styleObject)
    .reduce((styleArray, [k, v]) => {
      styleArray.push(`${k}: ${v}`)
      return styleArray
    }, [] as string[])
    .join('; ')
}

@Component({
  components: rendererStore.getAllComponents()
})
class FormRenderer extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly options!: any

  @Provide('formModel')
  private model: PlainObject = {}

  private genFormModel(schema: Schema) {
    const { model, $set } = this

    walk(schema, ({ name }) => {
      if (name) {
        $set(model, name, null)
      }
    })
  }

  renderChild(schema: Schema) {
    const { type, label, name, rules, controls, style } = schema
    const Tag = type

    return (
      <el-form-item label={label} prop={name} rules={rules}>
        <Tag
          options={schema}
          {...{ attrs: { style: getStyle(style) } }}
        >
          { Array.isArray(controls) ? this.renderChildren(controls) : null }
        </Tag>
      </el-form-item>
    )
  }

  renderChildren(schemas: Schema[]) {
    return schemas.map(schema => this.renderChild(schema))
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
        {this.renderChildren(this.options.controls)}
      </el-form>
    )
  }

  created() {
    this.genFormModel(this.options)
  }
}

export default FormRenderer
