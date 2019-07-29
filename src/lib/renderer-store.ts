import { Component } from 'vue'
import { RendererOptions } from '@/types'

export default class RendererStore {
  private store!: {
    [propName: string]: RendererOptions
  }

  constructor () {
    this.store = {}
  }

  public register (options: RendererOptions) {
    console.log('register', options.name, options.description)
    this.store[options.name] = options
  }

  public get (type: string) {
    const renderer = this.store[type]

    if (!renderer) {
      throw new Error(`unknown render: ${type}`)
    }

    return renderer
  }

  public getRenderer (type: string) {
    const renderer = this.store[type]

    if (!renderer) {
      throw new Error(`unknown render: ${type}`)
    }

    return renderer.component
  }

  public getAllComponents () {
    return Object.entries(this.store).reduce((acc, [k, { component }]) => {
      acc[k] = component
      return acc
    }, {} as { [propName: string]: Component })
  }
}
