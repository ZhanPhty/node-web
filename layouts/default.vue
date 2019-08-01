<template>
  <a-layout class="home-content-layout">
    <a-affix @change="handleNavAffix">
      <a-layout-header class="home-content-header" :class="isFixed ? 'home-content-header__fixed' : ''">
        <page-header theme="light" class="layout-content-mian__big" />
      </a-layout-header>
    </a-affix>
    <a-layout-content class="home-content-main">
      <nuxt />
    </a-layout-content>
  </a-layout>
</template>

<script>
import pageHeader from 'components/nav/PageHeader'

export default {
  components: {
    pageHeader
  },
  data() {
    return {
      isFixed: false
    }
  },
  methods: {
    handleNavAffix(e) {
      this.isFixed = e
    }
  }
}
</script>

<style lang="less" scoped>
.home-content-layout {
  .home-content-header {
    position: relative;
    z-index: 29;
    transition: ease-in-out 0.2s;
    padding: 0;
    line-height: 58px;

    &.home-content-header__fixed {
      box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 8px;
      background-color: #fff;
    }

    &:hover {
      .home-content-header__fixed;
    }
  }
}
</style>

<style lang="less">
.home-content-header__fixed {
  .header-top__opt::after {
    content: '';
    display: none;
  }

  .header-top__search {
    &.ant-input-affix-wrapper {
      .ant-input {
        border-color: transparent;
      }
    }
  }
}

.home-content-header {
  &:hover {
    .home-content-header__fixed;
  }
}
</style>
