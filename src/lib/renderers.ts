import RendererStore from './renderer-store'
import Combo from '@/forms/combo'

const rendererStore = new RendererStore()

rendererStore.register(Combo)

export { rendererStore }
