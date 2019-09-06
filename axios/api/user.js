import axiosApi from '@/axios/config'

// --------------------
// 用户注册
// --------------------

/**
 * 检测用户名是否有效
 * @createdate 2019-06-20 11:28:19
 * @param {Obj} params              参数
 *              params.account      用户名
 * @return
 */
export const checkUserName = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/reg/check/username',
      method: 'get'
    },
    params
  )
}

/**
 * 用户注册 - 提交
 * @createdate 2019-06-20 11:29:35
 * @param {Obj} params              参数
 *              params.account      用户名
 *              params.email        邮箱
 *              params.password     密码（不小于6位）
 *              params.nick         昵称
 *              params.captcha      图形验证码
 * @return
 */
export const userRegister = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/reg',
      method: 'post'
    },
    params
  )
}

/**
 * 用户登录
 * @author 詹鹏辉
 * @createdate 2019-08-06 16:56:33
 * @param {Obj} params              参数
 *              params.account      用户名
 *              params.password     密码（不小于6位）
 *              params.captcha      图形验证码
 * @return
 */
export const userLogin = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/login',
      method: 'post'
    },
    params
  )
}

/**
 * 获取用户信息
 */
export const userCenterInfo = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/user/center',
      method: 'get'
    },
    params
  )
}

/**
 * 修改用户信息
 */
export const userCenterUpdate = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/user/update',
      method: 'put'
    },
    params
  )
}

/**
 * 重置密码
 */
export const userCenterReset = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/user/reset',
      method: 'put'
    },
    params
  )
}
