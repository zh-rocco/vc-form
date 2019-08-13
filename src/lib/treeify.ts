import { walk } from '@/element/utils'
import { rendererStore } from '@/lib/renderers'
import { directiveStore } from '@/lib/directives'
import { Schema } from '@/types'

export default function treeify(schema: Schema) {
  const tree = {}

  walk(schema, (options) => {

  })
}
