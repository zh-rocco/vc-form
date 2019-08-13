import Vue from 'vue'

export interface PlainObject {
  [propsName: string]: any
}

export type FormActionType = 'submit' | 'reset' | 'back'

export interface FormAction extends PlainObject {
  type: FormActionType
}

export interface SchemaOptionField {
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
  options?: SchemaOptionField[]
}

export interface FormFieldProps extends BaseProps {
  placeholder?: string
  clearable?: boolean
  options?: SchemaOptionField[]
  rules?: PlainObject[]
}

export interface FormProps extends BaseProps {
  actions?: FormAction[]
}

export interface Schema extends FormFieldProps {
}

type _RendererValueType = null | boolean | number | string | PlainObject

export type RendererValueType = _RendererValueType | _RendererValueType[]

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
