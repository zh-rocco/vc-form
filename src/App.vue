<template>
  <div id="app">
    <!-- <ComponentRenderer :options="options" /> -->

    <ComponentRenderer :options="options2" />

    <hr />

    <ComponentRenderer :options="options3" />

    <!-- <el-form :model="formModel" inline size="mini">
      <el-form-item label="副联系人" style="max-width: none;">
        <combo prop="contacts" :model="formModel" :max="5" :controls="options.controls" />
        <vc-text prop="text" :model="formModel" />
      </el-form-item>
    </el-form>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ComponentRenderer from '@/lib/component-renderer' // @ is an alias to /src
import Combo from '@/forms/combo/combo'
import VcText from '@/forms/text/text'

@Component({
  components: {
    ComponentRenderer,
    Combo,
    VcText
  }
})
export default class App extends Vue {
  private formModel = {
    email: null,
    text: null,
    contacts: []
  }

  private options = {
    type: 'vc-combo',
    name: 'contact',
    label: '联系方式',
    inline: true,
    value: [],
    controls: [
      {
        name: 'name',
        // label: '客户姓名',
        type: 'vc-text',
        placeholder: '请输入客户的姓名',
        rules: [
          // { required: true, message: '请输入客户的姓名', trigger: 'blur' },
        ]
      },
      {
        name: 'telephone',
        // label: '移动电话',
        type: 'vc-text',
        placeholder: '请输入客户的移动电话',
        rules: [
          // { required: true, message: '请输入客户的移动电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的移动电话', trigger: 'blur' }
        ]
      }
    ]
  }

  private options2 = {
    name: 'telephone',
    label: '移动电话',
    type: 'vc-text',
    placeholder: '请输入客户的移动电话',
    clearable: true,
    rules: [
      // { required: true, message: '请输入客户的移动电话', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的移动电话', trigger: 'blur' }
    ]
  }

  private options3 = {
    name: 'type',
    type: 'vc-select',
    placeholder: '请选择',
    clearable: true,
    options: [
      { name: 1, value: 1 },
      { name: 2, value: 2 }
    ],
    rules: [
      // { required: true, message: '请输入客户的移动电话', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的移动电话', trigger: 'blur' }
    ]
  }

  private options4 = {
    name: 'type',
    type: 'vc-form',
    placeholder: '请选择',
    clearable: true,
    options: [
      { name: 1, value: 1 },
      { name: 2, value: 2 }
    ],
    rules: [
      // { required: true, message: '请输入客户的移动电话', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的移动电话', trigger: 'blur' }
    ]
  }
}
</script>

<style lang="less">
</style>
