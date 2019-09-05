<template>
  <page-layout class="home-container">
    <!-- slot: top -->
    <div slot="top">
      <a-tabs
        class="home-tab"
        :active-key="tabActive"
        v-if="articleCategory.length > 0"
        @change="onChangeTab"
      >
        <a-tab-pane key="" tab="全部" />
        <a-tab-pane v-for="item in articleCategory" :key="item.name" :tab="item.name" />
      </a-tabs>
      <div class="home-tag-box">
        <ul class="home-tag">
          <li class="home-tag--item" v-for="item in articleTag" :key="item">
            <nuxt-link :to="`/search?tag=${item}`">#{{ item }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- slot: main -->
    <div slot="main">
      <list-item
        :loading="loading"
        show-date
        :load-more="hasNextPage"
        :data-source="listData"
        @more="hadleLoadMore"
      />
    </div>
    <!-- slot: aside -->
    <div slot="aside" class="page-aside">
      <h2 class="page-aside__title">热门文章</h2>
      <a-skeleton :loading="loading" active>
        <aside-article />
      </a-skeleton>
    </div>
  </page-layout>
</template>

<script>
import listItem from 'components/list/listItem'
import pageLayout from 'components/common/PageLayout'
import asideArticle from 'components/aside/AsideArticle'

export default {
  components: {
    listItem,
    pageLayout,
    asideArticle
  },
  data() {
    return {
      loading: true
    }
  },
  async asyncData({ store, error, query }) {
    try {
      const articleCategory = await store.dispatch('select/handleArticleCategory')
      const articleTag = await store.dispatch('select/handleArticleTag')
      const { items, hasNextPage, next } = await store.dispatch('article/handleArticleList', {
        category: query.category
      })

      return {
        loading: false,
        listData: items,
        hasNextPage,
        nextPage: next,
        articleCategory,
        articleTag,
        tabActive: query.category || ''
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
      this.tabActive = query.category || ''
      this.hadleLoadMore([])
    }
  },
  methods: {
    async hadleLoadMore(list) {
      const { items, hasNextPage, next } = await this.$store.dispatch('article/handleArticleList', {
        page: this.nextPage,
        category: this.tabActive
      })
      this.hasNextPage = hasNextPage
      this.nextPage = next
      this.listData = list.concat(items)
    },

    /**
     * 切换tab
     * 刷新
     */
    onChangeTab(active) {
      this.$router.push({
        path: `/blog?category=${active}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-tag-box {
  height: 30px;
  overflow: hidden;
}

.home-tag {
  padding-bottom: 60px;
  overflow-x: auto;
  white-space: nowrap;

  &--item {
    display: inline-block;
    margin-right: 6px;
  }

  a {
    display: inline-block;
    background-color: #ecedee;
    color: #9b9b9b;
    text-decoration: none;
    padding: 3px 7px 4px 7px;
    border-radius: 2px;
    font-size: 12px;
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      transition: all 0.3s;
    }
  }
}
</style>

<style lang="less">
.home-tab.ant-tabs {
  margin: 30px 0 6px -4px;

  .ant-tabs-bar {
    margin: 0;
    border: 0;
  }

  .ant-tabs-tab {
    padding: 6px 20px;
    background-color: #fff;
    border-radius: @radiusSmall;
    font-size: 14px;
    margin-right: 14px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
  }

  .ant-tabs-ink-bar {
    display: none !important;
  }

  .ant-tabs-nav-scroll {
    padding: 10px 4px;
  }

  .ant-tabs-tab-arrow-show {
    i {
      font-size: 15px;
    }
  }
}
</style>
