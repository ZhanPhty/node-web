<template>
  <div class="page-container">
    <div class="ui-flex page-container-main">
      <div class="page-container-setting">
        <nuxt-link class="page-container-item" v-for="item in settingMenu" :key="item.path" :to="item.path">
          <a-icon :type="item.icon"></a-icon>
          <span>{{ item.title }}</span>
        </nuxt-link>
      </div>
      <div class="ui-flex__item page-container-info">
        <div v-if="title" class="page-container-title">{{ title }}</div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
const settingMenu = [
  { icon: 'idcard', title: '个人资料', path: '/user/setting' },
  { icon: 'lock', title: '修改密码', path: '/user/setting/password' }
]

export default {
  props: {
    title: [String]
  },
  data() {
    return {
      settingMenu
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  padding-bottom: @gap + 10;

  &-main {
    min-height: 66vh;
    margin-top: @gap + 10;
    border-radius: @radiusSmall;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    padding: 20px 24px;
  }

  &-setting {
    width: 160px;
    margin-right: 24px;
  }

  &-info {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &-title {
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 14px;
    border-bottom: 1px solid #eee;
  }

  &-item {
    color: #666;
    display: block;
    font-size: 16px;
    padding: 12px 20px;
    border-radius: @radiusSmall;

    &:hover {
      color: #007bff;
    }

    span {
      padding-left: 6px;
    }
  }
}
</style>

<style lang="less">
.page-container-setting {
  .nuxt-link-exact-active {
    color: #007bff;
    background-color: #f2f5f6;
  }
}

.page-container-info {
  .setting-info {
    &__item {
      border-bottom: 1px solid #eee;
      padding: 16px 0;

      &--label {
        min-width: 120px;
      }

      &--p {
        color: #666;
        min-height: 30px;
        line-height: 30px;
      }

      &--upload {
        display: inline-block;
        padding-left: 10px;
        vertical-align: top;

        p {
          color: #999;
          margin-bottom: 16px;
          line-height: 1.4;
        }
      }
    }
  }
}
</style>
