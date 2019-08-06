<template>
  <div class="reg-content-mian">
    <a-form :form="formValid">
      <a-form-item v-bind="formItemLayout">
        <a-input
          v-decorator="['account', { rules: [{ required: true, message: '请输入注册的用户名' }] }]"
          placeholder="请输入注册的用户名"
        />
      </a-form-item>
      <!-- <a-form-item v-bind="formItemLayout" label="邮箱">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [{ type: 'email', message: '邮箱格式不正确' }, { required: true, message: '请输入邮箱' }]
            }
          ]"
          placeholder="请输入邮箱"
        />
      </a-form-item> -->
      <a-form-item v-bind="formItemLayout">
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
      <a-form-item v-bind="formItemLayout">
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
      <a-form-item v-bind="formItemLayout">
        <a-row :gutter="8">
          <a-col :span="16">
            <a-input
              v-decorator="[
                'captcha',
                {
                  rules: [{ required: true, message: '请输入图片验证码' }]
                }
              ]"
              placeholder="请输入验证码"
            />
          </a-col>
          <a-col :span="8">
            <picture-verifier ref="picVer" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <a-checkbox
          v-decorator="[
            'agreement',
            {
              rules: [{ required: true, message: '请输入阅读并勾选注册协议' }]
            }
          ]"
        >
          我已阅读并同意<a href="">《用户注册协议》</a>
        </a-checkbox>
      </a-form-item>
      <a-form-item class="reg-btn">
        <a-button type="primary" :loading="confirmLoad" @click="handleReg">
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
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 19 }
        }
      },
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
              console.log(res)
              console.log(md5(password))
              // this.$router.push(this.$config.homeName)
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

<style lang="less">
.reg-content-mian {
  width: 440px;
  margin: 50px auto 10px auto;

  .reg-btn {
    text-align: center;

    .ant-btn {
      min-width: 120px;
      margin-left: 20px;
    }
  }
}
</style>
