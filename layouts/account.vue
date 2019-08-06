<template>
  <a-layout class="account-content">
    <a-layout-content class="layout-content-mian">
      <div class="account-layout">
        <div class="account-layout-logo">
          <nuxt-link to="/">
            <div class="account-layout-logo__img">
              <img :src="navLogo" alt="小灰哥" />
            </div>
            <p class="account-layout-logo__hd">
              <span>WEB Design</span>
              <span class="account-layout-logo__tip">爱生活，爱摄影</span>
            </p>
          </nuxt-link>
        </div>
        <div class="account-layout-cnt">
          <nuxt />
        </div>
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
  min-height: 100vh;
  width: 100%;
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
    color: @colorText;
    font-size: 32px;
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

.account-layout-cnt {
  width: 440px;
  background-color: #fff;
  margin: 30px auto 20px auto;
  padding: 30px 40px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}
</style>

<style lang="less">
.account-layout-cnt {
  .ant-input {
    border: 0;
    border-bottom: 1px solid #e5e5e5;
    border-radius: 0;
    box-shadow: none !important;
  }
}
</style>
