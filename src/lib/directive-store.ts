import { DirectiveOptions } from '@/types'

export default class DirectiveStore {
  private store!: {
    [propName: string]: DirectiveOptions
  }

  constructor() {
    this.store = {}
  }

  public register(options: DirectiveOptions) {
    this.store[options.name] = options
  }

  public get(type: string) {
    return this.store[type]
  }

  public getDirective(type: string) {
    const directive = this.store[type]
    return directive && directive.component
  }
}
