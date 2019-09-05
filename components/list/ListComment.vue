<template>
  <div>
    <div class="ui-flex">
      <div class="comment-avatar">
        <a-avatar slot="avatar" icon="user" alt="游客" />
      </div>
      <div class="ui-flex__item">
        <a-textarea
          class="comment-textarea"
          autosize
          v-model="inputVal"
          @focus="bindFocus"
          @blur="bindBlur"
          placeholder="输入评论..."
        ></a-textarea>
        <div class="comment-send" v-show="sendShow">
          <a-button :loading="sendLoad" :disabled="sendDisabled" @click="bindSend" type="primary"
            >评价</a-button
          >
        </div>
      </div>
    </div>
    <div v-if="dataSource.length" class="comment-box">
      <template v-for="item in dataSource">
        <comment-item
          :key="item.id"
          :data-source="item"
          :target-id="item.id"
          :reply-user="item.userId"
          @send="bindSend"
        >
          <template v-for="sub in item.sub">
            <comment-item
              :key="sub.id"
              :data-source="sub"
              :target-id="item.id"
              :reply-user="sub.userId"
              @send="bindSend"
            />
          </template>
        </comment-item>
      </template>
    </div>
  </div>
</template>

<script>
import { putArticleComment, getCommentList } from 'api/article'
import commentItem from 'components/list/ListCommentItem'

export default {
  components: {
    commentItem
  },
  props: {
    detailId: [String]
  },
  data() {
    return {
      inputVal: '',
      dataSource: [],
      sendShow: false,
      sendDisabled: true,
      sendLoad: false,
      loading: false
    }
  },
  watch: {
    inputVal(val) {
      if (val !== '') {
        this.sendDisabled = false
      } else {
        this.sendDisabled = true
      }
    }
  },
  methods: {
    /**
     * 获得焦点
     */
    bindFocus() {
      this.sendShow = true
    },

    /**
     * 失去焦点
     */
    bindBlur(e) {
      const { value } = e.target
      if (value === '') {
        this.sendShow = false
      }
    },

    /**
     * 发送评论
     */
    bindSend(obj) {
      this.sendLoad = true
      putArticleComment(
        {
          id: this.detailId
        },
        {
          replyUser: obj.replyUser || '',
          targetId: obj.targetId || '',
          content: obj.value ? obj.value : this.inputVal
        }
      )
        .then(() => {
          this.sendLoad = false
          this.sendShow = false
          this.inputVal = ''
          this.loadComment()
        })
        .catch(() => {
          this.sendLoad = false
        })
    },

    /**
     * 加载评论列表
     */
    loadComment() {
      getCommentList({
        id: this.detailId
      })
        .then(res => {
          this.dataSource = res.data.data
        })
        .catch(() => {})
    }
  },
  mounted() {
    if (this.detailId) {
      this.loadComment()
    }
  }
}
</script>

<style lang="less" scoped>
.comment-avatar {
  padding-right: 12px;
  padding-top: 4px;
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

.comment-box {
  margin-top: 40px;
  padding-left: 30px;
  padding-right: 10px;
}
</style>
