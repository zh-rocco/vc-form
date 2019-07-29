import RendererStore from './renderer-store'
// import Combo from '@/forms/combo'
import Text from '@/forms/text'
import Select from '@/forms/select'

const rendererStore = new RendererStore()

// rendererStore.register(Combo)
rendererStore.register(Text)
rendererStore.register(Select)

export { rendererStore }
