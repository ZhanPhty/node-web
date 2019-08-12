import axiosApi from '@/axios/config'

/**
 * 获取文章列表
 * @createdate 2019-08-07 09:39:09
 * @param {Number} params.page         页码
 * @param {Number} params.pageSize     页数
 */
export const getArticles = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/articles',
      method: 'get'
    },
    params
  )
}

/**
 * 获取文章详情
 * @createdate 2019-08-07 09:39:09
 * @param {String} id                 文章id
 */
export const getArticleDetail = ({ id }, params) => {
  return axiosApi.httpServer(
    {
      url: `/blogapi/article/detail/${id}`,
      method: 'get'
    },
    params
  )
}

/**
 * 获取文章分类
 * @createdate 2019-08-12 16:49:10
 */
export const getArticleTypes = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/select/types',
      method: 'get'
    },
    params
  )
}
