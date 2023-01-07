<template>
  <div class="jser">
    <div class="coderwyh-pro-body">
      <a-card>
      <form-model v-bind="formModelConfig" :formData="formData" ref="formModelRef"></form-model>
      <a-button @click="handleSubmit">提交</a-button>
    </a-card>
    <a-divider></a-divider>
    <a-card>
      <h-table
        :columns="columns"
        :data="data"
        @change="handleChange"
        :loading="loading"
        :pagination="{ total: 200 }"
        :rowSelection="rowSelection"
      ></h-table>
    </a-card>
    </div>
  </div>
</template>

<script>
import formModelConfig from './config/formModel.config'
import formModel from '@components/formModel'
import HTable from '@components/hTable'

export default {
  name: 'Jser',
  components: {
    formModel,
    HTable
  },
  created() {
    this.getPageData()
  },
  data() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        slot: 'name'
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 80
      },
      {
        title: 'Address',
        dataIndex: 'address',
        ellipsis: true
      }
    ]
    const count = 0
    const data = []
    const loading = false
    const formData = {
      name: '郭靖',
      motto: '降龙十八掌',
      birthday: undefined,
      like: 'football'
    }
    const rowSelection = {
      selectedRowKeys: [],
      onChange: function (selectedRowKeys) {
        console.log(selectedRowKeys)
      }
    }
    return {
      formModelConfig,
      formData,
      columns,
      data,
      loading,
      count,
      rowSelection
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.formModelRef.validate()
      if (!isValid) {
        console.log(this.$message.error('校验失败！请填入正确的内容'))
      }
    },
    handleChange(pagination) {
      this.getPageData()
    },
    getPageData() {
      this.loading = true
      setTimeout(() => {
        const ret = []
        for (let i = 0; i < 10; i++) {
          ret.push({
            key: this.count++,
            name: 'Jack',
            age: this.count,
            address: `New York No. 1 Lake Park, New York No. ${this.count} Lake Park`
          })
        }
        this.data = ret
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>
