# Lib-Store

### 在线预览

[Lib-Store](http://119.91.214.15:1024/)

### 介绍

Lib-Store是一款简单易用的Web存储系统。

目前已经实现了文件断点续传、文件下载、取消上传、继续上传、文件移动、文件分享等功能。

其它功能进一步开发中。

###  开发

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

```
# 构建测试环境
npm run build:test

# 构建生产环境
npm run build
```

### 其它

该仓库隶属于系统的前端，后端仓库地址详见[Lib-Store后端](https://github.com/SnailQxQ/netDisk)。
