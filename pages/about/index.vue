<template>
  <div class="error-box">
    <img :src="cover404" />
    <p>开发中...</p>
  </div>
</template>

<script>
import cover404 from 'assets/images/404.svg'

export default {
  data() {
    return {
      cover404
    }
  }
}
</script>

<style lang="less" scoped>
.error-box {
  padding-top: 120px;
  padding-bottom: 30px;
  text-align: center;

  img {
    height: 200px;
    margin-bottom: 20px;
  }

  p {
    color: #c1c8d2;
    font-size: 16px;
    margin-top: 20px;
  }
}
</style>