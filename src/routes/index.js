// 导入组件
const Layout = () => import('@/layout/index.vue')
const Workspace = () => import('@views/dashboard/workspace')
const Analysis = () => import('@views/dashboard/analysis')

// 登录组件
const Login = () => import('@/views/login')

// 异常页组件
const UnAuthorization = () => import('@views/exception/403')
const NotFound = () => import('@/views/exception/404')
const ServerError = () => import('@views/exception/500')
const CommingSoon = () => import('@/views/exception/commingsoon')

// 个人页面组件
const Center = () => import('@views/profile/center')
const Settings = () => import('@views/profile/settings')

// 列表页组件
const QueryTable = () => import('@views/list/table')
const CardList = () => import('@views/list/card-list')
const BasicList = () => import('@views/list/basic-list')

// 表单页组件
const StandardForm = () => import('@views/form/standard-form')
const StepForm = () => import('@views/form/step-form')

// 用于测试的组件
const Jser = () => import('@views/test/jser')

// 权限测试组件
const AdminOnly = () => import('@views/permission/admin-only')
const OpOnly = () => import('@views/permission/op-only')
const AdminAndOp = () => import('@views/permission/admin-and-op')
const All = () => import('@views/permission/all')


// 空布局组件 主要用于给二级路由占位
const RouteView = {
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    name: 'List',
    path: '/list',
    component: Layout,
    redirect: '/list/table',
    meta: {
      title: '列表页',
      hasSubMenu: true,
      icon: 'windows'
    },
    children: [
      {
        name: 'BasicList',
        path: '/list/basic',
        component: BasicList,
        meta: {
          title: '标准列表',
          hasSubMenu: false,
          icon: 'code-sandbox'
        }
      },
      {
        name: 'QueryTable',
        path: '/list/table',
        component: QueryTable,
        meta: {
          title: '查询表格',
          hasSubMenu: false,
          icon: 'ordered-list'
        }
      },
      {
        name: 'CardList',
        path: '/list/card',
        component: CardList,
        meta: {
          title: '卡片列表',
          hasSubMenu: false,
          icon: 'appstore'
        }
      }
    ]
  },
  {
    name: 'Form',
    path: '/form',
    redirect: '/form/standard',
    component: Layout,
    meta: {
      title: '表单页',
      hasSubMenu: true,
      icon: 'fire'
    },
    children: [
      {
        name: 'StandardForm',
        path: '/form/standard',
        component: StandardForm,
        meta: {
          title: '基础表单',
          icon: 'form'
        }
      },
      {
        name: 'StepForm',
        path: '/form/step',
        component: StepForm,
        meta: {
          title: '分步表单',
          icon: 'build'
        }
      },
    ]
  },
  {
    name: 'Exception',
    path: '/exception',
    component: Layout,
    redirect: '/exception/403',
    meta: {
      title: '异常页',
      icon: 'warning',
      hasSubMenu: true
    },
    children: [
      {
        name: '403',
        path: '/exception/403',
        component: UnAuthorization,
        meta: {
          title: '403',
          icon: 'lock',
          hasSubMenu: false
        }
      },
      {
        name: '404',
        path: '/exception/404',
        component: NotFound,
        meta: {
          title: '404',
          icon: 'question-circle',
          hasSubMenu: false
        }
      },
      {
        name: '500',
        path: '/exception/500',
        component: ServerError,
        meta: {
          title: '500',
          icon: 'close-circle',
          hasSubMenu: false
        }
      },
      {
        name: 'CommingSoon',
        path: '/exception/comming',
        component: CommingSoon,
        meta: {
          title: '敬请期待',
          icon: 'close-circle',
          hasSubMenu: false
        }
      }
    ]
  },
  {
    name: 'Profile',
    path: '/profile',
    redirect: '/profile/center',
    component: Layout,
    meta: {
      title: '个人页面',
      icon: 'user',
      hasSubMenu: true
    },
    children: [
      {
        name: 'UserCenter',
        path: '/profile/center',
        component: Center,
        meta: {
          title: '个人中心',
          icon: 'fire',
          hasSubMenu: false
        }
      },
      {
        name: 'UserSettings',
        path: '/profile/settings',
        component: Settings,
        meta: {
          title: '个人设置',
          icon: 'setting',
          hasSubMenu: false
        }
      }
    ]
  },
  {
    name: 'Test',
    path: '/test',
    component: Layout,
    redirect: '/tester',
    meta: {
      title: 'Jser',
      hasSubMenu: false,
      icon: 'dashboard'
    },
    children: [
      {
        path: '/tester',
        component: Jser
      }
    ]
  },
  // 权限测试
  {
    name: 'Permission',
    path: '/permission',
    component: Layout,
    redirect: '/tester',
    meta: {
      title: '权限测试',
      hasSubMenu: true,
      icon: 'filter'
    },
    children: [
      {
        name: 'AdminOnly',
        path: '/permission/admin-only',
        component: AdminOnly,
        meta: {
          title: '管理员专享',
          hasSubMenu: false,
          icon: 'user',
          roles: ['admin']
        }
      },
      {
        name: 'OpOnly',
        path: '/permission/op-only',
        component: OpOnly,
        meta: {
          title: '运营人员专享',
          hasSubMenu: false,
          icon: 'build',
          roles: ['op']
        }
      },
      {
        name: 'AdminAndOp',
        path: '/permission/admin-op',
        component: AdminAndOp,
        meta: {
          title: '管理和运营共享',
          hasSubMenu: false,
          icon: 'share-alt',
          roles: ['admin', 'op']
        }
      },
      {
        name: 'All',
        path: '/permission/all',
        component: All,
        meta: {
          title: '所有人共享',
          hasSubMenu: false,
          icon: 'global'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/exception/404'
  }
]
export const constantRouterMap = [
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/dashboard/workspace',
    component: Layout,
    meta: {
      title: '仪表盘',
      hasSubMenu: true,
      icon: 'dashboard'
    },
    children: [
      {
        name: 'Workspace',
        path: '/dashboard/workspace',
        component: Workspace,
        meta: {
          title: '工作台',
          icon: 'smile',
          hasSubMenu: false
        }
      },
      {
        name: 'Analysis',
        path: '/dashboard/analysis',
        component: Analysis,
        meta: {
          title: '分析页',
          icon: 'pie-chart',
          hasSubMenu: false
        }
      }
    ]
  },
  ...asyncRouterMap
]



export default constantRouterMap
