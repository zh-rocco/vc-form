import Vue from 'vue'

export interface PlainObject {
  [propsName: string]: any
}

export type FormActionType = 'submit' | 'reset' | 'back'

export interface FormAction extends PlainObject {
  type: FormActionType
}

export interface BaseProps extends PlainObject {
  type: string
  name: string
  value?: any
  controls?: Schema[]
  actions?: FormAction[]
  visible?: boolean
  disabled?: boolean
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

/** Renderer Options */
export interface RendererOptions extends PlainObject {
  name: string
  description?: string
  component: any
  value?: any
}

/** Directive Options */
export interface DirectiveOptions extends PlainObject {
  name: string
  description?: string
}
