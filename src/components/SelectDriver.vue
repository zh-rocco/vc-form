<template>
  <el-select v-model="localValue"
             v-bind="attrs"
             v-on="listeners">
    <el-option v-for="item in filteredList"
               :key="item[options.value]"
               :label="item[options.label]"
               :value="item[options.value]" />
  </el-select>
</template>

<script>
import { kebabCase, isArray, isFunction, debounce } from 'lodash'

export default {
  name: 'select-driver',

  props: {
    value: { type: [Array, String], default: null },
    data: { type: Array, default: () => [] },
    props: { type: Object, default: null },
    filterMethod: { type: Function, default: null }
  },

  data () {
    return {
      filteredList: []
    }
  },

  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },

    attrs () {
      return Object.assign(
        { filterable: true, clearable: true },
        this.$attrs,
        { filterMethod: debounce(this.filter, 300) }
      )
    },

    listeners () {
      const listeners = Object.entries(this.$listeners).reduce((acc, [k, v]) => {
        acc[kebabCase(k)] = v
        return acc
      }, {})
      const oldVisibleChange = listeners['visible-change']

      listeners['visible-change'] = (val) => {
        this.handleVisibleChange(val)
        isFunction(oldVisibleChange) && oldVisibleChange(val)
      }

      return listeners
    },

    options () {
      return Object.assign({ label: 'name', value: 'value' }, this.props)
    }
  },

  watch: {
    data: {
      handler (nv) {
        if (isArray(nv)) {
          this.filteredList = nv
        }
      },
      immediate: true
    }
  },

  methods: {
    handleVisibleChange () {
      setTimeout(() => {
        this.filteredList = this.data
      }, 100)
    },

    filter (val) {
      if (val) {
        if (isFunction(this.filterMethod)) {
          this.filteredList = this.data.filter((item) => this.filterMethod(val, item))
        } else {
          const labelKey = this.options.label
          this.filteredList = this.data.filter((item) => (item[labelKey] + '').includes(val))
        }
      } else {
        this.filteredList = this.data
      }
    }
  }
}
</script>
