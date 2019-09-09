<template>
  <page-setting title="修改密码">
    <ul class="setting-info">
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">旧密码</span>
        <div class="ui-flex__item setting-info__item--p">
          <input v-model="oldPw" type="text" placeholder="请输入原密码" />
        </div>
      </li>
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">新密码</span>
        <div class="ui-flex__item setting-info__item--p">
          <input v-model="newPw" type="text" placeholder="请输入新密码" />
        </div>
      </li>
      <li class="ui-flex ui-flex__center setting-info__item">
        <span class="setting-info__item--label">确认新密码</span>
        <div class="ui-flex__item setting-info__item--p">
          <input v-model="confirmPw" type="text" placeholder="确认新密码" />
        </div>
      </li>
    </ul>
    <div class="setting-info-btn">
      <a-button type="primary" @click="bindSavePw">保存修改</a-button>
    </div>
  </page-setting>
</template>

<script>
import md5 from 'js-md5'
import pageSetting from 'components/common/PageSetting'
import { userCenterReset } from 'api/user'

export default {
  components: {
    pageSetting
  },
  data() {
    return {
      oldPw: '',
      newPw: '',
      confirmPw: ''
    }
  },
  methods: {
    /**
     * 点击保存修改按钮
     */
    bindSavePw() {
      if (this.oldPw !== '' && this.newPw !== '' && this.confirmPw !== '' && this.newPw.length > 5) {
        if (this.newPw === this.confirmPw) {
          this.handleResetPw()
        } else {
          this.$message.error('新密码与确认密码不一致')
        }
      } else {
        this.$message.info('请输入密码，且不小于6位')
      }
    },

    /**
     * 请求接口，修改密码
     */
    handleResetPw() {
      userCenterReset({
        oldPassword: md5(this.oldPw),
        newPassword: md5(this.newPw)
      })
        .then(res => {
          this.$store.dispatch('login/handleClearLoginOut').then(() => {
            this.$message.success('密码修改成功，请重新登录')
            this.$router.push({
              path: '/'
            })
          })
        })
        .catch(err => {
          this.$message.error(err.data.msg)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.setting-info-btn {
  width: 100%;
  text-align: right;
  padding-top: 20px;
}

.setting-info__item--p {
  & > input {
    line-height: 30px;
    width: 80%;
  }
}
</style>
