import { Component } from 'vue'
import { isFunction, isArray } from 'lodash'
import { PlainObject, Schema } from '@/types'

export function OptionsControl(config: PlainObject) {
  console.log('OptionsControl', config)
  return function (component: Component): any {
    console.log('OptionsControl', { ...config, component })
    return { ...config, component }
  }
}

// export const OptionsControl = (config: PlainObject) => (component: Component) => ({ ...config, component })

export function walk(schema: Schema, cb?: (schema: Schema) => void) {
  const { controls } = schema

  if (isFunction(cb)) {
    cb(schema)
  }

  if (isArray(controls)) {
    for (const control of controls) {
      walk(control, cb)
    }
  }
}
