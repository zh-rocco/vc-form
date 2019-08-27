import * as tsx from 'vue-tsx-support'
import RendererStore from './RendererStore'
import Renderer from './Renderer'
import './style.less'

export default tsx.component({
  name: 'Builder',

  render() {
    return (
      <el-container
        class="form-builder"
      >
        <el-aside class="builder-left" width="230px">
          <RendererStore />
        </el-aside>

        <el-main class="builder-main">
          <Renderer />
        </el-main>

        <el-aside class="builder-right" width="230px">
          Right
        </el-aside>
      </el-container>
    )
  }
})
