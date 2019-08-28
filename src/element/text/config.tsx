// import Vue, { VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import FormRenderer from '@/element/form'

export default tsx.componentFactory.create({
  name: 'StaticControlConfig',

  components: { FormRenderer },

  data() {
    return {
      model: {},
      schema: {
        type: 'form',
        size: 'mini',
        labelPosition: 'top',
        controls: [
          {
            name: 'label',
            label: '标题',
            type: 'text',
            clearable: true,
            rules: [{ required: true, message: '标题是必填项', trigger: ['change', 'blur'] }]
          },

          {
            name: 'name',
            label: '绑定数据的 Key',
            type: 'text',
            clearable: true,
            rules: [{ required: true, message: 'Key 是必填项', trigger: ['change', 'blur'] }]
          },

          {
            name: 'defaultValue',
            label: '默认值',
            type: 'text',
            clearable: true
          },

          {
            name: 'placeholder',
            label: '占位内容',
            type: 'text',
            clearable: true
          }
        ],
        actions: []
      }
    }
  },

  render() {
    console.log('render static config')

    return (
      <form-renderer value={this.model} options={this.schema}></form-renderer>
    )
  }
})
