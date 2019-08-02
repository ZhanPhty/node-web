<template>
  <div class="header-top clearfix">
    <nuxt-link class="header-top__logo" to="/">
      <img :src="navLogo" alt="小灰哥" />
    </nuxt-link>
    <div class="header-top__opt">
      <a-button class="header-top__btns">登录</a-button>
      <a-button class="header-top__btns">注册</a-button>
    </div>
    <div class="layout-content-mian clearfix">
      <!-- 折叠菜单 -->
      <a-button
        class="media-header-trigger"
        icon="menu-fold"
        @click="drawerVisible = !drawerVisible"
      ></a-button>
      <a-drawer
        wrap-class-name="header-trigger__tab"
        placement="top"
        :closable="false"
        :visible="drawerVisible"
        :z-index="1"
        :wrap-style="{
          paddingTop: '44px'
        }"
        @close="drawerVisible = false"
      >
        <header-menu @loaded="drawerVisible = false" />
      </a-drawer>
      <!-- 普通菜单 -->
      <div class="header-top__tab media-header-tab">
        <header-menu class="ui-fl" />
        <a-input-search class="header-top__search media-header-search" placeholder="搜索" />
      </div>
      <!-- 右侧操作按钮 -->
      <div class="header-top__right">
        <a-button type="primary" icon="edit">
          <span class="media-header-title">写文章</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import navLogo from 'assets/images/nav-logo.png'
import headerMenu from 'components/common/HeaderMenu'

export default {
  components: {
    headerMenu
  },
  data() {
    return {
      navLogo,
      drawerVisible: false
    }
  }
}
</script>

<style lang="less" scoped>
.header-top {
  height: 100%;
  overflow: hidden;

  &__logo {
    height: 36px;
    float: left;
    margin-right: 24px;

    img {
      height: 100%;
    }
  }

  &__opt {
    float: right;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 18px;
      background-color: #ddd;
      right: 46%;
      top: 36%;
    }
  }

  &__btns {
    border: 0;
    box-shadow: none;
    margin-left: 10px;
    background-color: @colorBg;
    font-weight: bold;

    &:hover {
      background-color: #e2e6ea;
      border-color: #dae0e5;
      color: #222;
    }
  }

  &__right {
    float: right;
    margin-right: 4px;
    text-align: right;
  }
}
</style>

<style lang="less">
.header-trigger__tab {
  .header-top__tab--item {
    display: block;
    border-bottom: 1px solid #eee;
  }
}

.header-top__tab {
  float: left;

  &--icon {
    margin-left: 2px;
    margin-right: 2px;
    font-size: 18px;
    vertical-align: text-bottom !important;
  }

  &--item {
    padding: 10px 15px;
    font-size: 16px;
    color: @colorText;
    border-radius: 4px;

    &:hover {
      background-color: #e2e6ea;
      color: @colorText;
    }
  }
}

.header-top__tab--item {
  &.nuxt-link-exact-active {
    color: @primary;
    background-color: transparent !important;
  }
}

.header-top__search {
  &.ant-input-affix-wrapper {
    transition: width 0.3s;
    width: 200px;
    margin-left: 16px;

    .ant-input {
      border-radius: 100px;
      padding-left: 20px;
      background-color: @colorBg;
    }
  }
}
</style>
