import { DirectiveHandler, DirectiveOpts } from '@/types'

export default class DirectiveStore {
  private store!: {
    [propName: string]: DirectiveOpts
  }

  constructor() {
    this.store = {}
  }

  public register(options: DirectiveOpts) {
    this.store[options.name] = options
  }

  public get(type: string) {
    return this.store[type]
  }

  public getDirective(type: string) {
    const directive = this.store[type]
    return directive && directive.component
  }

  public getAllDirectives() {
    return Object.entries(this.store).reduce((acc, [k, { directive }]) => {
      acc[k] = directive
      return acc
    }, {} as { [propName: string]: DirectiveHandler })
  }
}
