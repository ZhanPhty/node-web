<template>
  <div class="reg-mian">
    <a-form :form="formValid">
      <a-form-item>
        <a-input
          v-decorator="['account', { rules: [{ required: true, message: '请输入注册的用户名' }] }]"
          placeholder="请输入注册的用户名"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ type: 'email', message: '邮箱格式不正确' }, { required: true, message: '请输入邮箱' }]
            }
          ]"
          placeholder="请输入邮箱"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入6~30位的密码' },
                { min: 6, message: '密码长度6~30位' },
                { validator: validatePass }
              ]
            }
          ]"
          placeholder="请输入6~30位的密码"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [{ required: true, message: '请输入确认密码' }, { validator: validateEqualTo }]
            }
          ]"
          placeholder="请输入确认密码"
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
      <a-form-item class="reg-login">
        已有账号？
        <nuxt-link to="/login">去登陆</nuxt-link>
      </a-form-item>
      <a-form-item class="reg-btn">
        <a-button type="primary" block :loading="confirmLoad" @click="handleReg">
          注 册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { userRegister } from 'api/user'
import pictureVerifier from 'components/verify/PictureVerifier'

export default {
  layout: 'account',
  components: {
    pictureVerifier
  },
  data() {
    return {
      confirmDirty: false,
      formValid: this.$form.createForm(this),
      confirmLoad: false
    }
  },
  methods: {
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },

    /**
     * 验证密码
     */
    validatePass(rule, value, callback) {
      const form = this.formValid
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },

    /**
     * 检测2次密码是否一致
     */
    validateEqualTo(rule, value, callback) {
      const form = this.formValid
      if (value && value !== form.getFieldValue('password')) {
        callback(new Error('确认密码不一致'))
      } else {
        callback()
      }
    },

    /**
     * 提交注册
     */
    handleReg() {
      this.formValid.validateFields((err, values) => {
        if (!err) {
          const { password, confirm, ...vals } = values

          this.confirmLoad = true
          userRegister({
            ...vals,
            password: md5(password)
          })
            .then(res => {
              this.confirmLoad = false
              this.$message.success('注册成功, 现在可以登录了！')
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

.reg-login {
  color: #aaa;
}
</style>

<style lang="less">
.reg-login {
  .ant-form-item-control {
    line-height: 30px;
  }
}
</style>
