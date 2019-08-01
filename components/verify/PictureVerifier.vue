<template>
  <div class="ver-pic-box">
    <div :class="className" :style="{ height: `${height}px` }" @click="loadPicVer" v-html="svg" />
  </div>
</template>

<script>
import { getCaptcha } from 'api/common'

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    /**
     * 图片宽度
     */
    width: {
      type: Number,
      default: 120
    },
    /**
     * 图片高度
     */
    height: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      svg: ''
    }
  },
  mounted() {
    this.loadPicVer()
  },
  methods: {
    /**
     * [loadPicVer 加载验证图片]
     * @return
     */
    loadPicVer() {
      getCaptcha({
        width: this.width,
        height: this.height - 10
      })
        .then(res => {
          this.svg = res.data
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.ver-pic-box {
  cursor: pointer;
}
</style>
