import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class PasswordControl extends ConnectMixin {
  render() {
    console.log('render password:', this.options.name)
    const { placeholder, clearable } = this.options

    return (
      <el-input
        vModel={this.localValue}
        type="password"
        placeholder={placeholder}
        clearable={clearable}
        disabled={this.isDisabled}
        show-password
      />
    )
  }
}

const options: RendererOptions = {
  name: 'password',
  description: '密码框',
  component: PasswordControl
}

export default options
