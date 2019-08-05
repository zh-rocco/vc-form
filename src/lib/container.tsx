import { Component, Provide, Vue } from 'vue-property-decorator'
import { PlainObject } from '@/types'

@Component
export default class Container extends Vue {
  @Provide('vcModel')
  private model: PlainObject = {}

  render() {
    return this.$slots.default
  }
}
