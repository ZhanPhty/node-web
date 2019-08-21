import axiosApi from '@/axios/config'

/**
 * 发布文章
 * @createdate 2019-08-20 13:39:13
 */
export const publishArticles = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/article/section',
      method: 'post'
    },
    params
  )
}

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
 * 获取热门文章
 * @createdate 2019-08-21 16:11:50
 */
export const getArticleHot = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/article/hot',
      method: 'get'
    },
    params
  )
}
