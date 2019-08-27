import Vue from 'vue'
import { DirectiveOptions } from 'vue/types/options'

export interface PlainObject {
  [propsName: string]: any
}

export type FormActionType = 'submit' | 'reset' | 'back' | string

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
export interface RendererOptions<T = any> extends PlainObject {
  name: string
  description?: string
  component: T
  value?: RendererValueType | ((options: Schema) => RendererValueType)
}

// export type DirectiveHandler = (el: Element | HTMLElement, binding: string | boolean | undefined, vm: Vue | any) => void
export type DirectiveHandler = () => DirectiveOptions

/** Directive Options */
export interface DirectiveOpts extends PlainObject {
  name: string
  description?: string
  directive: DirectiveHandler
}
