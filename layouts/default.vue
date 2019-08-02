<template>
  <a-locale-provider :locale="locale">
    <a-layout class="page-content">
      <a-affix @change="handleNavAffix">
        <a-layout-header class="page-header" :class="isFixed ? 'page-header__fixed' : ''">
          <page-header theme="light" class="layout-content-mian__big" />
        </a-layout-header>
      </a-affix>
      <a-layout-content class="page-main">
        <div class="layout-content-mian">
          <nuxt />
        </div>
      </a-layout-content>
    </a-layout>
  </a-locale-provider>
</template>

<script>
import pageHeader from 'components/nav/PageHeader'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  components: {
    pageHeader
  },
  data() {
    return {
      locale: zhCN,
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
.page-content {
  .page-header {
    position: relative;
    z-index: 29;
    transition: ease-in-out 0.2s;
    padding: 0;
    line-height: 58px;

    &.page-header__fixed {
      box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 8px;
      background-color: #fff;
    }

    &:hover {
      .page-header__fixed;
    }
  }
}
</style>

<style lang="less">
.page-header__fixed {
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

.page-header {
  &:hover {
    .page-header__fixed;
  }
}
</style>
