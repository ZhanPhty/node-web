<template>
  <page-layout class="home-container">
    <div slot="main">
      <a-carousel class="home-container-banner" autoplay>
        <div class="home-container-banner__item"><h3>1</h3></div>
        <div class="home-container-banner__item"><h3>2</h3></div>
      </a-carousel>
      <!-- <div class="home-container-hd">
        <div class="home-container-hd__alert">
          新的公告！
        </div>
      </div> -->
      <div class="home-container-list">
        <list-item
          :loading="loading"
          show-date
          :load-more="hasNextPage"
          :data-source="listData"
          @more="hadleLoadMore"
        />
      </div>
    </div>
    <!-- 左侧 -->
    <div slot="aside">
      <div class="page-aside">
        <h2 class="page-aside__title">热门标签</h2>
        <a-skeleton :loading="loading" active>
          <ul class="page-aside__tag">
            <li class="page-aside__tag--item"><a>#php</a></li>
            <li class="page-aside__tag--item"><a>#less</a></li>
            <li class="page-aside__tag--item"><a>#服务器</a></li>
            <li class="page-aside__tag--item"><a>#博客</a></li>
            <li class="page-aside__tag--item"><a>#精选</a></li>
            <li class="page-aside__tag--item"><a>#完美编译</a></li>
            <li class="page-aside__tag--item"><a>#开源</a></li>
            <li class="page-aside__tag--item"><a>#精选</a></li>
            <li class="page-aside__tag--item"><a>#完美编译</a></li>
            <li class="page-aside__tag--item"><a>#开源</a></li>
          </ul>
        </a-skeleton>
      </div>
      <div class="page-aside">
        <h2 class="page-aside__title">文章分类</h2>
        <a-skeleton :loading="loading" active>
          <ul class="page-aside__sort">
            <li class="page-aside__sort--item">
              <a>生活</a>
              <span>(20)</span>
            </li>
            <li class="page-aside__sort--item">
              <a>摄影</a>
              <span>(50)</span>
            </li>
            <li class="page-aside__sort--item">
              <a>技术</a>
              <span>(9)</span>
            </li>
            <li class="page-aside__sort--item">
              <a>CSS</a>
              <span>(10)</span>
            </li>
          </ul>
        </a-skeleton>
      </div>
      <div class="page-aside">
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
.home-box-show {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.home-container {
  &-banner {
    .home-box-show;
    border-radius: @radiusSmall;
    overflow: hidden;
    background-color: #fff;

    &__item {
      height: 240px;
    }
  }

  &-hd {
    position: relative;
    height: 40px;
    line-height: 40px;
    margin-top: @gap;

    & > h2 {
      font-size: 16px;
      line-height: 40px;
      color: @colorText;
      font-weight: bold;
      display: inline-block;
    }

    &__alert {
      float: right;
      max-width: 350px;
      padding: 0 20px;
      color: #6b3612;
      background-color: #fff7e7;
      border-radius: 40px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &-list {
    margin-top: 30px;
  }
}
</style>
