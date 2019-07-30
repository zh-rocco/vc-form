import RendererStore from './renderer-store'
import Form from '@/forms/form'
import Text from '@/forms/text'
import Select from '@/forms/select'

const rendererStore = new RendererStore()

rendererStore.register(Form)
rendererStore.register(Text)
rendererStore.register(Select)

export { rendererStore }
