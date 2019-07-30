import { Component } from 'vue'

export interface PlainObject {
  [propsName: string]: any
}

export interface BaseProps extends PlainObject {
  type: string
  name: string
  value?: any
  controls?: Schema[]
  visible?: boolean
  disabled?: boolean
}

export interface FormItemProps extends BaseProps {
  placeholder?: string
  clearable?: boolean
  rules?: object[]
}

export interface FormProps extends BaseProps {
}

export interface Schema extends FormItemProps {
  __parent__: Schema | null
}

export interface RendererOptions {
  name: string,
  description?: string,
  component: any
}
