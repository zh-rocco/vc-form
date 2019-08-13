import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions, SchemaOption } from '@/types'

@Component
class RadioControl extends ConnectMixin {
  private renderChildren(options: SchemaOption[]) {
    return options.map(({ name, value = name }) => {
      return (
        <el-radio
          label={value}
        >
          {name}
        </el-radio>
      )
    })
  }

  render() {
    console.log('render radio:', this.options.name)
    const { placeholder, clearable, options } = this.options

    return (
      <el-radio-group
        vModel={this.localValue}
      >
        {this.renderChildren(options)}
      </el-radio-group>
    )
  }
}

const options: RendererOptions = {
  name: 'radio',
  description: '单选',
  component: RadioControl
}

export default options
