<template>
  <a-skeleton class="list-container" :loading="loading" active>
    <div v-if="dataSource.length < 1" class="list-empty">
      <img :src="empty" />
      <p>暂无数据</p>
    </div>
    <a-list v-else item-layout="vertical" size="large" :data-source="dataSource">
      <a-list-item slot="renderItem" key="item.id" slot-scope="item">
        <a-list-item-meta>
          <a slot="title" target="_blank" :href="`/article/${item._id}`">{{ item.title }}</a>
          <template slot="description">
            <div class="list-container-desc">{{ item.summary }}</div>
          </template>
        </a-list-item-meta>
        <div v-if="item.cover" slot="extra">
          <div
            class="list-container-cover"
            :style="{
              backgroundImage: `url(${item.cover})`
            }"
          ></div>
        </div>
        <div slot="actions" class="list-container-action">
          <span>{{ item.user_info && item.user_info.nick }}</span>
          <span><a-icon type="message" theme="filled" /> {{ item.review || 0 }}</span>
          <span><a-icon type="eye" style="font-size: 13px" theme="filled" /> {{ item.read || 0 }}</span>
          <span><slot name="more" :data="item"></slot></span>
          <p v-if="showDate" class="list-container-action__date">{{ item.created | formatDate('YMD') }}</p>
        </div>
      </a-list-item>
      <div v-if="loadMore" slot="loadMore" style="padding: 20px">
        <a-skeleton :loading="busy" active />
        <a-button v-if="!busy" class="list-container-more" block @click="onLoadMore">加载更多</a-button>
      </div>
    </a-list>
  </a-skeleton>
</template>

<script>
import empty from 'assets/images/404.svg'

export default {
  props: {
    /**
     * 首次加载
     */
    loading: Boolean,

    /**
     * 加载更多
     */
    loadMore: Boolean,

    /**
     * 是否显示文章列表日期
     */
    showDate: Boolean,

    /**
     * 列表数据
     */
    dataSource: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      /**
       * 点击‘加载更多’切换列表load效果
       */
      busy: false,
      empty
    }
  },
  watch: {
    dataSource(arr) {
      this.busy = false
    }
  },
  methods: {
    /**
     * 加载更多
     * 添加500ms延迟动画更流畅
     */
    onLoadMore() {
      this.busy = true
      setTimeout(() => {
        this.$emit('more', this.dataSource)
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.list-empty {
  text-align: center;
  padding-top: 50px;
  padding-bottom: 30px;

  img {
    height: 140px;
  }

  p {
    margin-top: 30px;
    color: #c1c8c2;
  }
}

.list-container {
  border-radius: @radiusSmall;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  .list-container-desc {
    max-height: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* autoprefixer: off*/
    -webkit-box-orient: vertical;
  }

  .list-container-cover {
    width: 138px;
    height: 90px;
    background-size: cover;
    background-color: #eaedf2;
  }

  .list-container-more {
    border-radius: 100px;
    border: 0;
    background-color: #dae0e5;
    color: @colorText;

    &:hover {
      opacity: 0.8;
      background-color: #dce2e7;
      color: @colorText;
    }
  }

  .list-container-action {
    font-size: 12px;
    position: relative;

    span {
      margin-right: 16px;
      color: #b4b4b4;
      cursor: pointer;
    }

    &__date {
      color: #bbb;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>

<style lang="less">
.list-container {
  .ant-list-item {
    padding: 16px 24px;
    border-color: #f0f0f0;
  }

  &.ant-skeleton {
    .ant-list-item;
  }

  .ant-list-item-extra-wrap {
    align-items: center;
  }

  .ant-list-item-extra {
    margin-left: 20px;
  }

  .ant-list-item-meta {
    margin-bottom: 12px;

    &-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 1.5;

      & > a {
        color: @colorText;

        &:visited {
          color: #979ba5;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .ant-list-item-action > li {
    width: 100%;
    text-align: left;
    padding: 0;
    cursor: initial;
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
