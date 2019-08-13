import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions, SchemaOption } from '@/types'

@Component
class CheckboxControl extends ConnectMixin {
  private renderChildren(options: SchemaOption[]) {
    return options.map(({ name, value = name }) => {
      return (
        <el-checkbox
          label={value}
        >
          {name}
        </el-checkbox>
      )
    })
  }

  render() {
    console.log('render checkbox:', this.options.name)
    const { placeholder, clearable, options } = this.options

    if (!Array.isArray(options)) return

    if (options.length > 1) {
      return (
        <el-checkbox-group
          vModel={this.localValue}
        >
          {this.renderChildren(options)}
        </el-checkbox-group>
      )
    }

    const [{ name }] = options

    return (
      <el-checkbox
        vModel={this.localValue}
      >
        {name}
      </el-checkbox>
    )
  }
}

const options: RendererOptions = {
  name: 'checkbox',
  description: '多选',
  component: CheckboxControl,
  value: ({ options }) => options.length > 1 ? [] : false
}

export default options
