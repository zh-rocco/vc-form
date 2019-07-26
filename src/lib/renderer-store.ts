import { RendererOptions } from '@/types'

export default class RendererStore {
  private store!: {
    [propName: string]: RendererOptions
  }

  constructor () {
    this.store = {}
  }

  public register (options: RendererOptions) {
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
}
