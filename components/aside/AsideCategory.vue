<template>
  <ul class="aside__sort">
    <li class="aside__sort--item" v-for="item in dataSource" :key="item.name">
      <nuxt-link :to="`/blog?category=${item.name}`">{{ item.name }}</nuxt-link>
      <span>({{ item.count || 0 }})</span>
    </li>
    <li v-if="dataSource.length < 1">
      <p class="aside__sort--none">暂无热门分类</p>
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
      .dispatch('select/handleArticleCategory')
      .then(res => {
        this.dataSource = res
      })
      .catch(() => {})
  }
}
</script>

<style lang="less" scoped>
.aside__sort {
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

  &--none {
    color: #bbb;
    font-size: 13px;
    text-align: center;
    padding: 30px 0;
  }
}
</style>
