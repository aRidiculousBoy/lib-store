<template>
  <div class="share-page">
    <a-card class="searcher">
      <a-form-model ref="searcher" :model="searcher" :layout="layout" v-bind="formItemLayout">
        <a-form-model-item label="分享名称" prop="name">
          <a-input v-model="searcher.name" placeholder="按分享名称查询" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-space>
            <a-button @click="handleReset">
              重置
            </a-button>
            <a-button type="primary" @click="getShareResource">
              查询
            </a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card class="content">
      <div slot="title" class="action">
        <span>全部文件</span>
        <a-button :disabled="!list.selectedRowKeys.length" @click="handleUnShare(list.selectedRowKeys)">取消分享</a-button>
      </div>

      <a-table :columns="list.columns" :data-source="list.data" rowKey="shareName" bordered :pagination="false"
        :row-selection="{ selectedRowKeys: list.selectedRowKeys, onChange: onSelectChange, getCheckboxProps: list.getCheckboxProps }"
        :loading="list.loading"
        >
        <span slot="originalName" slot-scope="name">{{ name | nameFilter }}</span>
        <span slot="createTime" slot-scope="createTime"> {{ createTime | dateFormat }}</span>
        <span slot="survivalTime" slot-scope="survivalTime">{{ survivalTime | timeLengthFormat}}</span>
        <span slot="valid" slot-scope="valid">
          <a-badge v-if="valid" status="success" text="未失效" />
          <a-badge v-else status="error" text="已失效" />
        </span>
        <a-space slot="action" slot-scope="record">
          <a v-copy="{ text: prefix + '/share-details/' + record.shareName, callback: copyCallback }">复制链接</a>
          <a-divider type="vertical" />
          <a-popconfirm ok-text="确定" cancel-text="取消" @confirm="handleUnShare(record)" okType="danger">
            <div slot="title">
              取消分享后，该条分享记录将被删除，
              好友将无法再访问此分享链接。
              您确认要取消分享吗？
            </div>
            <a>取消分享</a>
          </a-popconfirm>
        </a-space>
        <div slot="footer">共 {{ list.data.length }}条</div>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { copy } from '@/directives'

export default {
  name: 'share',
  data() {
    return {
      layout: 'inline',
      searcher: {
        name: '',
        type: 2
      },
      list: {
        loading: false,
        data: [],
        columns: [
          {
            dataIndex: 'originalName',
            key: 'originalName',
            title: '文件名称',
            scopedSlots: { customRender: 'originalName' }
          },
          {
            dataIndex: 'createTime',
            key: 'createTime',
            title: '创建日期',
            scopedSlots: { customRender: 'createTime' }
          },
          {
            title: '分享时长',
            dataIndex: 'survivalTime',
            key: 'survivalTime',
            scopedSlots: { customRender: 'survivalTime' }
          },
          {
            title: '是否有效',
            dataIndex: 'valid',
            key: 'valid',
            scopedSlots: { customRender: 'valid' }
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        selectedRowKeys: [],
        getCheckboxProps(record) {
          if (!record.valid) {
            return {
              props: {
                disabled: true
              }
            }
          }
          return record
        }
      },
      prefix: window.location.host
    }
  },
  created() {
    this.getShareResource()
  },
  filters: {
    nameFilter(value) {
      return value ? value : '-'
    },
    dateFormat(dateString) {
      return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss')
    },
    timeLengthFormat(minuteString) {
      // 根据分钟字符串 获取xx天xx小时
      const day = parseInt(minuteString) / 1440 + '天'
      return day
    }
  },
  methods: {
    getShareResource() {
      this.list.loading = true
      this.$store.dispatch('share/getShareResource', this.searcher).then((response) => {
        this.list.data = response
      }).catch(() => {

      }).finally(() => {
        this.list.loading = false
      })
    },
    onSelectChange(selectedRowKeys) {
      this.list.selectedRowKeys = selectedRowKeys
    },
    handleUnShare(records) {
      const isArray = Array.isArray(records)
      if (isArray) {
        const payload = {
          shareNames: records
        }
        this.$store.dispatch('share/unShareResourceBatch', payload).then(response => {
          this.$message.success('取消外链分享成功')
          this.getShareResource()
        })
      }
      else {
        const { shareName } = records
        const payload = {
          shareName
        }
        this.$store.dispatch('share/unShareResource', payload).then((response) => {
          this.$message.success('取消外链分享成功')
          this.getShareResource()
        })
      }
    },
    handleReset() {
      this.$refs.searcher?.resetFields()
      this.getShareResource()
    },
    copyCallback() {
      this.$message.success('复制成功，快将该资源分享给你的小伙伴吧')
    }
  },
  computed: {
    formItemLayout() {
      const layout = this.layout;
      return layout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
        : {};
    },
    buttonItemLayout() {
      const layout = this.layout;
      return layout === 'horizontal'
        ? {
          wrapperCol: { span: 14, offset: 4 },
        }
        : {};
    }
  },
  directives: {
    copy
  }
}
</script>

<style scoped lang="less">
.share-page {
  padding: 24px;
  height: 100%;
  background-color: rgb(240, 242, 245);
}

.searcher {
  padding: 8px 0;
}

.content {
  margin: 24px 0;
}

.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

