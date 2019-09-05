<template>
  <ul class="aside__tag">
    <li class="aside__tag--item" v-for="item in dataSource" :key="item">
      <nuxt-link :to="`/search?tag=${item}`">#{{ item }}</nuxt-link>
    </li>
    <li v-if="dataSource.length < 1">
      <p class="aside__tag--none">暂无热门标签</p>
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
      .dispatch('select/handleArticleTag')
      .then(res => {
        this.dataSource = res
      })
      .catch(() => {})
  }
}
</script>

<style lang="less" scoped>
.aside__tag {
  max-height: 174px;
  overflow: auto;

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

  &--none {
    color: #bbb;
    font-size: 13px;
    text-align: center;
    padding: 30px 0;
  }
}
</style>
