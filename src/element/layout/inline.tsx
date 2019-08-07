import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class InlineLayout extends ConnectMixin {
  render() {
    return (
      <div
        class="inline"
      >
        {this.$slots.default}
      </div>
    )
  }
}

const options: RendererOptions = {
  name: 'inline-layout',
  description: 'inline 布局',
  component: InlineLayout
}

export default options
