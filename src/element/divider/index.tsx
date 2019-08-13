import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class Divider extends ConnectMixin {
  render() {
    console.log('render divider')

    return (
      <hr />
    )
  }
}

const options: RendererOptions = {
  name: 'divider',
  description: '分割线',
  component: Divider
}

export default options
