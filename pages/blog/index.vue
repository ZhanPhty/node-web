<template>
  <page-layout class="home-container">
    <!-- slot: top -->
    <div slot="top">
      <a-tabs class="home-tab" default-active-key="1">
        <a-tab-pane key="1" tab="全部" />
        <a-tab-pane key="2" tab="分类" />
        <a-tab-pane key="3" tab="博客" />
        <a-tab-pane key="4" tab="系统" />
        <a-tab-pane key="5" tab="热门" />
      </a-tabs>
      <div class="home-tag-box">
        <ul class="home-tag">
          <li class="home-tag--item"><a>#php</a></li>
          <li class="home-tag--item"><a>#less</a></li>
          <li class="home-tag--item"><a>#服务器</a></li>
          <li class="home-tag--item"><a>#博客</a></li>
          <li class="home-tag--item"><a>#精选</a></li>
          <li class="home-tag--item"><a>#完美编译</a></li>
          <li class="home-tag--item"><a>#开源</a></li>
          <li class="home-tag--item"><a>#精选</a></li>
          <li class="home-tag--item"><a>#完美编译</a></li>
          <li class="home-tag--item"><a>#开源</a></li>
          <li class="home-tag--item"><a>#服务器</a></li>
          <li class="home-tag--item"><a>#博客</a></li>
          <li class="home-tag--item"><a>#精选</a></li>
          <li class="home-tag--item"><a>#完美编译</a></li>
          <li class="home-tag--item"><a>#开源</a></li>
          <li class="home-tag--item"><a>#精选</a></li>
          <li class="home-tag--item"><a>#完美编译</a></li>
          <li class="home-tag--item"><a>#开源</a></li>
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
        <ul class="page-aside__article">
          <li class="page-aside__article--item">
            <a>又一国产操作系统崛起，中兴新支点OS新版上线!</a>
            <p class="page-aside__article--opt">209阅读<span>•</span>5评论</p>
          </li>
          <li class="page-aside__article--item">
            <a>又一国产操作系统崛起，中兴新支点OS新线!</a>
            <p class="page-aside__article--opt">209阅读<span>•</span>1评论</p>
          </li>
        </ul>
      </a-skeleton>
    </div>
  </page-layout>
</template>

<script>
import listItem from 'components/list/listItem'
import pageLayout from 'components/common/PageLayout'

export default {
  components: {
    listItem,
    pageLayout
  },
  data() {
    return {
      loading: true
    }
  },
  async asyncData({ store, error }) {
    try {
      const { items, hasNextPage, next } = await store.dispatch('article/handleArticleList')
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
    async hadleLoadMore(list) {
      const { items, hasNextPage, next } = await this.$store.dispatch('article/handleArticleList', {
        page: this.nextPage
      })
      this.hasNextPage = hasNextPage
      this.nextPage = next
      this.listData = list.concat(items)
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
