import { Component, Prop, Vue } from 'vue-property-decorator'
import { Schema, PlainObject } from '@/types'
import { rendererStore } from './renderers'

console.log('components:', rendererStore.getAllComponents())

const isRenderFormComponent = (schema: Schema | null): boolean => {
  while (schema) {
    if (schema.type === 'vc-form') {
      return true
    }

    schema = schema.__parent__
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

    if (isRenderFormComponent(__parent__)) {
      return (
        <el-form-item label={schema.label} prop={schema.name} rules={schema.rules}>
          <Tag
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
    console.log('renderer run')
    console.log('*', 'Tag', this.schema.type)

    return this.renderChild(this.schema)
  }
}
