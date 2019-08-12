<template>
  <a-row class="exception-main">
    <a-col :sm="24" :md="12">
      <div class="exception-cover">
        <img v-if="error.statusCode === 403" :src="cover403" />
        <img v-else-if="error.statusCode === 404" :src="cover404" />
        <img v-else :src="cover500" />
      </div>
    </a-col>
    <a-col :sm="24" :md="12">
      <div class="exception-content">
        <h1>{{ error.statusCode }}</h1>
        <p class="desc">
          <span v-if="error.statusCode === 403">抱歉，你无权访问该页面</span>
          <span v-else-if="error.statusCode === 404">抱歉，你访问的页面不存在</span>
          <span v-else>{{ error.message }}</span>
        </p>
        <a-button type="primary" @click="handleToHome">返回首页</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import cover403 from 'assets/images/403.svg'
import cover404 from 'assets/images/404.svg'
import cover500 from 'assets/images/500.svg'

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      cover403,
      cover404,
      cover500
    }
  },
  methods: {
    handleToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.exception-main {
  padding-top: 20%;
  padding-bottom: 30px;
  min-height: 74vh;

  .exception-cover {
    text-align: right;
    padding: 0 30px;

    img {
      height: 186px;
    }
  }

  .exception-content {
    text-align: left;
    padding: 0 30px;
    margin-top: 0;

    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: bold;
      font-size: 60px;
      line-height: 1;
    }

    .desc {
      margin-bottom: 16px;
      color: #999;
      font-size: 20px;
      line-height: 28px;
    }
  }
}

@media (max-width: 767px) {
  .exception-main {
    .exception-cover {
      text-align: center;
    }

    .exception-content {
      margin-top: 20px;
      text-align: center;

      h1 {
        font-size: 32px;
        margin-bottom: 12px;
      }

      .desc {
        font-size: 16px;
      }
    }
  }
}
</style>
