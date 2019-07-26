<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <div class="form">
      <ComponentRenderer :options="options" />
    </div>
    <el-form :model="formModel">
      <el-form-item label="副联系人" style="max-width: none;">
        <combo prop="contacts" :model="formModel" :max="5" :controls="options.controls" />
      </el-form-item>
    </el-form>
    <!-- <router-view /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ComponentRenderer from '@/lib/component-renderer' // @ is an alias to /src
import Combo from '@/forms/combo/combo'

@Component({
  components: {
    ComponentRenderer,
    Combo
  }
})
export default class App extends Vue {
  private formModel = {
    email: null,
    contacts: []
  }

  private options = {
    type: 'combo',
    name: 'contact',
    label: '联系方式',
    multiple: true,
    multiLine: true,
    inline: true,
    value: [],
    controls: [
      {
        name: 'name',
        // label: '客户姓名',
        type: 'text',
        placeholder: '请输入客户的姓名',
        rules: [
          // { required: true, message: '请输入客户的姓名', trigger: 'blur' },
        ]
      },
      {
        name: 'telephone',
        // label: '移动电话',
        type: 'text',
        placeholder: '请输入客户的移动电话',
        rules: [
          // { required: true, message: '请输入客户的移动电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的移动电话', trigger: 'blur' }
        ]
      }
    ]
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
