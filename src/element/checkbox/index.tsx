import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions, SchemaOption } from '@/types'

@Component
class VcCheckbox extends ConnectMixin {
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

    return (
      <el-checkbox-group
        vModel={this.localValue}
      >
        {this.renderChildren(options)}
      </el-checkbox-group>
    )
  }
}

const options: RendererOptions = {
  name: 'vc-checkbox',
  description: '多选',
  component: VcCheckbox,
  value: () => []
}

export default options
