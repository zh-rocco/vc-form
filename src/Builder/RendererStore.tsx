import * as tsx from 'vue-tsx-support'
import Draggable from 'vuedraggable'
import { rendererStore } from '@/lib/renderers'

const renderers = Object.values(rendererStore.getAllFields())
  .map(({ name, description }) => ({ name, description }))

const actions = Object.values(rendererStore.getAllActions())
  .map(({ type, name, description }) => ({ type, name, description }))

export default tsx.component({
  name: 'RendererStore',

  data() {
    return {}
  },

  methods: {
    renderTags(tags: any[]) {
      return tags.map(renderer => {
        return (
          <div
            class="renderer-item"
            key={renderer.name}
          >
            <el-tag>{renderer.description}</el-tag>
          </div>
        )
      })
    },
    handleMoveStart({ oldIndex }: any) {
      console.log('start', oldIndex)
    },
    handleMoveEnd(evt: any) {
      console.log('end', evt)
    },
    handleMove() {
      return true
    },
    handleChange(...args: any[]) {
      console.log(args)
    }
  },

  render() {
    return (
      <dl class="renderer-store">
        <dt class="title">
          <h5>表单项</h5>
        </dt>
        <Draggable
          class="goods"
          tag="dd"
          group={{ name: 'fields', pull: 'clone', put: false }}
          sort={false}
          list={renderers}
        >
          {this.renderTags(renderers)}
        </Draggable>

        <dt class="title">
          <h5>表单操作</h5>
        </dt>
        <Draggable
          class="goods"
          tag="dd"
          group={{ name: 'actions', pull: 'clone', put: false }}
          sort={false}
          list={actions}
        >
          {this.renderTags(actions)}
        </Draggable>
      </dl>
    )
  }
})
