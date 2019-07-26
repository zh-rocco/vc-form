import { Component, Prop, Vue } from 'vue-property-decorator'
import { Schema } from '@/types'
import { rendererStore } from './renderers'
import Combo from '@/forms/combo/combo'
import { Input } from 'element-ui'
import HelloWorld from '@/components/HelloWorld.vue'

@Component
export default class ComponentRenderer extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly options!: Schema

  render () {
    const { type, name, controls } = this.options
    // const Renderer = rendererStore.getRenderer(type)

    return (
      <div>
        {/* <Combo prop={name} controls={controls}></Combo> */}
        {/* <Input></Input> */}
        {/* <Combo prop="hello"></Combo> */}
        {/* <HelloWorld></HelloWorld> */}
        <h1>Hello</h1>
      </div>
    )
  }
}
