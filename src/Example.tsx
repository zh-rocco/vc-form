import { Component, Vue } from 'vue-property-decorator'
import FormRenderer from '@/element/form'

@Component({
  components: {
    FormRenderer
  }
})
export default class Renderer extends Vue {
  private options = {
    type: 'form',
    style: {
      // width: '600px',
      'user-select': 'none'
    },
    size: 'mini',
    controls: [
      {
        type: 'divider'
      },

      {
        name: 'combo',
        label: '组合',
        type: 'combo',
        max: 50,
        min: 0,
        inline: true,
        value: [
          // { name: '123', telephone: '13312341234' },
          // { name: '456', telephone: '13312341234' },
          // { name: '789', telephone: '13312341234' },
          // { name: '000', telephone: '13312341234' }
        ],
        controls: [
          {
            name: 'name',
            // label: '客户姓名',
            type: 'text',
            placeholder: '请输入客户的姓名',
            clearable: true,
            rules: [
              { required: true, message: '请输入客户的姓名', trigger: 'blur' }
            ]
          },
          {
            name: 'telephone',
            // label: '移动电话',
            type: 'text',
            placeholder: '请输入客户的移动电话',
            clearable: true,
            rules: [
              {
                required: true,
                message: '请输入客户的移动电话',
                trigger: 'change'
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入合法的移动电话',
                trigger: 'change'
              }
            ]
          },
          {
            name: 'region',
            // label: '活动区域',
            type: 'select',
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
        type: 'divider'
      },

      {
        name: 'name',
        label: '活动名称',
        type: 'text',
        placeholder: '请输入活动名称',
        clearable: true,
        rules: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ]
      },

      {
        name: 'region',
        label: '活动区域',
        type: 'select',
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
            type: 'date',
            clearable: true,
            rules: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ]
          },
          {
            name: 'time',
            type: 'time',
            clearable: true,
            rules: [
              { required: true, message: '请选择时间', trigger: 'change' }
            ]
          }
        ]
      },

      {
        name: 'delivery',
        label: '即时配送',
        type: 'switch'
      },

      {
        name: 'type',
        label: '活动性质',
        type: 'checkbox',
        options: [
          { name: '美食/餐厅线上活动' },
          { name: '地推活动' },
          { name: '线下主题活动' },
          { name: '单纯品牌曝光' }
        ],
        rules: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ]
      },

      {
        name: 'resource',
        label: '特殊资源',
        type: 'radio',
        options: [{ name: '线上品牌商赞助' }, { name: '线下场地免费' }],
        rules: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      },

      {
        name: 'desc',
        label: '活动形式',
        type: 'textarea',
        clearable: true,
        rules: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },

      {
        type: 'divider'
      },

      {
        name: 'slider',
        label: '滑块',
        type: 'slider',
        step: 5,
        showStops: true,
        value: 50
      },

      {
        name: 'rate',
        label: '评分',
        type: 'rate'
      },

      {
        name: 'switch1',
        label: '展示',
        type: 'switch'
      },
      {
        name: 'switch1_control',
        label: '联动隐藏',
        type: 'text',
        placeholder: '点击 "展示开关" 隐藏',
        clearable: true,
        visibleOn: '$model.switch1 === true'
      },

      {
        name: 'switch2',
        label: '禁用',
        type: 'switch',
        value: true
      },
      {
        name: 'switch2_control',
        label: '联动禁用',
        type: 'text',
        placeholder: '点击 "禁用开关" 禁用',
        clearable: true,
        disabledOn: '$model.switch2 === true'
      },

      {
        name: 'static',
        label: '静态文本',
        type: 'static',
        value: '这是静态展示的值'
      },

      {
        type: 'divider'
      },

      {
        name: 'username',
        label: '用户名',
        type: 'text',
        placeholder: '请输入用户名',
        clearable: true,
        // autoFocus: true,
        rules: [{ required: true, message: '请输入用户名', trigger: 'change' }]
      },
      {
        name: 'password',
        label: '密码',
        type: 'password',
        placeholder: '请输入密码',
        clearable: true,
        rules: [{ required: true, message: '请输入密码', trigger: 'change' }]
      },
      {
        name: 'save_username',
        type: 'checkbox',
        options: [{ name: '记住用户名' }]
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

  render() {
    return (
      <form-renderer
        options={this.options}
      />
    )
  }
}
