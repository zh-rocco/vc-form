import { Component } from 'vue'
import { isFunction, isArray } from 'lodash'
import { PlainObject, Schema, RendererOptions } from '@/types'

export const OptionsControl = (config: PlainObject) => {
  // console.log('OptionsControl', config)
  return function (component: Component): any {
    // console.log('OptionsControl', { ...config, component })
    return { ...config, component }
  }
}

// export const OptionsControl = (config: PlainObject) => (component: Component) => ({ ...config, component })

type WalkCallback = (schema: Schema, parent: Schema | null) => void

const recursive = (current: Schema, cb?: WalkCallback, parent: Schema | null = null) => {
  if (isFunction(cb)) {
    cb(current, parent)
  }

  const { controls } = current

  if (isArray(controls)) {
    for (const control of controls) {
      recursive(control, cb, current)
    }
  }
}

/** 深度遍历 schema */
export const walk = (schema: Schema, cb?: WalkCallback) => {
  recursive(schema, cb)
}

export const getStyle = (styleObject: PlainObject | undefined) => {
  if (typeof styleObject !== 'object') return

  return Object.entries(styleObject)
    .reduce(
      (styleArray, [k, v]) => {
        styleArray.push(`${k}: ${v}`)
        return styleArray
      },
      [] as string[]
    )
    .join('; ')
}

export const evalExpression = (expression: string, data?: PlainObject): boolean => {
  try {
    // eslint-disable-next-line
    const fn = new Function("$model", `return !!(${expression})`);
    data = data || {}
    return fn.call(data, data)
  } catch (e) {
    console.warn(e)
    return false
  }
}

export const typeConductionFunction = <T>(payload: T): T => {
  return payload
}

export const isObject = (input: any) => Object.prototype.toString.call(input) === '[object Object]'
