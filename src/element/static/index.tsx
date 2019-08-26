// import Vue, { VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import { typeConductionFunction } from '@/element/utils'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

// const Com = tsx.componentFactory.create({
//   name: 'Com',
//   props: {
//     type: { type: String, default: 'ccc' }
//   },
//   data() {
//     return {
//       name: 'com',
//       count: 0
//     }
//   },
//   computed: {
//     str(): string {
//       return `* ${this.type} - ${this.name} - ${this.count} *`
//     }
//   },
//   render(): VNode {
//     return (
//       <div>{this.str}</div>
//     )
//   }
// })

const StaticControl = tsx.componentFactory.mixin(ConnectMixin).create({
  name: 'StaticControl',
  mixins: [ConnectMixin],
  render() {
    console.log('render static:', this.options.name)

    return (
      <div>
        {this.localValue}
      </div>
    )
  }
})

export default typeConductionFunction<RendererOptions<typeof StaticControl>>({
  name: 'static',
  description: '静态展示',
  component: StaticControl
})
