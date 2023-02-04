# Lib-Store

------

### 在线预览

[Lib-Store](http://119.91.214.15:1024/)

### 目录结构

------

```javascript
- dist 生产环境目录文件

- dist.test 测试环境目录文件

- node_modules 项目依赖

- public
  - favicon.ico 网站图标
  - index.html 页面入口文件
  - config.js 动态且不需要rebuild配置抽离文件
- src
  - assets 静态资源目录
  - components 公共组件
  - directives Vue指令
  - layout 系统布局组件
  - constants 常量放置文件
  - utils 公共业务方法或第三方工具库
  - configs 系统配置
  - router 系统路由
  - routes 系统路由菜单配置
  - service 请求接口
  - store 状态管理
  - views 系统页面目录，对应 routes 配置
  - App.vue 根组件
  - main.js 系统入口
- .env.development 开发环境变量配置，只在dev模式中被载入

- .env.test 测试环境变量配置，只在test模式中被载入

- .env.production 生产环境变量配置，只在production模式中被载入

- vue.config.js 项目构建配置
```

###  开发

------

```javascript
# 克隆项目
https://github.com/aRidiculousBoy/lib-store.git

# 进入项目目录
cd project

# 安装依赖
npm install

# 启动本地开发服务，启动服务前，请根据自身需求修改vue.config.js 文件中 devServer 的 host 及 port 配置
npm run dev
```

### 发布

------

```
# 构建测试环境
npm run build:test

# 构建生产环境
npm run build
```

### 其它

------

该仓库隶属于系统的前端，后端仓库地址请见[Lib-Store后端](https://github.com/SnailQxQ/netDisk)
