import { Component } from 'vue'
import { PlainObject, RendererOptions } from '@/types'
import { rendererStore } from '../lib/renderers'

console.log('---', rendererStore)

export function OptionsControl (config: PlainObject) {
  console.log('OptionsControl', config)
  return function (component: any): Component {
    console.log('OptionsControl', { ...config, component })
    rendererStore.register({ ...config, component } as RendererOptions)
    return component
  }
}
