import * as tsx from 'vue-tsx-support'
import Draggable from 'vuedraggable'
import FormRenderer from '@/element/form'
import { rendererStore } from '@/lib/renderers'
// import { directiveStore } from '@/lib/directives'
import FormField from '@/element/form-field'
import { getStyle } from '@/element/utils'
import { Button } from 'element-ui'
import { Schema, RendererOptions, FormAction } from '@/types'

let _currentRenderer: any

export default tsx.component({
  name: 'Renderer',

  components: {
    FormRenderer
  },

  data() {
    return {
      formOpts: {
        type: 'form',
        size: 'mini',
        labelWidth: '100px',
        // style: {
        //   width: '460px'
        // },
        controls: [] as Schema[],
        actions: [] as FormAction[]
      },
      renderers: [] as RendererOptions[]
    }
  },

  methods: {
    handleMoveEnd(evt: any) {
      const { oldIndex, newIndex } = evt
      console.log('end', oldIndex, newIndex)
      const { controls } = this.formOpts

      if (oldIndex < newIndex) {
        controls.splice(newIndex + 1, 0, controls[oldIndex])
        controls.splice(oldIndex, 1)
      } else {
        controls.splice(newIndex, 0, controls.splice(oldIndex, 1)[0])
      }
    },
    handleChange(evt: any) {
      if (evt.added) {
        const { newIndex: idx, element: renderer } = evt.added
        console.log('change:', idx, { ...renderer })
        _currentRenderer = renderer
      }
    },
    handleAdd(evt: any) {
      const { oldIndex, newIndex } = evt
      console.log('add:', oldIndex, newIndex, { ..._currentRenderer })
      if (!_currentRenderer) return

      switch (_currentRenderer.type) {
        case 'form-action':
          this.addAction(_currentRenderer, newIndex)
          break
        default:
          this.addRenderer(_currentRenderer, newIndex)
      }

      _currentRenderer = null
    },
    createRenderer(renderer: RendererOptions): Schema {
      const { name, description } = renderer
      return {
        name: name,
        label: description,
        type: name,
        placeholder: description,
        clearable: true
      }
    },
    addRenderer(renderer: RendererOptions, idx = 0) {
      console.log('add renderer:', { ...renderer }, idx)
      const formControls = this.formOpts.controls
      formControls.splice(idx, 0, this.createRenderer(renderer))
    },
    addAction({ name, description }: RendererOptions, idx = 0) {
      console.log('add action:', { name, description }, idx)
      const formActions = this.formOpts.actions
      formActions.splice(idx, 0, { type: name, label: description })
    },
    renderFormField(schema: Schema) {
      const { type, label, name, rules, controls, style } = schema
      const Tag = rendererStore.getRenderer(type) || type
      const hasChildren = Array.isArray(controls) && controls.length
      const isRequired = controls && controls.some(({ rules }) => {
        return rules && rules.some(({ required }) => required)
      })

      return (
        <FormField.component
          class="view-disabled"
          options={schema}
        >
          <Tag
            options={schema}
            {...{ attrs: { style: getStyle(style) } }}
          >
            {hasChildren ? this.renderFormFields(controls) : null}
          </Tag>
        </FormField.component>
      )
    },
    renderFormFields(schemas: Schema[] = []) {
      return schemas.map(schema => this.renderFormField(schema))
    },
    renderFormAction(action: FormAction) {
      const { type, label, style } = action
      const Tag = rendererStore.getActionRenderer(type) || Button

      return (
        <Tag
          view-disabled
          options={action}
          {...{ attrs: { style: getStyle(style) } }}
        >
          {label}
        </Tag>
      )
    },
    renderFormActions(actions: FormAction[] = []) {
      if (!actions.length) return

      return (
        <FormField.component
          options={{ type: 'buttons', name: 'form-actions' }}
        >
          {actions.map(action => this.renderFormAction(action))}
        </FormField.component>
      )
    }
  },

  render() {
    console.log('render')
    const draggableOptions = {
      group: { name: 'fields' }
    }

    return (
      <form-renderer class="renderer-exhibition" options={this.formOpts} >
        <Draggable
          class="draggable-target"
          tag="div"
          vModel={this.renderers}
          {...{ attrs: { ...draggableOptions } }}
          onEnd={this.handleMoveEnd}
          onChange={this.handleChange}
          onAdd={this.handleAdd}
        >
          {this.renderFormFields(this.formOpts.controls)}
          {this.renderFormActions(this.formOpts.actions)}
        </Draggable>
      </form-renderer>
    )
  }
})
