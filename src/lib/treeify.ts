import { pickBy } from 'lodash'
import { walk } from '@/element/utils'
import { builtInProps } from '@/lib/constants'
import { rendererStore } from '@/lib/renderers'
import { directiveStore } from '@/lib/directives'
import { PlainObject, Schema } from '@/types'

const builtIn = builtInProps.map(prop => prop.replace('x-', ''))

export default function treeify(schema: Schema) {
  let tree: PlainObject = {}

  walk(schema, (current, parent) => {
    const _buildIn = pickBy(current, (value, key) => builtIn.includes(key))
    const _attrs = pickBy(current, (value, key) => !builtIn.includes(key))

    tree = { ..._buildIn, _attrs }
  })
}
