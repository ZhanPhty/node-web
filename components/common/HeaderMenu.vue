<template>
  <div>
    <nuxt-link
      v-for="tab in navTabs"
      :key="tab.id"
      class="header-top__tab--item"
      :class="{ 'nuxt-link-exact-active': $route.path === tab.path }"
      :to="tab.path"
      exact
      @click.native="onClick"
    >
      <a-icon class="header-top__tab--icon media-header-icon" :type="tab.icon"></a-icon>
      <span class="media-header-title">{{ tab.title }}</span>
    </nuxt-link>
  </div>
</template>

<script>
const navTabs = [
  { title: '首页', id: 'home', icon: 'compass', path: '/' },
  { title: '博文', id: 'blog', icon: 'read', path: '/blog' },
  // { title: '留言板', id: 'comment', icon: 'notification', path: '/comment' },
  { title: '关于', id: 'about', icon: 'user', path: '/about' }
]

export default {
  data() {
    return {
      navTabs
    }
  },
  methods: {
    onClick() {
      this.$emit('loaded')
    }
  }
}
</script>
