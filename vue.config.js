const { resolve } = require('path')

const outputDir = process.env.VUE_APP_OUTPUT_DIR
const publicPath = process.env.VUE_APP_PUBLIC_PATH

module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  // 开发服务器
  devServer: {
    port: 80,
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
    hot: true,
    proxy: {
      '/api': {
        target: 'http://175.24.164.138:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/v': {
        target: 'http://175.24.164.138:8089',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/v': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      // 路径别名
      alias: {
        '@': resolve('src'),
        '@views': resolve('src/views'),
        '@components': resolve('src/components'),
        '@store': resolve('src/store'),
        '@service': resolve('src/service'),
        '@assets': resolve('src/assets')
      }
    },
    externals: {
      webConfigs: 'webConfigs'
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: {
            loader: 'worker-loader',
            options: {
              inline: 'fallback'
            }
          }
        }
      ]
    }
  },
  // 根据环境变量输出到构建目录
  outputDir: outputDir,
  // 根据环境变量自动适配基础路径
  publicPath: publicPath
}
