import axiosApi from '@/axios/config'

/**
 * 获取文章类别
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

/**
 * 获取博文分类
 * @createdate 2019-08-12 17:38:07
 */
export const getArticleCategory = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/select/category',
      method: 'get'
    },
    params
  )
}

/**
 * 获取博文标签
 * @createdate 2019-08-12 17:54:19
 */
export const getArticleTag = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/select/tag',
      method: 'get'
    },
    params
  )
}
