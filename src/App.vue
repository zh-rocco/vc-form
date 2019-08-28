<template>
  <div id="app">
    <div id="nav">
      <router-link to="/example">Full Example</router-link>
      <span class="divider">|</span>
      <router-link to="/builder">Form Builder</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  mounted() {
    // console.log('App', this)
  }
}
</script>

<style lang="less">
body {
  margin: 8px;
  user-select: none;
}

#nav {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;

  .divider {
    margin-left: 10px;
    margin-right: 10px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.form-renderer {
  .el-form-item.nested {
    margin-bottom: 0;
  }

  .el-input {
    width: auto;
  }

  .el-textarea {
    max-width: 460px;
  }

  .el-form-item__content > .inline {
    .el-form-item {
      display: inline-block;
      margin-right: 10px;
    }

    .form-field {
      display: inline-block;
    }
  }
}
</style>
