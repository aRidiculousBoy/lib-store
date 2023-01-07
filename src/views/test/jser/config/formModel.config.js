export default {
  layout: 'horizontal',
  formItems: [
    {
      label: '姓名',
      type: 'input',
      prop: 'name',
      otherOptions: {},
      attrs: {}
    },
    {
      label: '座右铭',
      type: 'textarea',
      prop: 'motto',
      otherOptions: {},
      attrs: {}
    },
    {
      label: '出生日期',
      type: 'datepicker',
      prop: 'birthday',
      otherOptions: {},
      attrs: {}
    },
    {
      label: '球类运动',
      type: 'select',
      prop: 'like',
      options: [
        {
          label: '篮球',
          value: 'basketball'
        },
        {
          label: '足球',
          value: 'football'
        },
        {
          label: '羽毛球',
          value: 'yumaoqiu'
        }
      ],
      otherOptions: {},
      attrs: {}
    }
  ],
  rules: {
    name: [
      {
        required: true,
        trigger: 'blur'
      }
    ],
    motto: [
      {
        required: true,
        trigger: 'blur'
      }
    ],
    like: [
      {
        required: true,
        trigger: 'change'
      }
    ]
  }
}
