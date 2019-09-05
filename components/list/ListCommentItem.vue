<template>
  <div class="ui-flex comment-list">
    <a-avatar slot="avatar" :src="dataSource.cover" icon="user" alt="游客" />
    <div class="ui-flex__item comment-list-box">
      <h5 class="comment-list__title">
        <span>
          {{ dataSource.nick }}
        </span>
        <a-tag v-if="dataSource.author" color="#ffa273" class="comment-list__author">作者</a-tag>
      </h5>
      <div class="comment-list__cnt">
        <label v-if="dataSource.status === '0'" class="comment-list__report">
          回复<span>
            {{ dataSource.parentNick }}
            <a-tag v-if="dataSource.parentAuthor" color="#ffa273" class="comment-list__author"
              >作者</a-tag
            ></span
          >：
        </label>
        {{ dataSource.content }}
      </div>
      <div class="comment-list__action">
        <span class="comment-list__date">{{ dataSource.created | formatDate }}</span>
        <div class="comment-list__opt">
          <span v-if="dataSource.sub && dataSource.sub.length > 0" @click="bindSee"
            >查看回复({{ dataSource.sub.length }})</span
          >
          <span @click="bindReply"><a-icon type="message" />回复</span>
        </div>
      </div>
      <div class="ui-flex__item comment-foot" v-if="isReply">
        <a-textarea
          class="comment-textarea"
          ref="inputText"
          autosize
          placeholder="输入评论..."
          v-model="inputVal"
          @blur="bindBlur"
        ></a-textarea>
        <div class="comment-send">
          <a-button :loading="sendLoad" @click="bindSendReply" type="primary">评价</a-button>
        </div>
      </div>
      <div class="comment-sub" v-if="fold">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Object,
      default() {
        return {}
      }
    },
    targetId: [String],
    replyUser: [String]
  },
  data() {
    return {
      fold: false,
      isReply: false,
      sendLoad: false,
      inputVal: ''
    }
  },
  methods: {
    /**
     * 查看回复
     */
    bindSee() {
      this.fold = !this.fold
    },

    /**
     * 展开回复输入框
     */
    bindReply() {
      if (!this.isReply) {
        this.isReply = true
        this.$nextTick(() => {
          this.$refs.inputText.focus()
        })
      } else {
        this.isReply = false
      }
    },

    /**
     * 失去焦点
     */
    bindBlur(e) {
      const { value } = e.target
      if (value === '' && this.isReply) {
        setTimeout(() => {
          this.isReply = false
        }, 10)
      }
    },

    /**
     * 发送回复
     */
    bindSendReply() {
      this.$emit('send', {
        targetId: this.targetId,
        replyUser: this.replyUser,
        value: this.inputVal
      })
      setTimeout(() => {
        this.inputVal = ''
        this.isReply = false
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
.comment-list {
  margin-bottom: 12px;

  &-box {
    margin-left: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
  }

  &__title {
    font-size: 14px;
    font-weight: normal;
  }

  &__author {
    line-height: 13px;
    font-size: 12px;
    height: 15px;
    padding: 0 2px;
    border-radius: 2px;
    margin-left: 2px;
  }

  &__report {
    color: #aaa;
    margin-top: 4px;

    span {
      padding-left: 4px;
      padding-right: 4px;
      color: #406599;
    }
  }

  &__cnt {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  &__action {
    position: relative;
    font-size: 12px;
    color: #8a9aa9;
  }

  &__opt {
    position: absolute;
    right: 0;
    top: 0;

    & > span {
      margin-left: 28px;
      cursor: pointer;
    }

    i {
      margin-right: 6px;
    }
  }

  &:last-child {
    margin-bottom: 0;

    .comment-list-box {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }
}

.comment-foot {
  background-color: #fafbfc;
  margin-top: 12px;
  padding: 12px;
}

.comment-sub {
  background-color: #fafbfc;
  margin-top: 12px;
  padding: 12px;

  .comment-foot {
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #eee;
  }
}

.comment-textarea {
  padding-top: 10px;
  padding-bottom: 10px;
  resize: none;

  &:focus {
    box-shadow: none;
  }
}

.comment-send {
  padding-top: 12px;
  text-align: right;

  button {
    min-width: 72px;
    height: 36px;
    line-height: 36px;

    &[disabled] {
      background-color: #47a0ff;
      border-color: #47a0ff;
      color: #dde7fa;
    }
  }
}
</style>
