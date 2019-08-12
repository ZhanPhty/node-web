import { getArticles } from 'api/article'

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
  }
}
