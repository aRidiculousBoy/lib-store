import axios from 'axios'
import authorization from '@/utils/authorization'
import config from '@/configs'
import { notification as Notice, message as Message } from 'ant-design-vue'
import { networkTimeout } from '@/configs'
import router from '@/router'

const showMessage = options => {
  // 开发环境提示详细信息，方便排查问题
  if (config.appMode === "development") {
    Notice.error({
      message: options.title,
      description: h => {
        let content = [];

        // Method
        if (options.method) {
          let method = h("div", { style: "color: #8c8c8c;" }, [
            h("span", { style: "margin-right: 5px; color: #262626;" }, "[Method]:"),
            options.method.toUpperCase()
          ]);

          content.push(method);
        }

        // Status
        if (options.status) {
          let status = h("div", { style: "color: #8c8c8c;" }, [
            h("span", { style: "margin-right: 5px; color: #262626;" }, "[Status]:"),
            options.status
          ]);

          content.push(status);
        }

        // Url
        if (options.url) {
          let url = h("div", { style: "color: #8c8c8c;" }, [
            h("span", { style: "margin-right: 5px; color: #262626;" }, "[Url]:"),
            options.url
          ]);

          content.push(url);
        }

        // Message
        if (options.message) {
          let message = h("div", { style: "color: #8c8c8c;" }, [
            h("span", { style: "margin-right: 5px; color: #262626;" }, "[Message]:"),
            options.message
          ]);

          content.push(message);
        }

        // Notice desciption
        return h("div", { style: "font-size: 14px; white-space:normal; word-break:break-all; word-wrap:break-word;" }, content);
      }
    });
  }
  // 其它环境仅提示概要信息
  else {
    Message.error({
      closable: true,
      content: options.message || options.msg
    });
  }
};



class Request {
  instance
  interceptors
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例都共享的拦截器
    this.instance.interceptors.request.use((config) => {
      return config
    })
    this.instance.interceptors.response.use((config) => {
      return config.data
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }

  put(config) {
    return this.request({ ...config, method: 'PUT' })
  }
}

const request = new Request({
  timeout: networkTimeout,
  interceptors: {
    requestInterceptor: (config) => {
      const token = authorization.getToken()
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      const data = res.data
      const error = {
        type: 'error',
        title: '操作失败',
        method: res.config.method,
        url: res.config.url,
        status: res.status,
        code: res.data.code,
        message: res.data.message
      }

      // 请求成功
      if (data.code === 200) {
        return data
      }
      // 未登录或登录过期
      else if (data.code === 401) {
        const route = {
          path: '/user/login',
        }
        router.replace(router)
      }
      // 其它情况
      else {
        showMessage(error)
        return Promise.reject(error)
      }
    },
    responseInterceptorCatch: (e) => {
      const error = {
        type: 'error',
        title: '系统提示',
        method: e.config.method,
        url: e.config.url,
        msg: undefined
      }
      if (e.response && e.response.data && e.response.msg) {
        error.msg = e.response.data.msg;
      }
      else if (e.message.includes('timeout') && e.code === 'ECONNABORTED') {
        error.msg = e.message
      } else {
        error.msg = e.message
      }
      showMessage(error)
      return Promise.reject(error)
    }
  }
})

export default request
