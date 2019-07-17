<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">node</h1>
      <h2 class="subtitle">
        My sublime Nuxt.js project
        <span v-html="img"></span>
      </h2>
      <div class="links">
        <a-button @click="onReg">注册</a-button>
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  components: {
    Logo
  },
  asyncData(context) {
    return axios.post(`/api/blogapi/login`).then(res => {
      return { img: res.data }
    })
  },
  methods: {
    onReg() {
      console.log('点击了注册')
      axios
        .post(`/api/blogapi/reg`, {
          account: 'test',
          password: '111111',
          captcha: '4fmc',
          email: '2323@qq.com',
          nick: '小辉哥'
        })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
