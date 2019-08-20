import Vue from 'vue'
import DirectiveStore from './directive-store'
import { evalExpression } from '@/element/utils'
import { PlainObject } from '@/types'

const directiveStore = new DirectiveStore()

const judgeVisible = (value: any, $model: PlainObject) => {
  if (value === undefined) {
    return true
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    return evalExpression(value, $model)
  }
}

directiveStore.register({
  name: 'visibleOn',
  description: '通过表达式来配置当前表单项的展示状态。',
  directive() {
    return {
      bind(el, binding, vnode, oldVnode) {
        console.log('~!@#$', 'visibleOn', binding)
        const { value } = binding
        const vm = vnode.context as any
        const { $model } = vm
        const isVisible = judgeVisible(value, $model)
        vm.isVisible = isVisible

        vm.$_unwatches = (value.match(/\$model\.(\w+)/gi) || []).map((keyPath: string) => {
          console.log('##', 'watch', keyPath)
          console.log(vm)
          return vm.$watch(keyPath, () => {
            vm.isVisible = evalExpression(value, $model)
            console.log('##', 'forceUpdate')
            vm.$forceUpdate()
          })
        })

        console.log('~!@#$ ***', 'inserted', isVisible)
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
        console.log('~!@#$', 'autoFocus', binding)
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
