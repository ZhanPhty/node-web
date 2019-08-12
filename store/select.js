import { getArticleTypes, getArticleCategory, getArticleTag } from 'api/select'

export const actions = {
  /**
   * 获取文章类型
   */
  handleArticleTypes() {
    return new Promise((resolve, reject) => {
      getArticleTypes()
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 获取博文分类
   */
  handleArticleCategory() {
    return new Promise((resolve, reject) => {
      getArticleCategory()
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  /**
   * 获取博文标签
   */
  handleArticleTag() {
    return new Promise((resolve, reject) => {
      getArticleTag()
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
