import Vue from 'vue'

export interface PlainObject {
  [propsName: string]: any
}

export type FormActionType = 'submit' | 'reset' | 'back'

export interface FormAction extends PlainObject {
  type: FormActionType
}

export interface SchemaOption {
  name: string | number | boolean
  value: string | number | boolean
}

export interface BaseProps extends PlainObject {
  type: string
  name: string
  value?: any
  controls?: Schema[]
  actions?: FormAction[]
  visibleOn?: string | boolean
  disabledOn?: string | boolean
  disabled?: boolean
  options: SchemaOption[]
}

export interface FormItemProps extends BaseProps {
  placeholder?: string
  clearable?: boolean
  rules?: PlainObject[]
}

export interface FormProps extends BaseProps {
}

export interface Schema extends FormItemProps {
  __parent__: Schema | null
}

/** Renderer Component */
export declare class RendererComponent extends Vue {
  [propsName: string]: any
}

type _RendererValueType = null | boolean | number | string | PlainObject
type RendererValueType = _RendererValueType | _RendererValueType[]

/** Renderer Options */
export interface RendererOptions extends PlainObject {
  name: string
  description?: string
  component: any
  value?: RendererValueType | ((options: Schema) => RendererValueType)
}

export type DirectiveHandler = (el: Element | HTMLElement, binding: string | boolean | undefined, vm: Vue | any) => void

/** Directive Options */
export interface DirectiveOptions extends PlainObject {
  name: string
  description?: string
  directive: DirectiveHandler
}
