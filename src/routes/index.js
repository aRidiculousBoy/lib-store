// 导入组件
const Layout = () => import('@/layout/index.vue')
const Workspace = () => import('@views/dashboard/workspace')
const Analysis = () => import('@views/dashboard/analysis')

// 登录组件
const Login = () => import('@/views/login')

const ShareDetails = () => import('@views/share-details')

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


// 应用内组件
const FileList = () => import('@views/file-list')
const Album = () => import('@views/album')
const Favor = () => import('@views/favor')
const Share = () => import('@views/share')
const Bin = () => import('@views/bin')
const CoShare = () => import('@views/co-share')




// 空布局组件 主要用于给二级路由占位
const RouteView = {
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  // 权限测试
  // {
  //   name: 'Permission',
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/tester',
  //   meta: {
  //     title: '权限测试',
  //     hasSubMenu: true,
  //     icon: 'filter'
  //   },
  //   children: [
  //     {
  //       name: 'AdminOnly',
  //       path: '/permission/admin-only',
  //       component: AdminOnly,
  //       meta: {
  //         title: '管理员专享',
  //         hasSubMenu: false,
  //         icon: 'user',
  //         roles: ['admin']
  //       }
  //     },
  //     {
  //       name: 'OpOnly',
  //       path: '/permission/op-only',
  //       component: OpOnly,
  //       meta: {
  //         title: '运营人员专享',
  //         hasSubMenu: false,
  //         icon: 'build',
  //         roles: ['op']
  //       }
  //     },
  //     {
  //       name: 'AdminAndOp',
  //       path: '/permission/admin-op',
  //       component: AdminAndOp,
  //       meta: {
  //         title: '管理和运营共享',
  //         hasSubMenu: false,
  //         icon: 'share-alt',
  //         roles: ['admin', 'op']
  //       }
  //     },
  //     {
  //       name: 'All',
  //       path: '/permission/all',
  //       component: All,
  //       meta: {
  //         title: '所有人共享',
  //         hasSubMenu: false,
  //         icon: 'global'
  //       }
  //     }
  //   ]
  // },

]


export const constantRouterMap = [
  {
    path: '/',
    redirect: '/file-list'
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      addBreadcrumb: false,
      module: '登录页'
    }
  },
  {
    name: 'ShareDetails',
    path: '/share-details',
    component: RouteView,
    children: [
      {
        path: '/share-details/:shareName',
        component: ShareDetails,
        meta: {
          notRequireLogin: true,
          module: '文件分享'
        }
      }
    ]
  },
  {
    path: '/file-list',
    component: Layout,
    redirect: '/file-list/0',
    meta: {
      title: '文件',
      addBreadcrumb: true,
      hasSubMenu: false,
      icon: 'file'
    },
    children: [
      {
        name: 'FileList',
        path: '/file-list/:parentId',
        component: FileList,
        meta: {
          module: '文件'
        }
      }
    ]
  },
  {
    name: 'Album',
    path: '/album',
    component: Layout,
    redirect: '/album',
    meta: {
      title: '相册',
      hasSubMenu: false,
      addBreadcrumb: true,
      icon: 'picture'
    },
    children: [
      {
        path: '/album',
        component: Album,
        meta: {
          module: '相册'
        }
      }
    ]
  },
  {
    name: 'Favor',
    path: '/favor',
    component: Layout,
    redirect: '/favor',
    meta: {
      title: '收藏夹',
      addBreadcrumb: true,
      hasSubMenu: false,
      icon: 'database'
    },
    children: [
      {
        path: '/favor',
        component: Favor,
        meta: {
          module: '收藏'
        }
      }
    ]
  },
  {
    name: 'Share',
    path: '/share',
    component: Layout,
    redirect: '/share',
    meta: {
      title: '分享',
      addBreadcrumb: true,
      hasSubMenu: false,
      icon: 'share-alt'
    },
    children: [
      {
        path: '/share',
        component: Share,
        meta: {
          module: '分享'
        }
      }
    ]
  },
  {
    name: 'CoShare',
    path: '/co-share',
    component: Layout,
    redirect: '/co-share',
    meta: {
      title: '共享',
      addBreadcrumb: true,
      hasSubMenu: false,
      icon: 'user'
    },
    children: [
      {
        path: '/co-share',
        component: CoShare,
        meta: {
          module: '共享'
        }
      }
    ]
  },
  {
    name: 'RecycleBin',
    path: '/recycle-bin',
    component: Layout,
    redirect: '/recycle-bin',
    meta: {
      title: '回收站',
      addBreadcrumb: true,
      hasSubMenu: false,
      icon: 'rest'
    },
    children: [
      {
        path: '/recycle-bin',
        component: Bin,
        meta: {
          module: '回收站'
        }
      }
    ]
  },
  {
    name: 'NotFound',
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]



export default constantRouterMap
