import axiosApi from '@/axios/config'

// --------------------
// 用户注册
// --------------------

/**
 * 检测用户名是否有效
 * @author 詹鹏辉
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
 * @author 詹鹏辉
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
