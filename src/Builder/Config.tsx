// import Vue, { VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import FormRenderer from '@/element/form'
import bus from './bus'
import { Schema } from '@/types'

export default tsx.componentFactory.create({
  name: 'RendererConfig',

  components: { FormRenderer },

  data() {
    return {
      current: {} as Schema,
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
            name: 'value',
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

  methods: {
  },

  render() {
    // console.log('render static config:', this.current.type, this.current.name)
    console.log('render static config:')

    return (
      <form-renderer
        value={this.current}
        options={this.schema}
      ></form-renderer>
    )
  },

  created() {
    bus.$on('select', (payload: Schema) => {
      this.current = payload
      // this.current.label = this.current.label += '*'
    })
  }
})
