<template>
  <a-skeleton class="list-container" :loading="loading" active>
    <a-list item-layout="vertical" size="large" :data-source="dataSource">
      <a-list-item slot="renderItem" key="item.id" slot-scope="item">
        <a-list-item-meta>
          <a slot="title" target="_blank" :href="item.href">{{ item.title }}</a>
          <template slot="description">
            <div class="list-container-desc">{{ item.content }}</div>
          </template>
        </a-list-item-meta>
        <div slot="extra">
          <div
            class="list-container-cover"
            :style="{
              backgroundImage: `url(
                      'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                    )`
            }"
          ></div>
        </div>
        <div slot="actions" class="list-container-action">
          <span>溜达而</span>
          <span><a-icon type="message" theme="filled" /> 20</span>
          <span><a-icon type="read" theme="filled" /> 200</span>
          <p v-if="showDate" class="list-container-action__date">2018-12-29</p>
        </div>
      </a-list-item>
      <a-skeleton v-if="!busy" :loading="loading" active />
      <div slot="footer">
        <a-button class="list-container-more" block>加载更多</a-button>
      </div>
    </a-list>
  </a-skeleton>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    busy: Boolean,
    showDate: Boolean,
    dataSource: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
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
  margin-top: 20px;
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
</style>

<style lang="less">
.list-container {
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
          color: #999;
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
