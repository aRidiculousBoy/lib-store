<template>
  <div class="page-center">
    <div class="coderwyh-pro-body">
      <div class="user-card">
        <a-card :bordered="false" style="width: 360px">
          <a-result title="a Ridiculous Boy" sub-title="我曾难自拔于世界之大，也沉迷于其中梦话">
            <template #icon>
              <a-avatar :size="128" :src="kenanAvatar" />
            </template>
          </a-result>
          <a-divider />
          <div class="professional-info">
            <div>
              <a-space>
                <a-icon type="profile" :style="{ fontSize: '14px' }" />
                <span>前端开发实习生</span></a-space
              >
            </div>
            <div>
              <a-space>
                <a-icon type="compass" :style="{ fontSize: '14x' }" />
                <span>电魂网络-发行线-技术运营中心-运营开发部-前端开发组</span></a-space
              >
            </div>
            <div>
              <a-space>
                <a-icon type="environment" :style="{ fontSize: '14px' }" />
                <span>浙江省杭州市</span></a-space
              >
            </div>
          </div>
          <a-divider />
          <div class="skill-info">
            <a-tag v-for="item in technicalAbilities" style="margin: 4px" :key="item">{{
              item
            }}</a-tag>
            <a-button size="small">+</a-button>
          </div>
          <a-divider />
          <div class="team-work">
            <div class="team-work-item" v-for="team in teams">
              <a-space>
                <a-avatar :size="32" :src="team.logo"></a-avatar>
                <span>{{ team.title }}</span>
              </a-space>
            </div>
          </div>
        </a-card>
      </div>
      <div class="light-card">
        <a-card
          :bordered="false"
          :tab-list="tabList"
          :active-tab-key="currentTab"
          @tabChange="handleTabChange"
        >
          <a-spin tip="加载中" :spinning="spinning">
            <div v-if="currentTab === 'article'">
              <template v-for="article in articles">
                <article-item v-bind="article"></article-item>
              </template>
            </div>
            <div v-if="currentTab === 'project'">
              <a-space size="middle"
                ><template v-for="project in projects">
                  <project-item v-bind="project"></project-item> </template
              ></a-space>
            </div>
          </a-spin>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from './components/articleItem'
import ProjectItem from './components/projectItem'

import kenanAvatar from '@/assets/images/kenan.jpg'

import lodashCover from '@/assets/images/lodash.png'
import webpackCover from '@/assets/images/webpack.png'
import gitCover from '@/assets/images/git.png'

export default {
  name: 'Center',
  components: {
    ArticleItem,
    ProjectItem
  },
  data() {
    const devDepartment = '运营开发部'
    const devLogo = 'https://vui-design.github.io/vui-design-pro/images/apps/bootstrap.png'


    // 团队
    const teams = [
      {
        title: devDepartment,
        logo: devLogo
      }
    ]
    // 技能树
    const technicalAbilities = ['JavaScript', 'Vuejs', 'Webpack', 'Http', 'Git', 'Coderwyh Pro']
    const tabList = [
      {
        key: 'article',
        tab: '文章'
      },
      {
        key: 'project',
        tab: '项目'
      }
    ]
    const currentTab = tabList[0].key

    // 文章
    const articles = []

    // 项目
    const projects = []

    // 控制spin的状态
    const spinning = true
    return {
      kenanAvatar,
      technicalAbilities,
      teams,
      tabList,
      currentTab,
      articles,
      projects,
      spinning
    }
  },
  methods: {
    handleTabChange(key) {
      this.currentTab = key
      this.spinning = true
      if (key === 'article') {
        this.getArticles()
      } else if (key === 'project') {
        this.getProjects()
      }
    },
    getArticles() {
      this.articles = []
      setTimeout(() => {
        this.articles = [
          {
            title: 'Node.js',
            descTags: ['nodejs', 'v8', 'libuv', 'chrome', 'asynchronize io'],
            description:
              '如果你是一个前端程序员，你不懂得像 PHP、Python 或 Ruby 等动态编程语言，然后你想创建自己的服务，那么 Node.js 是一个非常好的选择。Node.js 是运行在服务端的 JavaScript，如果你熟悉 Javascript，那么你将会很容易的学会 Node.js。当然，如果你是后端程序员，想部署一些高性能的服务，那么学习 Node.js 也是一个非常好的选择！',
            author: '洪七公',
            url: 'https://github.com/nodejs',
            publishDate: '2020-08-08 16:40',
            star: 100,
            like: 666,
            comment: 888,
            cover: 'https://vui-design.github.io/vui-design-pro/images/apps/nodejs.png'
          },
          {
            title: 'Webpack',
            descTags: ['webpack', '构建工具', '工程化', '现代打包工具'],
            description:
              '本质上，Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。当 Webpack 处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 Bundle。',
            author: '欧阳锋',
            url: 'https://github.com/webpack',
            publishDate: '2020-08-08 16:40',
            star: 100,
            like: 666,
            comment: 888,
            cover: 'https://vui-design.github.io/vui-design-pro/images/apps/webpack.png'
          }
        ]
        this.spinning = false
      }, 500)
    },
    getProjects() {
      this.projects = []
      setTimeout(() => {
        this.projects = [
          {
            title: 'Lodash',
            coverSource: lodashCover,
            description: 'Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。',
            avatarSource: lodashCover
          },
          {
            title: 'Webpack',
            coverSource: webpackCover,
            description:
              '本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。',
            avatarSource: webpackCover
          },
          {
            title: 'Git',
            coverSource: gitCover,
            description:
              'git是一个分布式版本控制软件，最初由林纳斯·托瓦兹创作，于2005年以GPL许可协议发布。',
            avatarSource: gitCover
          }
        ]
        this.spinning = false
      }, 500)
    }
  },
  created() {
    this.getArticles()
  }
}
</script>

<style scoped lang="less">
.coderwyh-pro-body {
  display: flex;
}
.ant-result {
  padding: 12px;
}

.professional-info div {
  padding: 2px 0 2px 0;
}

.team-work {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.team-work-item {
  width: 44%;
  margin: 10px 0 10px 0;
}

.user-card {
  padding: 0 12px;
}
.light-card {
  width: 100%;
  padding: 0 16px;
}
</style>
