import axios from 'axios'
import { state } from '@/store/login'

axios.defaults.withCredentials = true

/**
 * [http request 拦截器]
 * @return
 */
axios.interceptors.request.use(
  config => {
    // 这里的config包含每次请求的内容
    const statefn = state()
    if (statefn.isLogin) {
      //  存在将 Authorization 写入 request header
      config.headers = {
        Authorization: `Bearer ${statefn.token}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * [返回状态判断(添加响应拦截器)]
 * code == 200时then，否则catch
 * @return
 */
axios.interceptors.response.use(
  response => {
    if (response.data && typeof response.data === 'object' && response.data.code !== 200) {
      return Promise.reject(response)
    }
    return response
  },
  error => {
    // status === 401, 无登录权限，需登录，跳转登录页面
    if (error.response && error.response.status === 401) {
      const config = error.response.config
      if (
        !((config.method === 'get' && config.params.auth) || (config.method === 'post' && config.data.auth))
      ) {
        // store.dispatch('handleClearLoginOut')
        toast('登录过期或权限不足！请重新登录')
      }
    }
    return Promise.reject(error.response)
  }
)

/**
 * [errorState 错误状态]
 * @param  {Blooean} showToast    是否显示toast
 * @return
 */
function errorState(response, showToast) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
  } else {
    return {
      status: -404,
      msg: '网络异常'
    }
  }
}

function successState(res) {
  // 统一判断后端返回的错误码
  if (res.data && res.data.code === 200) {
    return true
  } else {
    res.data === 'object' && toast(res.data.errors || res.data.msg || '网络异常')
  }
}

/**
 * [toast 弹窗]
 * @param  {String} text     内容
 * @param  {Number} duration 延迟
 * @return
 */
function toast(text, duration) {
  const div = document.createElement('div')
  let txtCnt = ''

  if (toast.busy) return
  toast.busy = true
  duration = duration || 3000
  setTimeout(() => {
    toast.busy = false
  }, duration)

  if (typeof text === 'object') {
    text.forEach(item => {
      for (const key in item) {
        txtCnt += `<p class="toast-cnt-p">${item[key]}</p>`
      }
    })
  } else {
    txtCnt = text
  }

  Object.assign(div.style, {
    boxSizing: 'border-box',
    padding: '8px 16px',
    display: 'table',
    color: '#fff',
    fontSize: '13px',
    lineHeight: 1.7,
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translateX(-50%)',
    '-webkit-transform': 'translateX(-50%)',
    '-ms-transform': 'translateX(-50%)',
    boxShadow: '0 2px 7px rgba(0, 0, 0, 0.2)',
    '-webkit-box-shadow': '0 2px 7px rgba(0, 0, 0, 0.2)',
    minWidth: '110px',
    maxWidth: '240px',
    textAlign: 'center',
    borderRadius: '5px',
    zIndex: 9999999,
    background: 'rgba(0, 0, 0, 0.78)'
  })
  div.classList.add('toast-global')
  div.innerHTML = txtCnt
  document.body.appendChild(div)

  setTimeout(() => {
    div.parentNode && div.parentNode.removeChild(div)
  }, duration)
}

/**
 * [deployUse 添加公共参数, 先获取时间戳，保证每次生成token不一致]
 * @param  {Obj} data 参数
 *               data.auth_key [验证]
 *               data.token [token --> 参数 + token]
 *               data.timestamp [时间戳]
 * @return {Obj}
 */
function deployUse(data = {}) {
  return data
}

/**
 * [配置axios]
 * @param  {Obj} opts 配置
 *               opts.method 请求方式 [*必填]
 *               opts.baseURL axios默认url
 *               opts.url 请求url [*必填]
 *               opts.headers 请求headers
 * @param  {Obj} data 请求数据
 * @return {Obj} res
 */
const timeout = 50 * 1000
const httpServer = (opts, data) => {
  // 设置默认headers
  const headers = {}
  // 控制toast显示，默认值false
  const showToast = opts.showToast || false

  // http默认配置
  const httpDefaultOpts = {
    method: opts.method, // 必填
    baseURL: opts.baseURL || process.env.VUE_APP_API,
    url: opts.url, // 必填
    timeout: timeout,
    headers: Object.assign(headers, opts.headers)
  }

  if (opts.method === 'get') {
    httpDefaultOpts.params = deployUse(data)
  } else {
    httpDefaultOpts.data = deployUse(data)
  }

  const promise = new Promise((resolve, reject) => {
    axios(httpDefaultOpts)
      .then(res => {
        successState(res)
        resolve(res)
      })
      .catch(response => {
        errorState(response, showToast)
        reject(response)
      })
  })

  return promise
}

export default {
  httpServer
}
