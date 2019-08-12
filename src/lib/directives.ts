import DirectiveStore from './directive-store'
import { evalExpression } from '@/element/utils'

const directiveStore = new DirectiveStore()

directiveStore.register({
  name: 'visibleOn',
  description: '通过表达式来配置当前表单项的展示状态。',
  directive(value, model, vm) {
    return evalExpression(value, model)
  }
})

export { directiveStore }
