import { Component, Prop, Vue } from 'vue-property-decorator'
import { rendererStore } from '@/lib/renderers'
import { Schema } from '@/types'

@Component
export default class Renderer extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly options!: Schema

  renderChild(schema: Schema) {
    const { type, label, name, rules, controls, style } = schema
    const Tag = rendererStore.getRenderer(type) || type

    return (
      <Tag
        attrs={this.$attrs}
        on={this.$listeners}
        options={schema}
      >
        {this.renderChildren(controls)}
      </Tag >
    )
  }

  renderChildren(schemas: Schema[] = []) {
    return schemas.map(schema => this.renderChild(schema))
  }

  render() {
    console.log('*', 'Tag', this.options.type)

    return this.renderChild(this.options)
  }
}
