import { Component } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions, SchemaOption } from '@/types'

@Component
class VcRadio extends ConnectMixin {
  private renderRadios(options: SchemaOption[]) {
    return options.map(({ name, value }) => {
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
    console.log('render rate:', this.options.name)
    const { placeholder, clearable, options } = this.options

    return (
      <el-radio-group
        vModel={this.localValue}
      >
        {this.renderRadios(options)}
      </el-radio-group>
    )
  }
}

const options: RendererOptions = {
  name: 'vc-radio',
  description: '单选',
  component: VcRadio,
  value: 0
}

export default options
