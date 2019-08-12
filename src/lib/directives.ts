import DirectiveStore from './directive-store'
import { evalExpression } from '@/element/utils'

const directiveStore = new DirectiveStore()

directiveStore.register({
  name: 'visibleOn',
  description: '通过表达式来配置当前表单项的展示状态。',
  directive(el, binding, vm) {
    console.log('visibleOn', el, binding, vm)
    const { formModel: model } = vm

    let isVisible = true

    if (binding === undefined) {
      isVisible = true
    }

    if (typeof binding === 'boolean') {
      isVisible = binding
    }

    if (typeof binding === 'string') {
      isVisible = evalExpression(binding, model)
    }

    if (!isVisible) {
      (el.parentNode as HTMLElement).removeChild(el)
    }
  }
})

directiveStore.register({
  name: 'autoFocus',
  description: '自动聚焦。',
  directive(el, binding, vm) {
    console.log('autoFocus', el, binding, vm)
    const $input = el.querySelector('input')

    if ($input) {
      setTimeout(() => {
        $input.focus()
      }, 0)
    }
  }
})

export { directiveStore }
