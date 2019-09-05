import axiosApi from '@/axios/config'

/**
 * 发布文章
 * @createdate 2019-08-20 13:39:13
 */
export const publishArticle = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/article/section',
      method: 'post'
    },
    params
  )
}

/**
 * 编辑文章
 * @createdate 2019-08-20 13:39:13
 */
export const editArticle = ({ id }, params) => {
  return axiosApi.httpServer(
    {
      url: `/blogapi/article/section/${id}`,
      method: 'put'
    },
    params
  )
}

/**
 * 删除文章
 * @createdate 2019-09-05 13:54:09
 */
export const delArticle = ({ id }, params) => {
  return axiosApi.httpServer(
    {
      url: `/blogapi/article/section/${id}`,
      method: 'delete'
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

/**
 * 获取推荐文章
 * @createdate 2019-08-21 16:11:50
 */
export const getArticleRecommend = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/article/recommend',
      method: 'get'
    },
    params
  )
}

/**
 * 模糊搜索
 * @createdate 2019-08-26 14:38:09
 * @param {Number} params.keyword      关键词
 */
export const getArticleSearch = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/article/search',
      method: 'get'
    },
    params
  )
}

/**
 * 文章点赞
 * @createdate 2019-08-26 14:38:09
 * @param {String} id                 文章id
 */
export const putArticleLike = ({ id }, params) => {
  return axiosApi.httpServer(
    {
      url: `/blogapi/action/${id}/like`,
      method: 'post'
    },
    params
  )
}

/**
 * 取消点赞
 * @createdate 2019-08-26 14:38:09
 * @param {String} id                 文章id
 */
export const delArticleLike = ({ id }, params) => {
  return axiosApi.httpServer(
    {
      url: `/blogapi/action/${id}/like`,
      method: 'delete'
    },
    params
  )
}

/**
 * 发布评论
 * @createdate 2019-08-30 15:49:59
 * @param {String} id                 文章id
 * @param {String} params.content     评论内容
 * @param {String} params.replyId     被回复人id
 */
export const putArticleComment = ({ id }, params) => {
  return axiosApi.httpServer(
    {
      url: `/blogapi/action/${id}/comment`,
      method: 'post'
    },
    params
  )
}

/**
 * 获取评论列表
 * @createdate 2019-08-30 15:49:59
 * @param {String} id                 文章id
 */
export const getCommentList = ({ id }, params) => {
  return axiosApi.httpServer(
    {
      url: `/blogapi/action/${id}/comments`,
      method: 'get'
    },
    params
  )
}

/**
 * 获取草稿列表
 * @createdate 2019-09-05 13:50:53
 * @param {Number} params.page         页码
 * @param {Number} params.pageSize     页数
 */
export const getArticleDraft = params => {
  return axiosApi.httpServer(
    {
      url: `/blogapi/article/draft`,
      method: 'get'
    },
    params
  )
}
