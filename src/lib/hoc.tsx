import { VNode, VueConstructor } from 'vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { PlainObject } from '@/types'

const collectSlots = (slots: {
  [key: string]: VNode[] | undefined;
}, context: Vue) => {
  return Object.keys(slots)
    .reduce((arr, key) => arr.concat(slots[key] || []), [] as VNode[])
    .map(vnode => {
      vnode.context = context
      return vnode
    })
}

export default function hoc(WrappedComponent: VueConstructor) {
  @Component
  class HocContainer extends Vue {
    @Provide('vcModel')
    private model: PlainObject = {}

    render() {
      const slots = collectSlots(this.$slots, this)

      return (
        <WrappedComponent
          {
          ...{
            props: this.$props,
            attrs: this.$attrs,
            on: this.$listeners,
            scopedSlots: this.$scopedSlots
          }
          }
        >
          {slots}
        </WrappedComponent>
      )
    }
  }

  return HocContainer
}
