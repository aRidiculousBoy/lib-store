export default {
  columns: [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 72,
      align: 'center'
    }
    ,
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
      width: 144
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc'
    },
    ,
    {
      title: '服务调用次数',
      dataIndex: 'count',
      key: 'count',
      slot: 'count',
      width: 196
    },
    ,
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      slot: 'status',
      width: 128
    },
    {
      title: '上次调度时间',
      dataIndex: 'lastSchedule',
      key: 'lastSchedule',
      width: 176
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      slot: 'action',
      fixed: 'right',
      width: 144
    }
  ],
  pagination: {
    total: 200
  },
  options: {
    bordered: true
  }
}
