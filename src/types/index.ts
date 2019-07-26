import { Component } from 'vue'

export interface PlainObject {
  [propsName: string]: any
}

export interface Schema extends PlainObject {
  type: string
  name: string
  controls?: Schema[]
  placeholder?: string
  rules?: object[]
}

export interface RendererOptions {
  name: string,
  description?: string,
  component: Component
}
