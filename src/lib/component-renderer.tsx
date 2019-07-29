import { Component, Prop, Vue } from 'vue-property-decorator'
import { Schema } from '@/types'
import { rendererStore } from './renderers'

console.log('components:', rendererStore.getAllComponents())

@Component({
  components: rendererStore.getAllComponents()
})
export default class ComponentRenderer extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly options!: Schema

  render () {
    console.log('renderer run')
    const { type } = this.options

    const Tag = type

    console.log('*', Tag)

    return (
      <div>
        <Tag options={this.options} />
      </div>
    )
  }
}
