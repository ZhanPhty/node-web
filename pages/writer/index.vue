<template>
  <div class="writer-main">
    <a-input class="writer-main__title" maxlength="60" size="large" placeholder="请输入文章标题" />
    <div>
      <editor action="/blogapi/upload" />
    </div>

    <div>
      <!-- <a-upload
        multiple
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :action="`${baseUrl}/blogapi/upload`"
        supportServerRender
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload> -->
    </div>
  </div>
</template>

<script>
import editor from 'components/editor/Editor'

export default {
  components: {
    editor
  },
  data() {
    return {
      content: '',
      loading: false,
      imageUrl: '',
      baseUrl: process.env.VUE_APP_API
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
      } else if (info.file.status === 'done') {
        const { url } = info.file.response.data
        this.loading = false
        this.imageUrl = url
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.writer-main {
  margin-top: 30px;

  &__title {
    border-color: #fff;
    font-size: 18px;
    border-radius: 0;
  }
}
</style>
