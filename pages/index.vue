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
        <list-item :loading="loading" :busy="!busyLoad" :data-source="listData" />
      </div>
    </div>
    <!-- 左侧 -->
    <div slot="aside">
      <div class="home-aside">
        <h2 class="home-aside__title">热门标签</h2>
        <a-skeleton :loading="loading" active>
          <ul class="home-aside__tag">
            <li class="home-aside__tag--item"><a>#php</a></li>
            <li class="home-aside__tag--item"><a>#less</a></li>
            <li class="home-aside__tag--item"><a>#服务器</a></li>
            <li class="home-aside__tag--item"><a>#博客</a></li>
            <li class="home-aside__tag--item"><a>#精选</a></li>
            <li class="home-aside__tag--item"><a>#完美编译</a></li>
            <li class="home-aside__tag--item"><a>#开源</a></li>
            <li class="home-aside__tag--item"><a>#精选</a></li>
            <li class="home-aside__tag--item"><a>#完美编译</a></li>
            <li class="home-aside__tag--item"><a>#开源</a></li>
          </ul>
        </a-skeleton>
      </div>
      <div class="home-aside">
        <h2 class="home-aside__title">文章分类</h2>
        <a-skeleton :loading="loading" active>
          <ul class="home-aside__sort">
            <li class="home-aside__sort--item">
              <a>生活</a>
              <span>(20)</span>
            </li>
            <li class="home-aside__sort--item">
              <a>摄影</a>
              <span>(50)</span>
            </li>
            <li class="home-aside__sort--item">
              <a>技术</a>
              <span>(9)</span>
            </li>
            <li class="home-aside__sort--item">
              <a>CSS</a>
              <span>(10)</span>
            </li>
          </ul>
        </a-skeleton>
      </div>
      <div class="home-aside">
        <a-affix :offset-top="90">
          <h2 class="home-aside__title">热门文章</h2>
          <a-skeleton :loading="loading" active>
            <ul class="home-aside__article">
              <li class="home-aside__article--item">
                <a>又一国产操作系统崛起，中兴新支点OS新版上线!</a>
                <p class="home-aside__article--opt">209阅读<span>•</span>5评论</p>
              </li>
              <li class="home-aside__article--item">
                <a>又一国产操作系统崛起，中兴新支点OS新线!</a>
                <p class="home-aside__article--opt">209阅读<span>•</span>1评论</p>
              </li>
            </ul>
          </a-skeleton>
        </a-affix>
      </div>
    </div>
  </page-layout>
</template>

<script>
import listItem from 'components/list/listItem'
import pageLayout from 'components/common/PageLayout'

const listData = []
for (let i = 0; i < 10; i++) {
  listData.push({
    id: i,
    href: 'https://vue.ant.design/' + i,
    title: `又一国产操作系统崛起，中兴新支点OS新版上线!`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      '书名看起来很有深度，但是内容通俗易懂，适合大多数大多数的大多数的的普容通俗易懂，适合大多数的普通人，作者也是湖北某一五线城市的普通人，本书讲的是一个精神图腾的故事。'
  })
}

export default {
  components: {
    listItem,
    pageLayout
  },
  data() {
    return {
      listData,
      loading: false,
      busyLoad: false
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home-box-show {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.home-container {
  &-banner {
    .home-box-show;
    border-radius: @radiusBase;
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
    margin-top: @gap;
  }
}

.home-aside {
  & + .home-aside {
    margin-top: 30px;
  }

  &__title {
    font-size: 14px;
    color: #868686;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 16px;
  }

  // 标签
  &__tag {
    &--item {
      display: inline-block;
      margin-bottom: 8px;
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

  // 分类
  &__sort {
    &--item {
      display: inline-block;
      width: 48%;
      margin-bottom: 6px;
    }

    a {
      color: @colorText;

      &:hover {
        color: @primary;
      }
    }

    span {
      color: #999;
    }
  }

  // 文章
  &__article {
    &--item {
      border-bottom: 1px solid #eee;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }

    &--opt {
      color: #9b9b9b;
      font-size: 12px;
      margin-top: 6px;

      span {
        color: #ccc;
        margin: 0 8px;
      }
    }

    a {
      color: @colorText;
      // display: block;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
