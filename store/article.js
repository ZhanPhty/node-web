import { getArticles, getArticleHot } from 'api/article'

export const actions = {
  /**
   * 获取博文列表
   * @return
   */
  handleArticleList(store, data) {
    return new Promise((resolve, reject) => {
      getArticles(data)
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 获取热门博文
   * @return
   */
  handleArticleHot(store, data) {
    return new Promise((resolve, reject) => {
      getArticleHot(data)
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
