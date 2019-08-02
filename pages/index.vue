<template>
  <a-row class="home-container" type="flex" :gutter="30">
    <a-col class="home-container-main" :xs="24" :sm="24" :md="16" :xl="17">
      <a-carousel class="home-container-banner" autoplay>
        <div class="home-container-banner__item"><h3>1</h3></div>
        <div class="home-container-banner__item"><h3>2</h3></div>
      </a-carousel>
      <div class="home-container-hd">
        <div class="home-container-hd__alert">
          新的公告！
        </div>
      </div>
      <div class="home-container-list">
        <a-skeleton :loading="loading" active>
          <a-list item-layout="vertical" size="large" :data-source="listData">
            <a-list-item slot="renderItem" key="item.id" slot-scope="item">
              <a-list-item-meta>
                <a slot="title" target="_blank" :href="item.href">{{ item.title }}</a>
                <template slot="description">
                  <div class="home-container-desc">{{ item.content }}</div>
                </template>
              </a-list-item-meta>
              <div slot="extra">
                <div
                  class="home-container-cover"
                  :style="{
                    backgroundImage: `url(
                      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                    )`
                  }"
                ></div>
              </div>
              <div slot="actions">
                2
              </div>
            </a-list-item>
            <a-skeleton v-if="!busyLoad" :loading="true" active>23232 </a-skeleton>
            <div slot="footer">
              <a-button class="home-container-more" block>加载更多</a-button>
            </div>
          </a-list>
        </a-skeleton>
      </div>
    </a-col>
    <a-col class="home-container-aside" :xs="0" :sm="0" :md="8" :xl="7"><span>3323232</span> </a-col>
  </a-row>
</template>

<script>
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
  padding-bottom: @gap + 10;

  &-main,
  &-aside {
    padding-top: @gap + 10;
  }

  &-banner {
    .home-box-show;
    border-radius: @radiusBase;
    overflow: hidden;
    background-color: #fff;

    &__item {
      height: 240px;
    }
  }
}

.home-container-hd {
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

.home-container-desc {
  max-height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* autoprefixer: off*/
  -webkit-box-orient: vertical;
}

.home-container-cover {
  width: 138px;
  height: 90px;
  background-size: cover;
  background-color: #eaedf2;
}

.home-container-more {
  border-radius: 100px;
  margin-top: 20px;
  border: 0;
  background-color: #dae0e5;
  color: @colorText;

  &:hover {
    opacity: 0.8;
  }
}

.home-container-list {
  margin-top: @gap;
}
</style>

<style lang="less">
.home-container-list {
  .ant-list-item-extra-wrap {
    align-items: center;
  }

  .ant-list-item-extra {
    margin-left: 20px;
  }

  .ant-list-item-meta {
    &-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;

      & > a {
        color: @colorText;

        &:visited {
          color: #999;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .ant-skeleton {
    .ant-skeleton-title {
      background-color: #ddd;
    }

    .ant-skeleton-content {
      padding-right: 166px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 18%;
        right: 0;
        display: inline-block;
        width: 138px;
        height: 90px;
        background: linear-gradient(90deg, #ececec 25%, #e0e0e0 37%, #ececec 63%);
        animation: ant-skeleton-loading 1.4s ease infinite;
        background-size: 400% 100%;
      }
    }
  }
}
</style>
