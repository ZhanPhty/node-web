<template>
  <page-setting title="个人资料">
    <ul class="setting-info">
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">头像</span>
        <div class="ui-flex__item setting-info__item--p">
          <a-avatar shape="square" :size="70" icon="user" :src="userInfo.cover" />
          <div class="setting-info__item--upload">
            <p>支持 gif、jpg、png 格式，大小 2M 以内的图片</p>
            <a-upload
              accept="image/png, image/jpeg, image/gif, image/jpg"
              :showUploadList="false"
              :action="`${baseUrl}/blogapi/upload`"
              :data="{ dir: 'avatar/' }"
              supportServerRender
              :beforeUpload="bindBeforeUpload"
              @change="handleChangeUpload"
            >
              <a-button type="primary" :loading="loading" size="small">上传头像</a-button>
            </a-upload>
          </div>
        </div>
      </li>
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">昵称</span>
        <div class="ui-flex__item setting-info__item--p">
          <edit-input placeholder="填写昵称" name="nick" :default-value="userInfo.nick" />
        </div>
      </li>
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">邮箱</span>
        <div class="ui-flex__item setting-info__item--p">
          {{ userInfo.email || '-' }}
        </div>
      </li>
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">简介</span>
        <div class="ui-flex__item setting-info__item--p">
          <edit-input placeholder="填写个人简介" name="summary" :default-value="userInfo.summary" />
        </div>
      </li>
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">手机号</span>
        <div class="ui-flex__item setting-info__item--p">
          <edit-input placeholder="填写手机号" name="phone" :default-value="userInfo.phone" />
        </div>
      </li>
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">个人主页</span>
        <div class="ui-flex__item setting-info__item--p">
          <edit-input placeholder="填写个人主页" name="web" :default-value="userInfo.web" />
        </div>
      </li>
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">最后登录时间</span>
        <div class="ui-flex__item setting-info__item--p">
          {{ userInfo.lastLogin | formatDate }}
        </div>
      </li>
    </ul>
  </page-setting>
</template>

<script>
import pageSetting from 'components/common/PageSetting'
import editInput from 'components/user/EditInput'
import { userCenterInfo, userCenterUpdate } from 'api/user'

export default {
  components: {
    pageSetting,
    editInput
  },
  data() {
    return {
      // 上传图片
      baseUrl: process.env.VUE_APP_API,
      loading: false,
      userInfo: {},
      // 文件大小2M
      fileSize: 2
    }
  },
  async asyncData({ error }) {
    try {
      const {
        data: { data }
      } = await userCenterInfo()

      return {
        userInfo: data
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  methods: {
    /**
     * 上传前的回调
     */
    bindBeforeUpload(file) {
      if (file.size / 1024 / 1024 > this.fileSize) {
        this.$message.error('图片不能大于 2M')
        return false
      }
    },

    /**
     *  上传头像
     */
    handleChangeUpload(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
      } else if (info.file.status === 'done') {
        const { url } = info.file.response.data
        this.loading = false
        // 请求接口
        this.handleUpdateInfo(url)
      } else {
        this.loading = false
      }
    },

    /**
     * 请求接口，提交头像
     */
    handleUpdateInfo(url) {
      userCenterUpdate({
        field: 'cover',
        value: url
      })
        .then(res => {
          // 更新登录用户信息
          this.$store.commit('login/setUserInfo', { userInfo: res.data.data })
          this.userInfo = res.data.data
        })
        .catch(() => {
          this.$message.error('修改失败！')
        })
    }
  }
}
</script>
