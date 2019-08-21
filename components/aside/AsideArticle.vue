<template>
  <ul class="aside__article">
    <li class="aside__article--item" v-for="item in dataSource" :key="item._id">
      <nuxt-link :to="`/article/${item._id}`">{{ item.title }}</nuxt-link>
      <p class="aside__article--opt">{{ item.review || 0 }}评论<span>•</span>{{ item.read || 0 }}阅读</p>
    </li>
    <li v-if="dataSource.length < 1">
      <p class="aside__article--none">暂无热门文章</p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      dataSource: []
    }
  },
  mounted() {
    this.$store
      .dispatch('article/handleArticleHot')
      .then(res => {
        this.dataSource = res.items
      })
      .catch(() => {})
  }
}
</script>

<style lang="less" scoped>
.aside__article {
  &--item {
    border-bottom: 1px solid #eee;
    padding-bottom: 12px;
    margin-bottom: 12px;

    &:last-child {
      border-bottom: 0;
      margin-bottom: 0;
    }
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

  &--none {
    color: #bbb;
    font-size: 13px;
    text-align: center;
    padding: 30px 0;
  }
}
</style>
