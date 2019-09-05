<template>
  <div>
    <div class="article-header media-header-tab" :class="{ 'article-header__ishead': isHead }">
      <span class="article-header-title"
        ><em v-if="detail.status === 'draft'">[草稿]</em>{{ detail.title }}</span
      >
    </div>
    <div class="article-main">
      <a-skeleton :loading="loading" :title="{ width: '50%' }" :paragraph="false" active>
        <h1 class="article-main__title">
          <em v-if="detail.status === 'draft'">[草稿]</em>{{ detail.title }}
        </h1>
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
          <a :href="`/blog?category=${detail.category}`" target="_blank">{{ detail.category }}</a>
        </div>
        <div class="article-category-right">
          {{
            types.filter(item => item.id === detail.type).length > 0 &&
              types.filter(item => item.id === detail.type)[0].name
          }}
          <a v-if="detail.type === 'copy'" :href="detail.typeUrl" target="_blank">{{
            detail.typeUrl || ''
          }}</a>
        </div>
      </div>
      <div class="article-action">
        <div class="article-action-tag">
          <ul class="article-action-item">
            <li v-for="(item, index) in detail.tags" :key="index">
              <a :href="`/search?tag=${item}`" target="_blank">
                <a-icon type="tag" theme="filled" />
                <span style="margin-left: 4px">{{ item }}</span>
              </a>
            </li>
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
          <div class="ui-flex__item article-action-keep">
            <span>分享</span>
            <a
              class="article-action-icon article-action-icon__weibo"
              target="_blank"
              :href="
                `https://service.weibo.com/share/share.php?title=${detail.title}+%23小辉哥个人博客%23&url=${qrcodeUrl}&appkey=1777849388`
              "
            >
              <a-icon type="weibo" />
            </a>
            <a
              class="article-action-icon article-action-icon__qq"
              target="_blank"
              :href="
                `https://connect.qq.com/widget/shareqq/index.html?title=小辉哥个人博客&desc=${detail.title}&url=${qrcodeUrl}`
              "
            >
              <a-icon type="qq" />
            </a>
            <a-popover>
              <template slot="content">
                <qrcode-vue :value="qrcodeUrl" :size="138" level="H" :alt="qrcodeUrl" />
                <p style="font-size: 12px; color: #999; text-align: center">微信里点“发现”，扫一下</p>
              </template>
              <div class="article-action-icon article-action-icon__wechat">
                <a-icon type="wechat" />
              </div>
            </a-popover>
          </div>
          <a-button
            class="article-action-btn"
            :class="{ 'article-action-link': detail.isPraise }"
            size="large"
            type="default"
            @click="bindChangeLike(detail.isPraise, detail.id)"
          >
            <a-icon type="heart" :theme="detail.isPraise ? 'filled' : 'outlined'" />
            <a-divider type="vertical" />
            <span>喜欢</span>
          </a-button>
        </div>
      </div>
    </div>
    <div class="article-main">
      <list-comment :detail-id="detail.id" />
    </div>
  </div>
</template>

<script>
import qrcodeVue from 'qrcode.vue'
import { getArticleDetail, putArticleLike, delArticleLike } from 'api/article'
import listComment from 'components/list/ListComment'

export default {
  components: {
    qrcodeVue,
    listComment
  },
  head() {
    return {
      title: (this.detail.seo && this.detail.seo.title) || this.detail.title || '小辉哥博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            (this.detail.seo && this.detail.seo.description) ||
            `詹小辉官方网站,原创教程、Vue开发、前端技术、行业经验、软件分享、生活摄影,这是一个分享技术的个人平台！`
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            (this.detail.seo && this.detail.seo.keywords) ||
            `詹小辉博客,uizph,前端技术,zph,designer,web,前端开发,原创作品,经验分享,${this.detail.tags.toString()}`
        }
      ]
    }
  },
  data() {
    return {
      isHead: false,
      headTop: 0,
      loading: true,
      isLink: false,
      types: [{ name: '原创文章', id: 'original' }, { name: '转载于：', id: 'copy' }]
    }
  },
  async asyncData({ params, error }) {
    const { id } = params

    try {
      const {
        data: { data }
      } = await getArticleDetail({ id })

      return {
        detail: data,
        loading: false,
        qrcodeUrl: window.location.href
      }
    } catch (err) {
      error({ statusCode: 404, message: err.data.msg })
    }
  },
  methods: {
    /**
     * 监控滚动
     */
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const scroll = scrollTop - this.headTop
      this.headTop = scrollTop

      if (scrollTop > 130 && scroll > 0) {
        this.isHead = true
      } else {
        this.isHead = false
      }
    },

    /**
     * 点赞、取消点赞
     */
    async bindChangeLike(status, id) {
      if (status) {
        await delArticleLike({ id })
          .then(res => {
            console.log(res)
          })
          .catch(() => {})
      } else {
        await putArticleLike({ id })
          .then(res => {
            console.log(res)
          })
          .catch(() => {})
      }
      getArticleDetail({ id })
        .then(res => {
          this.detail = res.data.data
        })
        .catch(() => {})
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less" scoped>
@pageGap: 40px;

em {
  color: #f50;
  margin-right: 10px;
}

.article-header {
  opacity: 0;
  height: 60px;
  line-height: 60px;
  position: fixed;
  left: 86px;
  right: 0;
  top: 0;
  font-size: 20px;
  font-weight: bold;
  padding-right: 96px;
  padding-left: 10px;
  text-align: center;
  z-index: -1;
  background-color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.4s;

  &-title {
    position: relative;
    top: -100px;
    transition: all 0.4s;
  }

  &__ishead {
    opacity: 1;
    z-index: 50;

    .article-header-title {
      top: 0;
    }
  }
}

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

  &-right {
    color: #a1a6a9;
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

      a {
        color: #b9bfc3;
      }
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

  &-link {
    border-color: @primary;
    background-color: @primary;
    color: #fff;
  }

  &-keep {
    margin-right: 40px;

    & > span {
      display: inline-block;
      line-height: 50px;
      margin-right: 12px;
    }
  }

  &-icon {
    display: inline-block;
    height: 50px;
    width: 50px;
    line-height: 44px;
    border-radius: 100px;
    text-align: center;
    border: 1px solid #eee;
    margin-right: 6px;
    transition: all 0.3s;

    i {
      font-size: 24px;
      vertical-align: middle;
    }

    &__weibo {
      color: #d14744;

      &:hover {
        border-color: #d14744;
        background-color: #d14744;
        color: #fff;
      }
    }

    &__wechat {
      color: #54b743;

      &:hover {
        border-color: #54b743;
        background-color: #54b743;
        color: #fff;
      }
    }

    &__qq {
      color: #56b6e7;

      &:hover {
        border-color: #56b6e7;
        background-color: #56b6e7;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="less">
.article-cnt-work {
  font-size: 16px;
  line-height: 2;
}
</style>
