import { VNode } from 'vue'
import * as tsx from 'vue-tsx-support'
import FormRenderer from '@/element/form'
import builderBus from './builder-bus'
import { Schema, PlainObject } from '@/types'

export default tsx.componentFactory.create({
  name: 'RendererConfig',

  components: { FormRenderer },

  data() {
    return {
      isShow: true,
      _current: {} as Schema,
      current: {} as Schema,
      schema: {
        name: 'config-form',
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
        actions: [
          {
            type: 'submit',
            label: '确定'
          }
        ]
      }
    }
  },

  methods: {
    handleSubmit(value: PlainObject) {
      console.log('submit', value)
      builderBus.$emit('update', {
        source: this._current,
        value
      })
    },
    genConfigForm(): VNode {
      return (
        <form-renderer
          value={this.current}
          options={this.schema}
          onSubmit={this.handleSubmit}
        />
      )
    }
  },

  render(): VNode {
    console.log('render static config')

    if (this.isShow) {
      return (this.genConfigForm())
    } else {
      return (<div></div>)
    }
  },

  created() {
    builderBus.$on('select', (payload: Schema) => {
      this._current = payload
      this.current = JSON.parse(JSON.stringify(payload))
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    })
  }
})
