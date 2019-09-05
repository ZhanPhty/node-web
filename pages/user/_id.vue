<template>
  <page-layout>
    <div slot="main">
      <list-item :loading="loading" :load-more="hasNextPage" :data-source="listData" @more="hadleLoadMore" />
    </div>
    <div slot="aside">2323</div>
  </page-layout>
</template>

<script>
import pageLayout from 'components/common/PageLayout'
import listItem from 'components/list/listItem'
import { getArticleRecommend } from 'api/article'

export default {
  components: {
    pageLayout,
    listItem
  },
  data() {
    return {
      loading: true
    }
  },
  async asyncData({ store, error }) {
    try {
      const {
        data: {
          data: { items, hasNextPage, next }
        }
      } = await getArticleRecommend()

      return {
        loading: false,
        listData: items,
        hasNextPage,
        nextPage: next
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  methods: {
    hadleLoadMore(list) {
      getArticleRecommend({
        page: this.nextPage
      })
        .then(res => {
          const { items, hasNextPage, next } = res.data.data
          this.hasNextPage = hasNextPage
          this.nextPage = next
          this.listData = list.concat(items)
        })
        .catch(() => {})
    }
  }
}
</script>
