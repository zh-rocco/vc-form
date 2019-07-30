import { Component, Prop, Vue } from 'vue-property-decorator'
import { Schema, PlainObject } from '@/types'

function getStyle(styleObject: PlainObject | undefined) {
  if (typeof styleObject !== 'object') return

  return Object.entries(styleObject)
    .reduce((styleArray, [k, v]) => {
      styleArray.push(`${k}: ${v}`)
      return styleArray
    }, [] as string[])
    .join('; ')
}

@Component
export default class ComponentRenderer extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly schema!: Schema

  private formModel: PlainObject = {
    type: []
  }

  renderChild(schema: Schema) {
    const { _name, _style, component, options = {}, children } = schema
    const Tag = component

    console.log('# renderChild', Tag)

    const _children = () => Array.isArray(children) ? this.renderChildren(children) : null

    if (_name) {
      return <Tag vModel={this.formModel[_name]} {...{ props: options, attrs: { style: getStyle(_style) } }}>{_children()}</Tag>
    } else {
      return <Tag {...{ props: { ...options, model: this.formModel }, attrs: { style: getStyle(_style) } }}>{_children()}</Tag>
    }
  }

  renderChildren(schemas: Schema[]) {
    console.log('# renderChildren')
    return schemas.map(schema => this.renderChild(schema))
  }

  render() {
    return this.renderChild(this.schema)
  }
}
