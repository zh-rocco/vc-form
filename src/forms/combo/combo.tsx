import { cloneDeep, pickBy } from 'lodash'
import { Component, Prop, Vue } from 'vue-property-decorator'

// 生成随机字符串 (length <= 10)
function getRandomString (length = 10) {
  return Math.random()
    .toString(36)
    .substr(2, Math.min(length, 10))
}

@Component
export default class CrmCombo extends Vue {
  @Prop({ type: Object, default: () => ({}) }) readonly model!: any // form 的数据模型
  @Prop({ type: String, required: true }) readonly prop!: string // 对应 el-form-item 的 prop 字段
  @Prop({ type: Array, default: () => [] }) readonly controls!: any[] // combo 配置
  @Prop({ type: Boolean, default: true }) readonly inline!: boolean // 表单内联
  @Prop({ type: Number, default: 1 }) readonly min!: number // combo-item 的最小数量
  @Prop({ type: Number, default: Infinity }) readonly max!: number // combo-item 的最大数量

  private formModelStructure: { [prop: string]: any } = {} // combo-item 数据结构
  private comboKeys: string[] = []

  // combo 组件的数据模型
  private get localValue () {
    const value = this.model[this.prop]
    return Array.isArray(value) ? value : []
  }
  private set localValue (value: any[]) {
    this.model[this.prop] = value
  }

  // 添加 combo-item
  private add () {
    if (this.comboKeys.length >= this.max) return

    this.localValue = [...this.localValue, cloneDeep(this.formModelStructure)]
    this.comboKeys.push(getRandomString())
  }

  // 删除 combo-item
  private remove (index: number) {
    if (!this.localValue[index]) return
    const value = this.localValue.slice()
    value.splice(index, 1)
    this.localValue = value
    this.comboKeys.splice(index, 1)
  }

  // 生成 combo-item
  private createComboItem (index = 0) {
    const builtIn = ['name', 'label', 'type'] // 需要特殊处理的字段
    const { prop: propName, localValue } = this
    const valueObject = localValue[index]

    return this.controls.map((control) => {
      const { name, label, type, rules } = control
      const extra = pickBy(control, (value, key) => !builtIn.includes(key))

      return (
        <el-form-item prop={`${propName}.${index}.${name}`} rules={rules}>
          <el-input
            vModel={valueObject[name]}
            {...{ attrs: extra }}
            clearable
          />
        </el-form-item>
      )
    })
  }

  // 生成 combo
  private createCombo () {
    return this.localValue.map((item, index) => {
      return (
        <div class="crm-combo-item" key={this.comboKeys[index]}>
          {this.createComboItem(index)}

          <el-form-item>
            <el-button
              type="text"
              disabled={this.localValue.length <= this.min}
              onClick={() => this.remove(index)} >删除</el-button>
          </el-form-item>
        </div>
      )
    })
  }

  render () {
    console.log('render')

    this.formModelStructure = this.controls.reduce((acc: { [prop: string]: any }, curr) => {
      acc[curr.name] = null
      return acc
    }, {})

    if (!this.localValue.length) {
      let i = this.min
      while (i) {
        this.add()
        i--
      }
      return
    }

    const combo = this.createCombo()

    // console.log('render', JSON.stringify(this.localValue))
    const className = this.inline ? 'crm-combo crm-combo--inline' : 'crm-combo'

    return (
      <div class={className}>
        {combo}

        <el-form-item>
          <el-button onClick={this.add} disabled={this.localValue.length >= this.max}>添加</el-button>
        </el-form-item>
      </div>
    )
  }
}
