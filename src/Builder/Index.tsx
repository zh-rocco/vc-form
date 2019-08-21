import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Builder extends Vue {
  render() {
    return (
      <el-container
        class="form-builder"
      >
        <el-aside>
          Left
        </el-aside>

        <el-main>
          Center
        </el-main>

        <el-aside>
          Right
        </el-aside>
      </el-container>
    )
  }
}
