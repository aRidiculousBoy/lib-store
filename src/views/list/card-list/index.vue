<template>
  <div class="card-list">
    <a-spin tip="Loading..." :spinning="loading">
      <div class="spin-content">
        <a-row :gutter="[16, 32]" v-for="row in rowLength" :key="row">
          <a-col class="gutter-row" :span="6" v-for="item in (webList.slice((row - 1) * 4, 4 * row))">
            <div class="gutter-box">
              <web-card v-bind="item" :key="item.name"></web-card>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-spin>
  </div>
</template>

<script>
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


import WebCard from './components/web-card'

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
  name: 'card-list',
  data() {
    const webList = []
    const loading = false
    return {
      webList,
      loading
    }
  },
  components: {
    WebCard
  },
  methods: {
    // 模拟获取异步数据 
    getPageData() {
      this.loading = true
      setTimeout(() => {
        let webList = [
          {
            name: 'Vue3',
            description: '渐进式 JavaScript 框架',
            avatarSize: 64
          },
          {
            name: 'Vuex',
            description: 'vuex 是 Vue 官方提供的状态管理工具',
            avatarSize: 64
          },
          {
            name: 'Angular',
            description: '应用程序设计框架和开发平台，用于创建高效且复杂的单页应用程序',
            avatarSize: 64
          },
          {
            name: 'React',
            description: '构建用户界面的 JavaScript 库',
            avatarSize: 64
          },
          {
            name: 'Redux',
            description: 'JavaScript 状态容器，提供可预测化的状态管理',
            avatarSize: 64
          },
          {
            name: 'Svelte',
            description: '将声明性组件转换为精准高效更新 DOM 的 JavaScript 代码。',
            avatarSize: 64
          },
          {
            name: 'NodeJs',
            description: '基于 V8 引擎的 JavaScript 运行环境',
            avatarSize: 64
          },
          {
            name: 'Koa',
            description: '新一代的 Web 后台框架',
            avatarSize: 64
          },
          {
            name: 'TypeScript',
            description: 'JavaScript 超集',
            avatarSize: 64
          },
          {
            name: 'Ant-Design',
            description: '企业级的 UI 设计语言和 React 实现',
            avatarSize: 64
          },
          {
            name: 'ElementUI',
            description: '基于 Vue 的组件库',
            avatarSize: 64
          },
          {
            name: 'Vant',
            description: '移动端 Vue 组件库',
            avatarSize: 64
          },
          {
            name: 'Lodash',
            description: '一个现代的 JavaScript 工具库',
            avatarSize: 64
          },
          {
            name: 'Eslint',
            description: '可组装的、用于 JavaScript 和 JSX 的代码检查工具',
            avatarSize: 64
          },
          {
            name: 'Vite',
            description: '下一代前端开发与构建工具',
            avatarSize: 64
          },
          {
            name: 'Echarts',
            description: '使用 JavaScript 实现的开源可视化库',
            avatarSize: 64
          }
        ]
        webList = webList.map(web => {
          web.source = webMap[web.name]
          return web
        })
        this.webList = webList
        this.loading = false
      }, 500)
    }
  },
  created() {
    this.getPageData()
  },
  computed: {
    rowLength() {
      return Math.ceil(this.webList.length / 4)
    }
  }
}
</script>

<style scoped lang="less">
.card-list {
  height: 100%;
  padding: 24px;
}



</style>
