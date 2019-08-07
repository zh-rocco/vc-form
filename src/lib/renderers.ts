import components from '@/element'
import Submit from '@/element/actions/submit'
import Reset from '@/element/actions/reset'
import Back from '@/element/actions/back'
import RendererStore from './renderer-store'

const rendererStore = new RendererStore()

Object.values(components).forEach(component => {
  rendererStore.register(component)
})

rendererStore.registerAction(Submit)
rendererStore.registerAction(Reset)
rendererStore.registerAction(Back)

export { rendererStore }
