import { VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import p from 'vue-strict-prop'
import { rendererStore } from '@/lib/renderers'
import { Schema } from '@/types'

export default tsx.componentFactory.create({
  props: {
    options: p.ofType<Schema>().required
  },

  methods: {
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
    },
    renderChildren(schemas: Schema[] = []) {
      return schemas.map(schema => this.renderChild(schema))
    }
  },

  render(): VNode {
    // // console.log('*', 'Tag', this.options.type)

    return this.renderChild(this.options)
  }
})
