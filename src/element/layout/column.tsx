import { Component, Prop } from 'vue-property-decorator'
import ConnectMixin from '../connect'
import { RendererOptions } from '@/types'

@Component
class ColumnLayout extends ConnectMixin {
  @Prop({ type: Number, default: 20 }) readonly gutter!: number

  renderColumns() {
    const defaultSlots = this.$slots.default || []
    return defaultSlots.map(item => (
      <el-col
        span={24 / (defaultSlots.length || 1)}
      >
        {item}
      </el-col>
    ))
  }

  render() {
    return (
      <el-row
        // gutter={this.gutter}
      >
        {this.renderColumns()}
      </el-row>
    )
  }
}

const options: RendererOptions = {
  name: 'column-layout',
  description: '列布局',
  component: ColumnLayout
}

export default options
