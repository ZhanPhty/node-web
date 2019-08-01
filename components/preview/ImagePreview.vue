<template>
  <div class="img-preview">
    <div v-if="url" class="dialog-mask"></div>
    <transition name="dialog-fade">
      <div v-if="url" class="dialog-box" @click="handleClose">
        <div
          class="dialog-img-box"
          :style="{
            width: `${size.width}px`,
            height: `${size.height}px`,
            transform: `translate(-50%, -50%) scale(${size.scale})`
          }"
        >
          <img class="dialog-img" :src="url" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
/**
 * [computedSize 计算图片尺寸]
 * @param  {String} img [图片]
 * @return
 */
function computedSize(img) {
  const w = window

  const d = document

  const e = d.documentElement

  const g = d.getElementsByTagName('body')[0]

  const x = w.innerWidth || e.clientWidth || g.clientWidth

  const y = w.innerHeight || e.clientHeight || g.clientHeight

  const { width, height } = img

  // scale为图片的缩放比例
  // 先计算宽度比例，然后用宽度比例*图片高度去对比窗口y轴
  let scale = x / width
  scale = scale * height > y ? y / height : scale

  if (height < y && width < x) {
    // 图片原始宽高都小于窗口宽高时，缩放比例为1
    scale = 1
  }

  const size = {
    width,
    height,
    scale
  }
  return size
}

export default {
  name: 'ImagePreview',
  model: {
    prop: 'url'
  },
  props: {
    /**
     * 预览图片的url, 传值则弹出预览窗口
     */
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      size: {}
    }
  },
  watch: {
    url(val) {
      const img = new Image()
      img.src = val

      img.onload = () => {
        this.size = computedSize(img)
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', '')
      /**
       * 预览窗口关闭事件
       * @event close
       */
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
.img-preview {
  .dialog-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    height: 100%;
    z-index: 2100;
  }

  .dialog-box {
    position: fixed;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2200;
    outline: 0;
    cursor: zoom-out;
  }

  .dialog-img-box {
    position: relative;
    top: 50%;
    left: 50%;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    .dialog-img {
      width: 100%;
    }
  }

  // 弹窗过渡动画
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: scale(0.6);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fade-out {
    0% {
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(0.6);
    }
  }

  .dialog-fade-enter-active,
  .dialog-fade-leave-active {
    animation: fade-in 100ms linear;
  }

  .dialog-fade-leave,
  .dialog-fade-leave-to {
    animation: fade-out 300ms;
  }
}
</style>
