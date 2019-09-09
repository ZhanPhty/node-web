<template>
  <page-layout asideAffix>
    <div slot="main">
      <div class="ui-flex ui-flex__center center-box">
        <nuxt-link v-if="userInfo.id === userId" class="center-box__setting" to="/user/setting">
          <a-tooltip title="编辑资料">
            <a-icon type="setting" style="fontSize: 16px" />
          </a-tooltip>
        </nuxt-link>
        <a-avatar :size="72" icon="user" :src="userInfo.cover" />
        <div class="ui-flex__item center-info">
          <h3>{{ userInfo.nick }}</h3>
          <p class="center-info__item" v-if="userInfo.summary">
            <span><a-icon type="schedule" />简介：</span>
            {{ userInfo.summary }}
          </p>
          <p class="center-info__item" v-if="userInfo.web">
            <span><a-icon type="global" />主页：</span>
            {{ userInfo.web }}
          </p>
        </div>
      </div>
      <a-affix :offsetTop="60">
        <ul class="center-tab">
          <li
            class="center-tab__item"
            :class="{ ' center-tab__active': status === '' }"
            @click="bindToogleTab()"
          >
            文章<span>{{ userInfo.articleCount }}</span>
          </li>
          <li
            class="center-tab__item"
            :class="{ ' center-tab__active': status === 'like' }"
            @click="bindToogleTab('like')"
          >
            喜欢<span>{{ userInfo.likeCount }}</span>
          </li>
        </ul>
      </a-affix>
      <list-item
        showDate
        :loading="loading"
        :load-more="hasNextPage"
        :data-source="listData"
        @more="hadleLoadMore"
      >
        <template #more="{ data }" v-if="userInfo.id === userId && status === ''">
          <a-dropdown>
            <label style="cursor: pointer">
              <a-icon type="align-left" />
              操作
            </label>
            <a-menu slot="overlay" style="width: 92px" @click="bindAction($event, data._id)">
              <a-menu-item key="edit">
                <a-icon type="form" />
                编辑
              </a-menu-item>
              <a-menu-item key="del">
                <a-icon type="delete" />
                删除
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </list-item>
    </div>
    <div slot="aside">
      <div class="center-aside">
        <div class="center-aside__item">
          <p>发布了</p>
          <span>{{ userInfo.articleCount }}</span>
        </div>
        <div class="center-aside__item">
          <p>喜欢</p>
          <span>{{ userInfo.likeCount }}</span>
        </div>
      </div>
      <div class="center-date"><span>加入于：</span>{{ userInfo.created | formatDate('YMD') }}</div>
    </div>
  </page-layout>
</template>

<script>
import { mapState } from 'vuex'
import pageLayout from 'components/common/PageLayout'
import listItem from 'components/list/listItem'
import { delArticle } from 'api/article'
import { userCenterOther, userCenterArticle, userCenterLike } from 'api/user'

export default {
  components: {
    pageLayout,
    listItem
  },
  data() {
    return {
      loading: true,
      hasNextPage: false,
      nextPage: 1,
      listData: [],
      status: ''
    }
  },
  async asyncData({ params, store, error }) {
    try {
      const {
        data: { data }
      } = await userCenterOther({ id: params.id })

      return {
        userInfo: data || {}
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  computed: {
    ...mapState({
      userId: state => state.login.userInfo.id || ''
    })
  },
  watch: {
    $route({ query }) {
      this.status = query.type
      this.nextPage = 1
      this.hadleLoadMore()
    }
  },
  methods: {
    /**
     * 切换tab
     */
    bindToogleTab(type = '') {
      const { path } = this.$route

      this.$router.push({
        path: `${path}?type=${type}`
      })
    },

    /**
     * 加载数据
     */
    hadleLoadMore(list = []) {
      const { id } = this.$route.params

      if (this.status === 'like') {
        userCenterLike(
          {
            id
          },
          {
            page: this.nextPage
          }
        )
          .then(res => {
            const { items, hasNextPage, next } = res.data.data
            this.hasNextPage = hasNextPage
            this.nextPage = next

            this.listData = list.concat(items)
            this.loading = false
          })
          .catch(() => {})
      } else {
        userCenterArticle(
          {
            id
          },
          {
            page: this.nextPage
          }
        )
          .then(res => {
            const { items, hasNextPage, next } = res.data.data
            this.hasNextPage = hasNextPage
            this.nextPage = next

            this.listData = list.concat(items)
            this.loading = false
          })
          .catch(() => {})
      }
    },

    /**
     * 列表操作按钮
     */
    bindAction({ key }, id) {
      switch (key) {
        case 'edit':
          this.$router.push({
            path: `/writer?articleid=${id}&redirect=${this.$route.fullPath}`
          })
          break
        case 'del':
          this.$confirm({
            title: '删除文章',
            content: '确定删除该篇文章？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
              delArticle({ id })
                .then(() => {
                  this.nextPage = 1
                  this.hadleLoadMore([])
                  this.$message.success('删除成功！')
                })
                .catch(() => {})
            },
            onCancel() {}
          })
          break
      }
    }
  },
  mounted() {
    const { type } = this.$route.query

    this.status = type || ''
    this.hadleLoadMore()
  }
}
</script>

<style lang="less" scoped>
.center-box {
  position: relative;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 20px;
  border-radius: @radiusSmall;

  &__setting {
    position: absolute;
    right: 24px;
    top: 24px;
  }
}

.center-info {
  padding-left: 20px;

  & > h3 {
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    padding-bottom: 8px;
    padding-right: 30px;
  }

  &__item {
    margin-top: 3px;
    font-size: 13px;
    color: #696a6e;

    span {
      color: #9a9c9e;

      i {
        padding-right: 4px;
      }
    }
  }
}

.center-tab {
  line-height: 50px;
  background-color: #fff;
  border-top-left-radius: @radiusSmall;
  border-top-right-radius: @radiusSmall;
  border-bottom: 1px solid #eee;

  &__item {
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    padding-left: 24px;
    padding-right: 24px;

    span {
      padding-left: 6px;
      color: #aaacaf;
    }
  }

  &__active {
    border-bottom: 2px solid @primary;
    color: @primary;

    span {
      color: @primary;
    }
  }
}

.center-aside {
  color: #31445b;
  margin-top: 20px;

  &__item {
    display: inline-block;
    font-size: 16px;
    text-align: center;
    width: 48.5%;
    border-right: 1px solid #eee;

    &:last-child {
      border-right: 0;
    }

    span {
      font-weight: bold;
      padding-top: 4px;
    }
  }
}

.center-date {
  margin-top: 34px;
  margin-bottom: 16px;
  text-align: right;
  color: #aaacaf;

  span {
    float: left;
  }
}
</style>
