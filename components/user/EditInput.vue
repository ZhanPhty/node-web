<template>
  <div class="edit-box">
    <input
      ref="editInput"
      :placeholder="placeholder"
      v-model="inputVal"
      @focus="bindFocus"
      @blur="bindBlur"
    />
    <div class="edit-box-btns">
      <template v-if="isEdit">
        <a-button class="edit-box-btns__item" type="link" @click="bindSave">保存</a-button>
        <a-button class="edit-box-btns__item" type="link" @click="bindCancel">
          <span style="color: #666">取消</span>
        </a-button>
      </template>
      <a-button v-else class="edit-box-btns__item" type="link" icon="edit" @click="bindEdit">修改</a-button>
    </div>
  </div>
</template>

<script>
import { userCenterUpdate } from 'api/user'

export default {
  props: {
    placeholder: [String],
    name: {
      type: String,
      required: true
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isEdit: false,
      inputVal: this.defaultValue
    }
  },
  methods: {
    /**
     * input 获得焦点
     */
    bindFocus() {
      this.isEdit = true
    },

    /**
     * input 失去焦点
     */
    bindBlur(e) {
      const { value } = e.target
      if (value === this.defaultValue) {
        this.isEdit = false
      }
    },

    /**
     * 点击修改
     */
    bindEdit() {
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs.editInput.focus()
      })
    },

    /**
     * 取消
     */
    bindCancel() {
      this.inputVal = this.defaultValue
      this.isEdit = false
    },

    /**
     * 保存
     */
    bindSave() {
      if (this.inputVal !== this.defaultValue) {
        userCenterUpdate({
          field: this.name,
          value: this.inputVal
        })
          .then(res => {
            // 更新登录用户信息
            this.$store.commit('login/setUserInfo', { userInfo: res.data.data })
            this.isEdit = false
          })
          .catch(() => {
            this.$message.error('修改失败！')
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@btnHeight: 30px;

.edit-box {
  position: relative;

  & > input {
    display: block;
    width: 78%;
    line-height: @btnHeight;
  }

  &-btns {
    position: absolute;
    right: 0;
    top: 0;

    &__item {
      line-height: @btnHeight;
      height: @btnHeight;
      padding: 0 4px;
    }
  }
}
</style>
