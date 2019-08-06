import { userLogin } from 'api/user'

/**
 * [state 状态]
 * @param {Boolean} isLogin         登录状态
 * @param {String} nick             用户昵称
 * @param {String} token            用户登录凭证
 * @param {String} refreshToken     刷新token凭证
 * @param {Object} userInfo         用户信息
 */
export const state = () => ({
  isLogin: /^true$/i.test(localStorage.getItem('islogin')) || false,
  nick: localStorage.getItem('nick') || '',
  token: localStorage.getItem('token') || '',
  refreshToken: localStorage.getItem('refreshtoken') || '',
  userInfo:
    localStorage.getItem('userinfo') && localStorage.getItem('userinfo') !== 'undefined'
      ? JSON.parse(localStorage.getItem('userinfo'))
      : {}
})

export const mutations = {
  /**
   * [ckeckLogin 检测是否登录]
   * @return {Boolean}         [返回登录状态]
   */
  ckeckLogin(state, boolean) {
    state.isLogin = boolean
    localStorage.setItem('islogin', boolean)
  },

  /**
   * [setLogin 设置登录信息状态]
   */
  setLogin(state, data) {
    state.nick = (data.userInfo && data.userInfo.nick) || ''
    localStorage.setItem('token', data.token || '')
    localStorage.setItem('refreshtoken', data.refreshToken || '')
    localStorage.setItem('nick', (data.userInfo && data.userInfo.nick) || '')
    localStorage.setItem('userinfo', JSON.stringify(data.userInfo))
  }
}

export const actions = {
  /**
   * [handleUserLogin 用户登录]
   * @return
   */
  handleUserLogin({ commit }, data) {
    return new Promise((resolve, reject) => {
      userLogin(data)
        .then(res => {
          resolve(res.data.data)
          commit('ckeckLogin', true)
          commit('setLogin', res.data.data || {})
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * [handleClearLoginOut 清除登录状态]
   * @return
   */
  handleClearLoginOut({ commit }) {
    commit('ckeckLogin', false)
    commit('setLogin', {})
  }
}
