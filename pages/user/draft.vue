<template>
  <page-layout>
    <div slot="top">
      <h2 class="draft-title">
        草稿<span>（{{ total || 0 }}）</span>
      </h2>
    </div>
    <div slot="main">
      <list-item
        showDate
        :loading="loading"
        :load-more="hasNextPage"
        :data-source="listData"
        @more="hadleLoadMore"
      >
        <template #more="{ data }">
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
  </page-layout>
</template>

<script>
import pageLayout from 'components/common/PageLayout'
import listItem from 'components/list/listItem'
import { getArticleDraft, delArticle } from 'api/article'

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
          data: { items, hasNextPage, next, total }
        }
      } = await getArticleDraft()

      return {
        loading: false,
        listData: items,
        hasNextPage,
        total,
        nextPage: next
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  methods: {
    hadleLoadMore(list) {
      getArticleDraft({
        page: this.nextPage
      })
        .then(res => {
          const { items, hasNextPage, next, total } = res.data.data
          this.hasNextPage = hasNextPage
          this.nextPage = next
          this.total = total
          this.listData = list.concat(items)
        })
        .catch(() => {})
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
  }
}
</script>

<style lang="less" scoped>
.draft-title {
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  margin: 26px auto -6px auto;
  padding: 12px 24px;
  font-size: 16px;

  span {
    color: #999;
  }
}
</style>
