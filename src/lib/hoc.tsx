import { Component, Provide, Vue } from 'vue-property-decorator'
import { PlainObject } from '@/types'
import { VNode } from 'vue/types/vnode'
import { VueConstructor } from 'vue/types/vue'

export default function hoc(WrappedComponent: VueConstructor) {
  @Component
  class HocContainer extends Vue {
    @Provide('vcModel')
    private model: PlainObject = {}

    render() {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key] || []), [] as VNode[])
        .map(vnode => {
          vnode.context = this
          return vnode
        })

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
