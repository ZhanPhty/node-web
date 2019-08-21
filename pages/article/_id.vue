<template>
  <div>
    <div class="article-main">
      <a-skeleton :loading="loading" :title="{ width: '50%' }" :paragraph="false" active>
        <h1 class="article-main__title">{{ detail.title }}</h1>
      </a-skeleton>
      <a-skeleton class="article-cover" :loading="loading" :paragraph="{ rows: 0 }" active avatar>
        <div class="ui-flex ui-flex__center">
          <a-avatar size="large" icon="user" class="article-cover__img" :src="detail.userInfo.cover" />
          <div class="ui-flex__item article-cover__name">
            <p>{{ detail.userInfo.nick }}</p>
            <div>
              <span>{{ detail.created | formatDate }}</span>
              <span>评论 {{ detail.review }}</span>
              <span>阅读 {{ detail.read }}</span>
              <span>喜欢 {{ detail.praise }}</span>
            </div>
          </div>
        </div>
      </a-skeleton>
      <a-skeleton class="article-cnt" :loading="loading" :title="false" :paragraph="{ rows: 10 }" active>
        <div class="article-cnt-work typography-layout">
          <div v-html="detail.content"></div>
        </div>
      </a-skeleton>
      <div class="ui-flex ui-flex__center article-category">
        <div class="ui-flex__item article-category-left">
          <span>分类: </span>
          <nuxt-link to="">{{ detail.category }}</nuxt-link>
        </div>
        <div>{{ detail.type }}</div>
      </div>
      <div class="article-action">
        <div class="article-action-tag">
          <ul class="article-action-item">
            <li v-for="(item, index) in detail.tags" :key="index">
              <a-icon type="tag" theme="filled" />
              <span style="margin-left: 4px">{{ item }}</span>
            </li>
            <li><a-icon type="tag" theme="filled" /><span style="margin-left: 4px">哈哈</span></li>
          </ul>
          <p class="article-action-date">
            <a-icon type="clock-circle" theme="filled" />
            <span v-if="detail.lastRevise > detail.created">
              编辑于: {{ detail.lastRevise | formatDate }}
            </span>
            <span v-else> 创建于: {{ detail.created | formatDate }} </span>
          </p>
        </div>
        <div class="ui-flex ui-flex__center">
          <div class="ui-flex__item article-action-keep">分享</div>
          <a-button class="article-action-btn" size="large" type="default">
            <a-icon type="heart" />
            <a-divider type="vertical" />
            <span>喜欢</span>
          </a-button>
        </div>
      </div>
    </div>
    <div class="article-main">
      <a-comment>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="游客"
        />
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" placeholder="写下你的评论"></a-textarea>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" type="primary">
              发送
            </a-button>
          </a-form-item>
        </div>
      </a-comment>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from 'api/article'

export default {
  data() {
    return {
      loading: true
    }
  },
  async asyncData({ params, error }) {
    const { id } = params

    try {
      const {
        data: { data }
      } = await getArticleDetail({ id })

      return { detail: data, loading: false }
    } catch (err) {
      error({ statusCode: 404, message: err.data.msg })
    }
  }
}
</script>

<style lang="less" scoped>
@pageGap: 40px;

.article-main {
  margin-top: 30px;
  background-color: #fff;
  padding: @pageGap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  &__title {
    word-break: break-word;
    font-size: 30px;
    font-weight: bold;
    line-height: 1.4;
    padding-bottom: 20px;
  }
}

.article-cover {
  margin-top: 20px;

  &__img {
    margin-right: 12px;
    border: 1px solid #eee;
  }

  &__name {
    font-size: 16px;
    span {
      margin-right: 16px;
      font-size: 12px;
      color: #b9bfc3;
    }
  }
}

.article-cnt {
  margin-top: 30px;
}

.article-category {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 13px;

  &-left {
    color: #b9bfc3;
  }
}

.article-action {
  border-top: 1px solid #eff3f5;
  margin: 0 -@pageGap;
  padding: 10px @pageGap 0 @pageGap;

  &-tag {
    position: relative;
    font-size: 13px;
    color: #b9bfc3;
    margin-bottom: 20px;
    min-height: 28px;
  }

  &-item {
    margin-right: 160px;

    li {
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 8px;
    }
  }

  &-date {
    position: absolute;
    right: 0;
    top: 0;
  }

  &-btn {
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 100px;
  }

  &-keep {
    margin-right: 40px;
  }
}
</style>

<style lang="less">
.article-cnt-work {
  font-size: 16px;
  line-height: 2;
}
</style>
