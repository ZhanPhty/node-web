<template>
  <div class="reg-mian">
    <a-form :form="formValid">
      <a-form-item>
        <a-input
          v-decorator="['account', { rules: [{ required: true, message: '请输入用户名' }] }]"
          placeholder="请输入用户名"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入密码' }, { min: 6, message: '密码长度6~30位' }]
            }
          ]"
          placeholder="请输入密码"
          type="password"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'captcha',
            {
              rules: [{ required: true, message: '请输入图片验证码' }]
            }
          ]"
          placeholder="请输入验证码"
        />
        <div class="reg-verify">
          <picture-verifier ref="picVer" />
        </div>
      </a-form-item>
      <a-form-item class="reg-link">
        <nuxt-link to="/reg">账号注册</nuxt-link>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" block :loading="confirmLoad" @click="handleReg">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { mapActions } from 'vuex'
import pictureVerifier from 'components/verify/PictureVerifier'

export default {
  layout: 'account',
  components: {
    pictureVerifier
  },
  data() {
    return {
      formValid: this.$form.createForm(this),
      confirmLoad: false
    }
  },
  methods: {
    ...mapActions({
      bindLogin: 'login/handleUserLogin'
    }),

    /**
     * 提交注册
     */
    handleReg() {
      this.formValid.validateFields((err, values) => {
        if (!err) {
          const { password, ...vals } = values

          this.confirmLoad = true
          this.bindLogin({
            ...vals,
            password: md5(password)
          })
            .then(() => {
              this.confirmLoad = false
              this.$message.success('登录成功！')
              this.$router.push('/')
            })
            .catch(() => {
              this.confirmLoad = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-verify {
  position: absolute;
  right: 0;
  bottom: -8px;
  background-color: #f0f0f0;
}
</style>

<style lang="less">
.reg-link {
  .ant-form-item-control {
    line-height: 30px;
  }

  a {
    color: #8b8b8b;
  }
}
</style>
