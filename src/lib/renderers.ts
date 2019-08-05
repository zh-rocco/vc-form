import components from '@/element'
import RendererStore from './renderer-store'

const rendererStore = new RendererStore()

Object.values(components).forEach(component => {
  rendererStore.register(component)
})

export { rendererStore }
