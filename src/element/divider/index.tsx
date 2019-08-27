import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

import './style.less'

@Component
class DividerControl extends ConnectMixin {
  render() {
    // console.log('render divider')

    return (
      <hr />
    )
  }
}

const options: RendererOptions = {
  name: 'divider',
  description: '分割线',
  component: DividerControl
}

export default options
