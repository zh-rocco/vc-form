import RendererStore from './renderer-store'
import Form from '@/element/form'
import Text from '@/element/text'
import Select from '@/element/select'
import Date from '@/element/date'
import Time from '@/element/time'

const rendererStore = new RendererStore()

rendererStore.register(Form)
rendererStore.register(Text)
rendererStore.register(Select)
rendererStore.register(Date)
rendererStore.register(Time)

export { rendererStore }
