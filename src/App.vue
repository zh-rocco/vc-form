<template>
  <div id="app">
    <ComponentRenderer :schema="options2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ComponentRenderer from '@/lib/component-renderer' // @ is an alias to /src
import Combo from '@/forms/combo/combo'
import VcText from '@/forms/text/text'

@Component({
  components: {
    ComponentRenderer,
    Combo,
    VcText
  }
})
export default class App extends Vue {
  private options = {
    name: 'type',
    type: 'vc-form',
    inline: true,
    controls: [
      {
        name: 'name',
        label: '客户姓名',
        type: 'vc-text',
        placeholder: '请输入客户的姓名',
        rules: [
          { required: true, message: '请输入客户的姓名', trigger: 'blur' }
        ]
      },
      {
        name: 'telephone',
        label: '移动电话',
        type: 'vc-text',
        placeholder: '请输入客户的移动电话',
        rules: [
          { required: true, message: '请输入客户的移动电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的移动电话', trigger: 'blur' }
        ]
      }
    ]
  }

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
  }
}
</script>

<style lang="less">
</style>
