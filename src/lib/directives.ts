import DirectiveStore from './directive-store'
import { evalExpression } from '@/element/utils'

const directiveStore = new DirectiveStore()

directiveStore.register({
  name: 'visibleOn',
  description: '通过表达式来配置当前表单项的展示状态。',
  directive() {
    return {
      inserted(el, binding, vnode, oldVnode) {
        console.log('~!@#$', 'inserted', 'visibleOn', binding)
        const vm = vnode.context
        const { formModel: model } = vm as any

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
          console.log('*', 'inserted')
          // (el.parentNode as HTMLElement).removeChild(el)
        }
      },
      update(el, binding, vnode, oldVnode) {
        console.log('~!@#$', 'update', 'visibleOn', binding)
        const vm = vnode.context
        const { formModel: model } = vm as any

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
          console.log('*', 'update')
          // (el.parentNode as HTMLElement).removeChild(el)
        }
      }
    }
  }
})

directiveStore.register({
  name: 'autoFocus',
  description: '自动聚焦。',
  directive() {
    return {
      inserted(el, binding, vnode, oldVnode) {
        console.log('~!@#$', 'autoFocus', binding, vnode)
        const $input = el.querySelector('input')

        if ($input) {
          setTimeout(() => {
            $input.focus()
          }, 0)
        }
      }
    }
  }
})

export { directiveStore }
