<template>
  <div class="basic-list">
    <div class="overview">
      <a-card>
        <a-row :gutter="16">
          <a-col :span="8">
            <div class="task">
              <div class="task-status">进行中的任务</div>
              <div class="task-count">
                <span class="running-count">10</span>
                <span>个任务</span>
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="task">
              <div class="task-status">剩余任务</div>
              <div class="task-count">
                <span class="remanent-count">10</span>
                <span>个任务</span>
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="task">
              <div class="task-status">任务总耗时</div>
              <div class="task-count">
                <span class="task-consume-time">120</span>
                <span>小时</span>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="list">
      <a-card title="标准列表" :loading="loading">
        <div slot="extra">
          <a-space>
            <a-radio-group :value="modelButton" @change="handleValueChange">
              <a-radio-button value="all">
                全部
              </a-radio-button>
              <a-radio-button value="running">
                进行中
              </a-radio-button>
              <a-radio-button value="finished">
                已完成
              </a-radio-button>
            </a-radio-group>
            <a-input-search style="width:272px" enter-button @search="handleSearch"></a-input-search>
            <a-button type="primary" icon="plus" @click="handleAddClick">
              添加
            </a-button>
          </a-space>
        </div>
        <task v-for="task in tasks" :key="task.name" v-bind="task" class="list-task-item" @edit="handleEdit"></task>
        <div class="footer">
          <div class="record-count">共{{ serverSideTasks.length }}条</div>
          <a-pagination v-model="current" :total="serverSideTasks.length" show-less-items show-size-changer
            :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="handleCurrentChange" />
        </div>
      </a-card>
    </div>
    <task-viewer v-bind="modal" ref="taskViewerRef"></task-viewer>
  </div>
</template>

<script>
import Task from './components/task'
import TaskViewer from './components/task-viewer'

import vueSvg from '@/assets/web/vue.svg'
import reactSvg from '@/assets/web/react.svg'
import reduxSvg from '@/assets/web/redux.svg'

import angularSvg from '@/assets/web/angular.svg'
import svelteSvg from '@/assets/web/svelte-logo-horizontal.svg'

import antDesignSvg from '@/assets/web/antdesign.svg'
import elementSvg from '@/assets/web/element.svg'
import nodeSvg from '@/assets/web/node.svg'
import tsSvg from '@/assets/web/typescript.svg'
import vantPng from '@/assets/web/vant.png'

import koaSvg from '@/assets/web/koa.svg'



import eslintSvg from '@/assets/web/eslint.svg'
import lodashSvg from '@/assets/web/lodash.svg'

import viteSvg from '@/assets/web/logo.svg'
import echartsPng from '@/assets/web/echarts.png'


const webMap = {
  'Vue3': vueSvg,
  'React': reactSvg,
  'Angular': angularSvg,
  'Svelte': svelteSvg,
  'Ant-Design': antDesignSvg,
  'ElementUI': elementSvg,
  'Eslint': eslintSvg,
  'NodeJs': nodeSvg,
  'TypeScript': tsSvg,
  'Vant': vantPng,
  'Redux': reduxSvg,
  'Vuex': vueSvg,
  'Koa': koaSvg,
  'Lodash': lodashSvg,
  'Vite': viteSvg,
  'Echarts': echartsPng
}




export default {
  name: 'basic-list',
  components: {
    Task,
    TaskViewer
  },
  data() {
    const responseUsers = [
      '张三丰',
      '曾小贤',
      '欧阳锋',
      '王重阳'
    ]

    const serverSideTasks = [
      {
        name: 'Vue3',
        desc: '渐进式 JavaScript 框架',
      },
      {
        name: 'Angular',
        desc: '应用程序设计框架和开发平台，用于创建高效且复杂的单页应用程序',
      },
      {
        name: 'React',
        desc: '构建用户界面的 JavaScript 库',
      },
      {
        name: 'Redux',
        desc: 'JavaScript 状态容器，提供可预测化的状态管理',
      },
      {
        name: 'Svelte',
        desc: '将声明性组件转换为精准高效更新 DOM 的 JavaScript 代码。',
      },
      {
        name: 'Vuex',
        desc: 'vuex 是 Vue 官方提供的状态管理工具',
      },
      {
        name: 'NodeJs',
        desc: '基于 V8 引擎的 JavaScript 运行环境',
      },
      {
        name: 'Koa',
        desc: '新一代的 Web 后台框架',
      },
      {
        name: 'TypeScript',
        desc: 'JavaScript 超集',
      },
      {
        name: 'Ant-Design',
        desc: '企业级的 UI 设计语言和 React 实现',
      },
      {
        name: 'ElementUI',
        desc: '基于 Vue 的组件库',
      },
      {
        name: 'Vant',
        desc: '移动端 Vue 组件库',
      },
      {
        name: 'Lodash',
        desc: '一个现代的 JavaScript 工具库',
      },
      {
        name: 'Eslint',
        desc: '可组装的、用于 JavaScript 和 JSX 的代码检查工具',
      },
      {
        name: 'Vite',
        desc: '下一代前端开发与构建工具',
      },
      {
        name: 'Echarts',
        desc: '使用 JavaScript 实现的开源可视化库',
      }
    ].map(task => {
      task.cover = webMap[task.name]
      task.startTime = '2019-12-31'
      task.progress = Math.ceil(Math.random() * 100)
      task.responseUser = responseUsers[Math.ceil(Math.random() * (responseUsers.length - 1))]
      return task
    })
    const tasks = serverSideTasks.slice(0, 10)
    const modelButton = 'all'

    // 分页数据
    const current = 1
    const pageSize = 10

    const loading = false


    const modal = {
      mode: 'add',
      callback: undefined
    }
    return {
      serverSideTasks,
      tasks,
      modelButton,
      current,
      pageSize,
      loading,
      modal
    }
  },
  methods: {
    handleValueChange(e) {
      this.modelButton = e.target.value
    },
    handleCurrentChange(page, size) {
      this.loading = true
      this.pageSize = size
      setTimeout(() => {
        this.tasks = this.serverSideTasks.slice((page - 1) * this.pageSize, page * this.pageSize)
        this.loading = false
      }, 500)
    },
    onShowSizeChange(page, size) {
      this.loading = true
      this.pageSize = size
      setTimeout(() => {
        this.tasks = this.serverSideTasks.slice((page - 1) * this.pageSize, page * this.pageSize)
        this.loading = false
      }, 500)
    },
    handleSearch() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    handleAddClick() {
      this.modal.mode = 'add'
      this.$refs.taskViewerRef?.open()
      this.modal.callback = () => {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 500)
      }
    },
    handleEdit(task) {
      this.modal.mode = 'edit'
      this.$refs.taskViewerRef?.open(task) 
    }
  }
}
</script>

<style scoped lang="less">
.basic-list {
  padding: 24px;
}

.task {
  text-align: center;
  display: flex;
  flex-direction: column;

  .task-count {
    font-size: 24px;
    margin: 8px 0;
  }
}

.running-count {
  padding: 4px;
  color: #2D8CF0;
}

.remanent-count {
  padding: 4px;
  color: #FAAD14;
}

.task-consume-time {
  padding: 4px;
  color: #ED5565;
}

.list {
  margin-top: 24px;
}

.list-task-item {
  border-bottom: 1px solid #e9e9e9;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
}
</style>
