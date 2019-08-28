import axios from 'axios'
import store from '@/store'
import { getToken } from '@/libs/util'
import { Message } from 'iview'
import qs from 'qs'
import router from '../router'

// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    let headers = {}
    const token = getToken()
    if (token) {
      headers.AccessToken = token
    }
    return {
      baseURL: this.baseUrl,
      headers
    }
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (data.code !== 0) {
        Message.error(data.msg)
        return Promise.reject(data)
      }
      return { ...data, status }
    }, error => {
      console.log(error)
      // 未登录
      // if (data.code === 10) {
      //   store.state.commit('setToken', '')
      //   router.replace({
      //     path: '/login',
      //     query: {
      //       redirect: router.currentRoute.fullPath
      //     }
      //   })
      //   return
      // }
      this.destroy(url)
      addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
