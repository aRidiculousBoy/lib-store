<template>
  <div class="co-share">
    <fullscreen v-model="fullscreen" class="fullscreen-usage">
      <a-card :tab-list="tabList" :active-tab-key="activeKey" @tabChange="onTabChange">
        <div v-if="activeKey === 'own-share' || activeKey === 'subscribe'"
          style="margin-bottom: 16px;text-align: right;">
          <a-space size="middle">
            <a-space size="middle">
              <a-tooltip>
                <span slot="title">刷新</span>
                <a-icon type="reload" @click="handleRefresh" class="hover" />
              </a-tooltip>
              <a-tooltip>
                <span slot="title" v-if="!fullscreen">全屏</span>
                <a-icon type="scan" @click="fullscreen = !fullscreen" class="hover" />
              </a-tooltip>
            </a-space>
            <a-divider type="vertical" />
            <a-button icon="delete" type="primary" :disabled="!list.selectedRowKeys.length">取消共享</a-button></a-space>
        </div>
        <a-table :columns="list.columns" :data-source="list.data" rowKey="id" bordered :loading="list.loading"
          :row-selection="{ selectedRowKeys: list.selectedRowKeys, onChange: onSelectChange, getCheckboxProps: list.getCheckboxProps }">
          <span slot="name" slot-scope="name">{{ name || '-'}}</span>
          <span slot="type" slot-scope="scope">{{ scope | typeFilter}}</span>
          <span slot="intro" slot-scope="intro">{{ intro || '-' }}</span>
          <div class="action" slot="action" slot-scope="text,record">
            <a-space v-if="activeKey === 'own-share'">
              <a>详情</a>
              <a-divider type="vertical" />
              <a-popconfirm ok-text="确定" cancel-text="取消" @confirm="handleUnCoShare(record)" okType="danger">
                <div slot="title">
                  取消共享后，该条共享将失效。您确认要取消共享吗？
                </div>
                <a>取消共享</a>
              </a-popconfirm>
            </a-space>
            <a-space v-if="activeKey === 'subscribe'">
              <a :class="{ disabled: !record.userId }" @click="handleTransfer(record)">转存</a>
              <a-divider type="vertical" />
              <a @click="handleUnSubscribe(record)" :class="{ disabled: !record.userId }">取消关注</a>
            </a-space>
            <a-space v-else-if="activeKey === 'co-share'">
              <a @click="handleTransfer(record)">转存</a>
              <a-divider type="vertical" />
              <a @click="handleSubscribe(record)">关注</a>
            </a-space>
          </div>
        </a-table>
      </a-card>
    </fullscreen>
    <file-transferer ref="fileTransfererRef" />
  </div>
</template>
<script>
import FileTransferer from './components/file-transferer'
import Fullscreen from '@/components/Fullscreen'

import { uuid } from '@/utils/utils'

const map = {
  'own-share': 'getPublicResource',
  'co-share': 'getPublicShare',
  'subscribe': 'getSubscribe'
}

export default {
  name: 'co-share',
  components: { FileTransferer, Fullscreen },
  data() {
    return {
      tabList: [
        {
          key: 'own-share',
          tab: '我的共享'
        },
        {
          key: 'subscribe',
          tab: '我的关注'
        },
        {
          key: 'co-share',
          tab: '共享大厅',
        }
      ],
      list: {
        columns: [
          {
            title: '共享名称',
            dataIndex: 'name',
            scopedSlots: { customRender: 'name' },
            width: 480
          },
          {
            title: '共享描述',
            dataIndex: 'intro',
            scopedSlots: { customRender: 'intro' }
          },
          {
            title: '共享类型',
            dataIndex: 'type',
            scopedSlots: { customRender: 'type' },
            width: 256
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            width: 256
          }
        ],
        data: [],
        selectedRowKeys: [],
        loading: false,
        getCheckboxProps(record) {
          if (!record.userId) {
            return {
              props: {
                disabled: true
              }
            }
          }
          return record
        }
      },
      activeKey: 'own-share',
      fullscreen: false
    }
  },
  methods: {
    getPublicResource() {
      this.list.loading = true
      this.$store.dispatch('file/getOwnPublic').then(response => {
        this.list.data = response
      }).finally(() => {
        this.list.loading = false
      })
    },
    getPublicShare() {
      this.list.loading = true
      const payload = {
        pageSize: 10,
        pageNum: 1,
        name: undefined
      }
      this.$store.dispatch('file/getPublicShare', payload).then(response => {
        this.list.data = response
      }).finally(() => {
        this.list.loading = false
      })
    },
    getSubscribe() {
      this.list.loading = true
      this.$store.dispatch('file/getSubscribe').then(response => {
        this.list.data = response.map(record => {
          if (!record.id) {
            record.id = uuid()
          }
          return record
        })
      }).finally(() => {
        this.list.loading = false
      })
    },
    onSelectChange(selectedRowKeys) {
      this.list.selectedRowKeys = selectedRowKeys
    },
    onTabChange(key) {
      this.activeKey = key
    },
    handleSubscribe(record) {
      const key = 'subscribe'
      const { id } = record
      const payload = {
        id
      }

      this.$message.loading({ content: '关注中...', key });
      this.$store.dispatch('file/subscribe', payload).then(response => {
        this.$message.success({ content: '关注成功!', key, duration: 2 });
      })
    },
    handleUnSubscribe(record) {
      const key = 'unsubscribe'
      const { id, userId } = record
      if (!userId) {
        return false
      }
      const payload = {
        id
      }

      this.$message.loading({ content: '取关中...', key });
      this.$store.dispatch('file/unSubscribe', payload).then(response => {
        this.$message.success({ content: '取关成功!', key, duration: 2 });
        this.getSubscribe()
      })
    },
    handleTransfer(record) {
      const { userId } = record
      if (!userId) {
        return false
      }
      this.$refs.fileTransfererRef?.open(record)
    },
    handleUnCoShare(record) {
      const key = 'un-coshare'
      const { id } = record
      const payload = {
        id
      }

      this.$message.loading({ content: '取消共享中...', key });
      this.$store.dispatch('file/unCoShare', payload).then(response => {
        this.$message.success({ content: '取消成功!', key, duration: 2 });
        this.getPublicResource()
      })
    },
    handleRefresh() {
      const activeKey = this.activeKey
      const executor = this[map[activeKey]]
      executor()
    }
  },
  filters: {
    typeFilter(value) {
      return value == 0 ? '文件夹' : '文件'
    }
  },
  watch: {
    activeKey: {
      handler(value, oldValue) {
        const executor = this[map[value]]
        executor && executor()
      },
      immediate: true
    }
  }
}

</script>

<style scoped lang="less">
.co-share {
  padding: 24px;
  height: 100%;
  background-color: rgb(240, 242, 245);
}

.fullscreen-usage {
  background-color: rgb(240, 242, 245);
}

.disabled {
  opacity: 0.48;
  color: rgb(96, 98, 102);
  cursor: not-allowed;
}

.hover {
  font-size: 20px;

  &:hover {
    color: skyblue;
  }
}
</style>