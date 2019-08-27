import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class ResetAction extends ConnectMixin {
  private reset() {
    const { resetFields } = this.formIns
    resetFields()
  }

  render() {
    // console.log('render action:', this.options.type)
    const { placeholder, clearable } = this.options

    return (
      <el-button
        type="warning"
        onClick={this.reset}
      >
        {this.$slots.default}
      </el-button>
    )
  }
}

const options: RendererOptions = {
  type: 'form-action',
  name: 'reset',
  description: '表单重置',
  component: ResetAction
}

export default options
