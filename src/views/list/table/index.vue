<template>
  <div class="query-table">
    <div class="coderwyh-pro-body">
      <a-card>
        <form-model v-bind="formModelConfig" :formData="formData" ref="formModelRef">
          <template slot="action">
            <a-space>
              <a-button @click="handleReset">重置</a-button>
              <a-button type="primary" @click="handleSearch">查询</a-button>
            </a-space>
          </template>
        </form-model>
      </a-card>
      <a-card style="margin-top: 32px" class="table-content">
        <div class="table-header">
          <div class="title">查询表格</div>
          <div class="action">
            <a-space>
              <div class="refresh" @click="handleRefresh">
                <a-tooltip>
                  <template slot="title"> 刷新 </template>
                  <a-icon type="sync" :style="{ fontSize: '16px' }"></a-icon>
                </a-tooltip>
              </div>
              <a-divider type="vertical"></a-divider>
              <a-space>
                <a-button icon="arrow-down" @click="handleExport">导出</a-button>
                <a-button type="primary" icon="plus" @click="handleAdd">添加</a-button>
              </a-space>
            </a-space>
          </div>
        </div>
        <a-alert
          :message="`已选择${rowSelection.selectedRowKeys.length}项 服务调用总计${total}万次`"
          type="info"
          show-icon
        ></a-alert>
        <h-table
          v-bind="tableConfig"
          :data="data"
          :loading="loading"
          @change="handleChange"
          :rowSelection="rowSelection"
        >
          <div slot="count" slot-scope="{ count }">
            {{ count + '万' }}
          </div>
          <div slot="status" slot-scope="{ status }">
            <a-badge dot :status="status | stateTypeFilter"> </a-badge
            ><span> {{ status | stateFilter }}</span>
          </div>
          <div slot="action" slot-scope="{ scope }">
            <a-space>
              <a @click="handleEditRecord(scope)">编辑</a>
              <a-divider type="vertical"></a-divider>
              <a-popconfirm
                title="确定删除当前记录嘛？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelete"
              >
                <a href="#">删除</a>
              </a-popconfirm>
            </a-space>
          </div>
        </h-table>
      </a-card>
      <h-modal
        :title="modalTitle"
        v-bind="modalConfig"
        ref="hModalRef"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      ></h-modal>
    </div>
  </div>
</template>

<script>
// 导入组件
import FormModel from '@components/formModel'
import HTable from '@components/hTable'
import HModal from '@components/hModal'

// 导入配置项
import formModelConfig from './config/formModel.config'
import tableConfig from './config/table.config'
import modalConfig from './config/modal.config'

export default {
  name: 'QueryTable',
  components: {
    FormModel,
    HTable,
    HModal
  },
  created() {
    this.getPageData()
  },
  data() {
    const formData = {
      ruleName: '',
      desc: ''
    }
    const modalFormData = {
      name: undefined,
      desc: undefined,
      count: undefined,
      lastSchedule: undefined
    }
    const isEdit = false
    modalConfig.formModelConfig.formData = modalFormData
    const count = 0
    const loading = false
    const data = []
    const rowSelection = {
      selectedRowKeys: [],
      onChange: this.onChange
    }
    const total = 0
    return {
      formModelConfig,
      tableConfig,
      modalConfig,
      formData,
      data,
      count,
      loading,
      rowSelection,
      modalFormData,
      total,
      isEdit
    }
  },
  methods: {
    getPageData() {
      this.loading = true
      setTimeout(() => {
        const ret = []
        for (let i = 0; i < 10; i++) {
          ret.push({
            key: this.count++,
            name: 'TreeCode' + this.count++,
            desc: '这是一段描述',
            count: Math.ceil(Math.random() * 1000),
            status: ['running', 'offline', 'online'][Math.floor(Math.random() * 3)],
            lastSchedule: '2022-10-28',
            index: i + 1
          })
        }
        this.data = ret
        this.loading = false
      }, 500)
    },
    handleChange() {
      this.getPageData()
    },
    handleSearch() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    handleReset() {
      this.$refs.formModelRef.reset()
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    onChange(selectedRowKeys) {
      this.rowSelection.selectedRowKeys = selectedRowKeys
      const total = this.data
        .filter((item) => selectedRowKeys.includes(item.key))
        .map((item) => item.count)
        .reduce((prev, curr) => prev + curr, 0)
      this.total = total
    },
    handleExport() {
      let str = ``
      const title = this.tableConfig.columns.map((item) => item.title)
      for (let i of title) {
        str += i + ','
      }
      str += '\n'

      for (let item of this.data) {
        for (const key in item) {
          str += `${item[key] + '\t'},`
        }
        str += '\n'
      }
      const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
      const link = document.createElement('a')
      link.href = uri
      link.download = '表格数据' + '.csv'
      link.click()
    },
    handleRefresh() {
      this.handleSearch()
    },
    handleEditRecord(record) {
      this.isEdit = true
      this.modalConfig.formModelConfig.formData = record
      this.$refs.hModalRef.showModal()
    },
    handleAdd() {
      this.isEdit = false
      this.modalConfig.formModelConfig.formData = {}
      this.$refs.hModalRef.showModal()
    },
    handleCancel() {
      this.$refs.hModalRef.closeModal()
    },
    async handleConfirm() {
      const isValid = await this.$refs.hModalRef.validate()
      if (isValid) {
        this.$refs.hModalRef.closeModal()
        this.$message.success('保存成功')
        this.getPageData()
        return
      }
    },
    handleDelete() {
      this.$message.loading({ content: '正在删除中...请稍后', key: 1 })
      setTimeout(() => {
        this.$message.success({ content: '删除成功', key: 1, duration: 2 })
        this.getPageData()
      }, 1000)
    }
  },
  computed: {
    modalTitle() {
      return this.isEdit ? '编辑规则' : '添加规则'
    }
  },
  filters: {
    stateFilter(state) {
      let res
      switch (state) {
        case 'offline':
          res = '关闭'
          break
        case 'online':
          res = '已上线'
          break
        case 'running':
          res = '运行中'
      }
      return res
    },
    stateTypeFilter(state) {
      let type
      switch (state) {
        case 'offline':
          type = 'error'
          break
        case 'online':
          type = 'success'
          break
        case 'running':
          type = 'processing'
      }
      return type
    }
  }
}
</script>

<style scoped lang="less">
.table-content {
  .refresh:hover {
    cursor: pointer;
  }
  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 28px 0;
    .title {
      font-size: 16px;
      line-height: 16px;
    }
  }
  /deep/.ant-card-body {
    padding: 20px !important;
    padding-top: 8px !important;
  }
}
</style>
