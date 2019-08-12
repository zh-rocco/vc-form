<template>
  <div id="app">
    <FormRenderer :options="options" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FormRenderer from '@/element/form'

@Component({
  components: {
    FormRenderer
  }
})
export default class App extends Vue {
  private wrapped: string | null = null
  private selected: boolean = false

  private options = {
    type: 'vc-form',
    style: {
      // width: '600px',
      'user-select': 'none'
    },
    size: 'mini',
    controls: [
      {
        name: 'name',
        label: '活动名称',
        type: 'vc-text',
        placeholder: '请输入活动名称',
        clearable: true,
        rules: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ]
      },
      {
        name: 'region',
        label: '活动区域',
        type: 'vc-select',
        placeholder: '请输选择活动区域',
        clearable: true,
        options: [
          { name: '区域一', value: 'shanghai' },
          { name: '区域二', value: 'beijing' }
        ],
        rules: [
          { required: true, message: '请输选择活动区域', trigger: 'change' }
        ]
      },
      {
        type: 'inline-layout',
        label: '活动时间',
        controls: [
          {
            name: 'date',
            type: 'vc-date',
            clearable: true,
            rules: [
              { required: true, message: '请选择活动日期', trigger: 'change' }
            ]
          },
          {
            name: 'time',
            type: 'vc-time',
            clearable: true,
            rules: [
              { required: true, message: '请选择活动时间', trigger: 'change' }
            ]
          }
        ]
      },
      {
        name: 'rate',
        label: '评分',
        type: 'vc-rate'
      },
      {
        name: 'combo',
        label: '组合',
        type: 'vc-combo',
        max: 50,
        min: 1,
        inline: true,
        controls: [
          {
            name: 'name',
            // label: '客户姓名',
            type: 'vc-text',
            placeholder: '请输入客户的姓名',
            clearable: true,
            rules: [
              { required: true, message: '请输入客户的姓名', trigger: 'blur' }
            ]
          },
          {
            name: 'telephone',
            // label: '移动电话',
            type: 'vc-text',
            placeholder: '请输入客户的移动电话',
            clearable: true,
            rules: [
              { required: true, message: '请输入客户的移动电话', trigger: 'change' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的移动电话', trigger: 'change' }
            ]
          },
          {
            name: 'region',
            // label: '活动区域',
            type: 'vc-select',
            placeholder: '请输选择活动区域',
            clearable: true,
            options: [
              { name: '区域一', value: 'shanghai' },
              { name: '区域二', value: 'beijing' }
            ],
            rules: [
              { required: true, message: '请输选择活动区域', trigger: 'change' }
            ]
          }
        ]
      },
      {
        name: 'switch',
        label: '开关',
        type: 'vc-switch'
      },
      {
        name: 'switch-control',
        label: '开关控制',
        type: 'vc-text',
        placeholder: '测试开关控制',
        clearable: true,
        visibleOn: '$model.switch === true'
      },
      {
        name: 'radio',
        label: '地区选择',
        type: 'vc-radio',
        value: 'shanghai',
        options: [
          { name: '上海', value: 'shanghai' },
          { name: '北京', value: 'beijing' }
        ]
      },
      {
        name: 'radio-control',
        label: '禁用',
        type: 'vc-text',
        placeholder: '测试禁用',
        clearable: true,
        disabledOn: '$model.radio === "shanghai"'
      }
    ],
    actions: [
      {
        type: 'submit',
        label: '立即创建'
      },
      {
        type: 'reset',
        label: '重置'
      },
      {
        type: 'back',
        label: '返回'
      }
    ]
  };

  private options2 = {
    component: 'el-form',
    _style: {
      width: '460px'
    },
    options: {
      size: 'small',
      labelWidth: '80px'
    },
    children: [
      {
        component: 'el-form-item',
        options: {
          prop: 'name',
          label: '活动名称'
        },
        children: [
          {
            component: 'el-input',
            _name: 'name'
          }
        ]
      },
      {
        component: 'el-form-item',
        options: {
          prop: 'region',
          label: '活动区域'
        },
        children: [
          {
            component: 'el-select',
            _name: 'region',
            options: {
              placeholder: '请选择活动区域'
            },
            children: [
              {
                component: 'el-option',
                options: {
                  label: '区域一',
                  value: 'shanghai'
                }
              },
              {
                component: 'el-option',
                options: {
                  label: '区域二',
                  value: 'beijing'
                }
              }
            ]
          }
        ]
      },
      {
        component: 'el-form-item',
        options: {
          label: '活动时间'
        },
        children: [
          {
            component: 'el-col',
            options: {
              span: 11
            },
            children: [
              {
                component: 'el-form-item',
                options: {
                  prop: 'date1'
                },
                children: [
                  {
                    component: 'el-date-picker',
                    _style: {
                      width: '100%'
                    },
                    _name: 'date1',
                    options: {
                      type: 'date',
                      placeholder: '选择日期'
                    }
                  }
                ]
              }
            ]
          },
          {
            component: 'el-col',
            _style: {
              'text-align': 'center'
            },
            options: {
              span: 2
            },
            children: [
              {
                component: {
                  render(h: any) {
                    return h('span', undefined, '-')
                  }
                }
              }
            ]
          },
          {
            component: 'el-col',
            options: {
              span: 11
            },
            children: [
              {
                component: 'el-form-item',
                options: {
                  prop: 'date2'
                },
                children: [
                  {
                    component: 'el-time-picker',
                    _style: {
                      width: '100%'
                    },
                    _name: 'date2',
                    options: {
                      type: 'fixed-time',
                      placeholder: '选择时间'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        component: 'el-form-item',
        options: {
          prop: 'delivery',
          label: '即时配送'
        },
        children: [
          {
            component: 'el-switch',
            _name: 'delivery'
          }
        ]
      },
      {
        component: 'el-form-item',
        options: {
          prop: 'type',
          label: '活动性质'
        },
        children: [
          {
            component: 'el-checkbox-group',
            _name: 'type',
            options: {},
            children: [
              {
                component: 'el-checkbox',
                options: {
                  label: '美食/餐厅线上活动'
                }
              },
              {
                component: 'el-checkbox',
                options: {
                  label: '地推活动'
                }
              },
              {
                component: 'el-checkbox',
                options: {
                  label: '线下主题活动'
                }
              },
              {
                component: 'el-checkbox',
                options: {
                  label: '单纯品牌曝光'
                }
              }
            ]
          }
        ]
      },
      {
        component: 'el-form-item',
        options: {
          prop: 'resource',
          label: '特殊资源'
        },
        children: [
          {
            component: 'el-radio-group',
            _name: 'resource',
            options: {},
            children: [
              {
                component: 'el-radio',
                options: {
                  label: '线上品牌商赞助'
                }
              },
              {
                component: 'el-radio',
                options: {
                  label: '线下场地免费'
                }
              }
            ]
          }
        ]
      },
      {
        component: 'el-form-item',
        options: {
          prop: 'desc',
          label: '活动形式'
        },
        children: [
          {
            component: 'el-input',
            _name: 'desc',
            options: {
              type: 'textarea'
            }
          }
        ]
      }
    ]
  };
}
</script>

<style lang="less">
body {
  margin: 8px;
  user-select: none;
}

.form-renderer {
  .el-form-item.nested {
    margin-bottom: 0;
  }

  .el-input {
    width: auto;
  }

  .el-form-item__content > .inline {
    .el-form-item {
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
