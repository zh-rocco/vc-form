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
    const draggableOptions = {
      group: { name: 'people', pull: 'clone', put: false },
      sort: false,
      ghostClass: 'ghost'
    }

    return (
      <div>
        <Draggable
          class="renderer-store"
          tag="div"
          {...{ attrs: { ...draggableOptions } }}
          list={renderers}
        >
          {this.renderTags(renderers)}
        </Draggable>

        <Draggable
          class="renderer-store"
          tag="div"
          {...{ attrs: { ...draggableOptions } }}
          list={actions}
        >
          {this.renderTags(actions)}
        </Draggable>
      </div>
    )
  }
})
