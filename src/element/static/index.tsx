import { Component } from 'vue-property-decorator'
import { typeConductionFunction } from '@/element/utils'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class StaticControl extends ConnectMixin {
  render() {
    console.log('render static:', this.options.name)

    return (
      <div>{this.localValue}</div>
    )
  }
}

export default typeConductionFunction<RendererOptions>({
  name: 'static',
  description: '静态展示',
  component: StaticControl
})
