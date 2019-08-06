<template>
  <a-layout class="account-content">
    <a-layout-content class="account-main">
      <div class="account-layout">
        <div class="account-layout-logo">
          <nuxt-link class="account-layout-logo__img" to="/">
            <img :src="navLogo" alt="小灰哥" />
          </nuxt-link>
          <p class="account-layout-logo__hd">
            <span>Ant Design</span>
            <span class="account-layout-logo__tip">爱生活，爱摄影</span>
          </p>
        </div>
        <nuxt />
      </div>
    </a-layout-content>
    <a-layout-footer class="account-footer">
      <page-footer theme="light" class="layout-content-mian" />
      <page-global />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import pageFooter from 'components/common/PageFooter'
import pageGlobal from 'components/common/PageGlobal'
import navLogo from 'assets/images/nav-logo.png'

export default {
  components: {
    pageFooter,
    pageGlobal
  },
  data() {
    return {
      navLogo
    }
  }
}
</script>

<style lang="less" scoped>
.account-content {
  height: 100vh;
  width: 100%;
  min-height: 100%;
  background-image: url('../assets/images/login-bg.svg');
  background-size: 100%;
}

.account-footer {
  text-align: center;
}

.account-layout {
  padding-top: 100px;
}

.account-layout-logo {
  text-align: center;

  &__img {
    height: 62px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 10px;
    margin-right: 24px;

    img {
      height: 100%;
    }
  }

  &__hd {
    font-size: 36px;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }

  &__tip {
    display: block;
    font-size: 13px;
    color: #9b9b9b;
  }
}
</style>
