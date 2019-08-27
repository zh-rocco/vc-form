import { cloneDeep, pickBy, get } from 'lodash'
import { Component } from 'vue-property-decorator'
import Renderer from '@/element/renderer'
import FormField from '@/element/form-field'
import { typeConductionFunction } from '../utils'
import ConnectMixin from '../connect'
import { RendererOptions, PlainObject } from '@/types'

// 生成随机字符串 (length <= 10)
function genRandomString(length = 10) {
  return Math.random()
    .toString(36)
    .substr(2, Math.min(length, 10))
}

@Component
class ComboControl extends ConnectMixin {
  private keys: string[] = []

  public get localValue() {
    const value = get(this.formModel, this.prop) as PlainObject[]

    value.forEach(v => {
      if (!v.__key__) {
        v.__key__ = genRandomString()
      }
    })

    return value
  }

  private get controls() {
    return this.options.controls || []
  }

  // 是否 inline 显示
  private get inline() {
    const { inline } = this.options
    return inline === undefined ? true : inline
  }

  // combo-item 的最大数量
  private get min() {
    const { min } = this.options
    return min === undefined ? 1 : min
  }

  // combo-item 的最大数量
  private get max() {
    const { max } = this.options
    return max === undefined ? Infinity : max
  }

  // combo-item 数据结构
  private get dataStructure() {
    return this.controls.reduce((acc: { [prop: string]: any }, curr) => {
      acc[curr.name] = null
      return acc
    }, {})
  }

  private get length() {
    return this.localValue.length
  }

  // 添加 combo-item
  private add() {
    if (this.length >= this.max) return

    this.localValue.push(cloneDeep(this.dataStructure))
    this.keys.push(genRandomString())
  }

  // 删除 combo-item
  private remove(index: number) {
    if (!this.localValue[index]) return

    this.localValue.splice(index, 1)
    this.keys.splice(index, 1)
  }

  // 生成 combo-item
  private createComboItem(index = 0) {
    const builtIn = ['name', 'label', 'type'] // 需要特殊处理的字段
    const { prop: propName } = this

    return this.controls.map((control) => {
      const { name, label, type, rules } = control
      const extra = pickBy(control, (value, key) => !builtIn.includes(key))
      const path = `${propName}.${index}.${name}`
      const _options = { ...control, ...{ name: path } }

      return (
        <FormField.component
          options={_options}
        >
          <Renderer
            options={_options}
          />
        </FormField.component>
      )
    })
  }

  // 生成 combo
  private createCombo() {
    return this.localValue.map((item, index) => {
      return (
        <div
          class="crm-combo-item"
          key={item.__key__}
        >
          {this.createComboItem(index)}

          <el-button
            type="text"
            disabled={this.length <= this.min}
            onClick={() => this.remove(index)}
          >
            删除
          </el-button>
        </div>
      )
    })
  }

  private initDefaultValue() {
    let i = this.min
    while (i) {
      this.add()
      i--
    }
  }

  render() {
    if (this.min && !this.length) {
      return this.initDefaultValue()
    }

    // console.log('render combo driver:', this.options.name)

    const className = this.inline ? 'crm-combo crm-combo--inline inline' : 'crm-combo'

    return (
      <div class={className}>
        {this.createCombo()}

        <FormField.component
          options={{ type: 'button', name: 'add' }}
        >
          <el-button onClick={this.add} disabled={this.length >= this.max}>添加</el-button>
        </FormField.component>
      </div >
    )
  }
}

export default typeConductionFunction<RendererOptions<typeof ComboControl>>({
  name: 'combo',
  description: '可增删组件',
  component: ComboControl,
  value: () => []
})
