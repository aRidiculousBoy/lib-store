export default {
  showFooter: true,
  calcelText: '取消',
  desc: '确定',
  formModelConfig: {
    layout: 'horizontal',
    formItems: [
      {
        label: '规则名称',
        type: 'input',
        prop: 'name',
        otherOptions: {
          placeholder: '请输入规则名称'
        },
        attrs: {}
      },
      {
        label: '描述',
        type: 'textarea',
        prop: 'desc',
        otherOptions: {
          placeholder: '请输入描述'
        },
        attrs: {}
      },
      {
        label: '服务调用次数',
        type: 'input',
        prop: 'count',
        otherOptions: {},
        attrs: {}
      },
      {
        label: '上次调度时间',
        type: 'input',
        prop: 'lastSchedule',
        otherOptions: {},
        attrs: {}
      }
    ],
    rules: {
      name: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入规则名称'
        }
      ],
      desc: [
        {
          required: true,
          trigger: 'blur',
          message: '请对规则名称进行描述'
        }
      ],
      count: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入服务调用次数'
        }
      ],
      lastSchedule: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入上次调度时间'
        }
      ]
    }
  }
}
