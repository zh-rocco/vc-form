import { Component } from 'vue'
import { RendererOptions, RendererComponent } from '@/types'

export default class RendererStore {
  private store!: {
    [propName: string]: RendererOptions
  }

  constructor() {
    this.store = {}
  }

  public register(options: RendererOptions) {
    // console.log('register', options.name, options.description)
    this.store[options.name] = options
  }

  public get(type: string) {
    return this.store[type]
  }

  public getRenderer(type: string) {
    const renderer = this.store[type]
    return renderer && renderer.component
  }

  public getAllComponents() {
    return Object.entries(this.store).reduce((acc, [k, { component }]) => {
      acc[k] = component
      return acc
    }, {} as { [propName: string]: Component })
  }

  public getDefaultValue(type: string) {
    const value = this.get(type).value
    return value === undefined ? null : value
  }
}
