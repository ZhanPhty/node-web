<template>
  <page-layout class="search-container">
    <div slot="top">
      <div class="search-container__result" v-if="keyword">
        含“<em>{{ keyword || '' }}</em
        >”的文章结果约<span>{{ total || 0 }}</span
        >条
      </div>
      <div class="search-container__result" v-else-if="tag">
        含“<em>#{{ tag || '' }}</em
        >”的标签结果约<span>{{ total || 0 }}</span
        >条
      </div>
    </div>
    <div slot="main">
      <list-item :loading="loading" :load-more="hasNextPage" :data-source="listData" @more="hadleLoadMore" />
    </div>
    <!-- 左侧 -->
    <div slot="aside">
      <div class="page-aside">
        <h2 class="page-aside__title">热门标签</h2>
        <a-skeleton :loading="loading" active>
          <aside-tag />
        </a-skeleton>
      </div>
      <div class="page-aside">
        <h2 class="page-aside__title">文章分类</h2>
        <a-skeleton :loading="loading" active>
          <aside-category />
        </a-skeleton>
      </div>
      <div class="page-aside">
        <h2 class="page-aside__title">热门文章</h2>
        <a-skeleton :loading="loading" active>
          <aside-article />
        </a-skeleton>
      </div>
    </div>
  </page-layout>
</template>

<script>
import listItem from 'components/list/listItem'
import pageLayout from 'components/common/PageLayout'
import asideArticle from 'components/aside/AsideArticle'
import asideCategory from 'components/aside/AsideCategory'
import asideTag from 'components/aside/AsideTag'
import { getArticleSearch } from 'api/article'

export default {
  components: {
    listItem,
    pageLayout,
    asideArticle,
    asideCategory,
    asideTag
  },
  data() {
    return {
      loading: true
    }
  },
  async asyncData({ store, error, query }) {
    try {
      const { q, tag } = query
      const {
        data: {
          data: { items, hasNextPage, next, total }
        }
      } = await getArticleSearch({ keyword: q, tag })

      return {
        loading: false,
        listData: items,
        hasNextPage,
        total,
        nextPage: next,
        keyword: q,
        tag
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  watch: {
    /**
     * 监控路由
     * 切换路由时重置重新刷新数据
     */
    $route({ query }) {
      this.nextPage = 1
      this.keyword = query.q || ''
      this.tag = query.tag || ''
      this.hadleLoadMore([])
    }
  },
  methods: {
    hadleLoadMore(list) {
      getArticleSearch({
        page: this.nextPage,
        keyword: this.keyword,
        tag: this.tag
      })
        .then(res => {
          const { items, hasNextPage, next, total } = res.data.data
          this.hasNextPage = hasNextPage
          this.nextPage = next
          this.listData = list.concat(items)
          this.total = total
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  &__result {
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    margin: 26px auto -6px auto;
    padding: 12px 24px;
    font-size: 16px;
    color: #999;

    em {
      padding: 0 4px;
      color: @red;
    }

    span {
      padding: 0 6px;
      color: #666;
    }
  }
}
</style>
