import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class BackAction extends ConnectMixin {
  private back() {
    // console.log('click back button.')
  }

  render() {
    // console.log('render action:', this.options.type)
    const { placeholder, clearable } = this.options

    return (
      <el-button
        onClick={this.back}
      >
        {this.$slots.default}
      </el-button>
    )
  }
}

const options: RendererOptions = {
  type: 'form-action',
  name: 'back',
  description: '表单返回',
  component: BackAction
}

export default options
