import Vue from 'vue'
import { cloneDeep, pickBy } from 'lodash'
import { Component, Prop } from 'vue-property-decorator'
import _Renderer from '@/element/renderer'
import { PlainObject } from '@/types'

const Renderer: any = Vue.extend(_Renderer)

// 生成随机字符串 (length <= 10)
function getRandomString(length = 10) {
  return Math.random()
    .toString(36)
    .substr(2, Math.min(length, 10))
}

@Component
export default class Combo extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly value!: PlainObject[] // form 的数据模型
  @Prop({ type: String, required: true }) readonly prop!: string // 对应 el-form-item 的 prop 字段
  @Prop({ type: Array, default: () => [] }) readonly controls!: any[] // combo 配置
  @Prop({ type: Boolean, default: true }) readonly inline!: boolean // 表单内联
  @Prop({ type: Number, default: 1 }) readonly min!: number // combo-item 的最小数量
  @Prop({ type: Number, default: Infinity }) readonly max!: number // combo-item 的最大数量

  private formModelStructure: PlainObject = {} // combo-item 数据结构

  // combo 组件的数据模型
  private get localValue() {
    return this.value
  }

  private get length() {
    return this.localValue.length
  }

  // 添加 combo-item
  private add() {
    if (this.length >= this.max) return

    this.localValue.push(cloneDeep(this.formModelStructure))
  }

  // 删除 combo-item
  private remove(index: number) {
    if (!this.localValue[index]) return

    this.localValue.splice(index, 1)
  }

  // 生成 combo-item
  private createComboItem(index = 0) {
    const builtIn = ['name', 'label', 'type'] // 需要特殊处理的字段
    const { prop: propName } = this

    return this.controls.map((control) => {
      const { name, label, type, rules } = control
      const extra = pickBy(control, (value, key) => !builtIn.includes(key))
      const path = `${propName}.${index}.${name}`

      return (
        <el-form-item prop={path} rules={rules}>
          <Renderer
            options={{ ...control, ...{ name: path } }}
          />
        </el-form-item>
      )
    })
  }

  // 生成 combo
  private createCombo() {
    return Array.from({ length: this.length }).map((item, index) => {
      return (
        <div class="crm-combo-item">
          {this.createComboItem(index)}

          <el-form-item>
            <el-button
              type="text"
              disabled={this.length <= this.min}
              onClick={() => this.remove(index)}
            >
              删除
            </el-button>
          </el-form-item>
        </div>
      )
    })
  }

  private getComboStructure() {
    return this.controls.reduce((acc: { [prop: string]: any }, curr) => {
      acc[curr.name] = null
      return acc
    }, {})
  }

  private initDefaultValue() {
    let i = this.min
    while (i) {
      this.add()
      i--
    }
  }

  render() {
    this.formModelStructure = this.getComboStructure()

    if (!this.length) {
      return this.initDefaultValue()
    }

    const combo = this.createCombo()

    const className = this.inline ? 'crm-combo crm-combo--inline' : 'crm-combo'

    return (
      <div class={className}>
        <el-form-item>
          <el-button onClick={this.add} disabled={this.length >= this.max}>添加</el-button>
        </el-form-item>

        {combo}
      </div>
    )
  }
}
