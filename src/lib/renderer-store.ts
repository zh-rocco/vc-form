import { Component } from 'vue'
import { isFunction } from 'lodash'
import { RendererOptions, Schema } from '@/types'

export default class RendererStore {
  private store!: {
    [propName: string]: RendererOptions
  }

  private actionStore!: {
    [propName: string]: RendererOptions
  }

  constructor() {
    this.store = {}
    this.actionStore = {}
  }

  public register(options: RendererOptions) {
    // console.log('register', options.name, options.description)
    this.store[options.name] = options
  }

  public getAllFields() {
    return this.store
  }

  public getAllActions() {
    return this.actionStore
  }

  public get(type: string) {
    return this.store[type]
  }

  public getRenderer(type: string) {
    const renderer = this.store[type]
    return renderer && renderer.component
  }

  public registerAction(options: RendererOptions) {
    this.actionStore[options.name] = options
  }

  public getActionRenderer(type: string) {
    const renderer = this.actionStore[type]
    return renderer && renderer.component
  }

  public getAllComponents() {
    return Object.entries(this.store).reduce((acc, [k, { component }]) => {
      acc[k] = component
      return acc
    }, {} as { [propName: string]: Component })
  }

  public getDefaultValue(options: Schema) {
    const render = this.get(options.type)

    if (!render) {
      return null
    }

    const value = render.value

    if (value === undefined) {
      return null
    }

    if (isFunction(value)) {
      return value(options)
    }

    return value
  }
}
