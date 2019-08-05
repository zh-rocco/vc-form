import { Component, Prop, Vue } from 'vue-property-decorator'
import { Schema, PlainObject } from '@/types'
import { rendererStore } from './renderers'

console.log('components:', rendererStore.getAllComponents())

const FORM_ITEMS = ['vc-text', 'vc-select', 'vc-date', 'vc-time', 'div']

const isRenderFormComponent = (schema: Schema): boolean => {
  console.log('isRenderFormComponent')
  if (FORM_ITEMS.includes(schema.type)) {
    let _parent = schema.__parent__

    while (_parent) {
      if (_parent.type === 'vc-form') {
        return true
      }

      _parent = _parent.__parent__
    }
  }

  return false
}

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
export default class ComponentRenderer extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly schema!: Schema

  private formModel: PlainObject = {}

  renderChild(schema: Schema) {
    const { type, controls, __parent__, style } = schema
    const Tag = type
    let children!: () => JSX.Element[] | null

    if (!__parent__) {
      schema.__parent__ = null
    }

    console.log('# renderChild', Tag)

    if (Array.isArray(controls)) {
      controls.forEach(control => {
        control.__parent__ = schema
      })
      children = () => this.renderChildren(controls)
    } else {
      children = () => null
    }

    if (isRenderFormComponent(schema)) {
      const { formModel } = this
      const { name } = schema
      formModel[name] = null
      return (
        <el-form-item label={schema.label} prop={name} rules={schema.rules}>
          <Tag
            vModel={formModel[name]}
            options={schema}
            {...{ attrs: { style: getStyle(style) } }}
          >
            {children()}
          </Tag>
        </el-form-item>
      )
    }

    return (
      <Tag
        options={schema}
        {...{ attrs: { style: getStyle(style) } }}
      >
        {children()}
      </Tag>
    )
  }

  renderChildren(schemas: Schema[]) {
    console.log('# renderChildren')
    return schemas.map(schema => this.renderChild(schema))
  }

  render() {
    console.log('*', 'Tag', this.schema.type)

    return this.renderChild(this.schema)
  }
}
