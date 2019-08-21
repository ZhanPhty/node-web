<template>
  <div class="writer-main">
    <div class="writer-main-layout">
      <a-input
        v-model="inputTitle"
        :maxlength="maxlength"
        size="large"
        class="writer-main-title"
        placeholder="请输入文章标题"
      />
      <div class="writer-main-count">{{ inputTitle.length || 0 }}<span>/</span>{{ maxlength }}</div>
      <editor v-model="inputContent" action="/blogapi/upload" />
    </div>
    <a-row :gutter="20" class="writer-main-form">
      <a-form :form="form">
        <a-col :sm="24" :md="12">
          <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="文章标签">
            <template v-for="tag in tags">
              <a-tag
                :key="tag"
                closable
                :afterClose="() => handleTagClose(tag)"
                class="writer-main-tag__item"
              >
                {{ tag }}
              </a-tag>
            </template>
            <template v-if="tags.length < 5">
              <a-auto-complete
                v-if="tagVisible"
                ref="inputTag"
                v-model="inputTags"
                style="width: 110px"
                placeholder="请输入标签"
                :dataSource="articleTag"
                :defaultActiveFirstOption="false"
                @blur="handleInputConfirm"
              >
                <a-input maxlength="8" />
              </a-auto-complete>
              <a-button v-else type="dashed" @click="showInput"> <a-icon type="plus" /> 添加标签</a-button>
            </template>
            <p class="writer-main-tag__tip">最多添加5个标签</p>
          </a-form-item>
          <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="文章类型">
            <a-select
              v-decorator="['type', { rules: [{ required: true, message: '请选择文章类型' }] }]"
              placeholder="请选择文章类型"
            >
              <a-select-option v-for="item in articleTypes" :key="item.identify">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="博客分类">
            <a-select
              v-decorator="['category', { rules: [{ required: true, message: '请选择博客分类' }] }]"
              placeholder="请选择博客分类"
              allowClear
              showSearch
            >
              <a-select-option v-for="item in articleCategory" :key="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="私密文章">
            <a-radio-group v-decorator="['isPrivate', { initialValue: false }]">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
            <div class="writer-main-seo" @click="isSeo = !isSeo">高级设置</div>
          </a-form-item>
        </a-col>
        <a-col :sm="24" :md="12">
          <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="上传封面">
            <a-upload-dragger
              listType="picture-card"
              class="writer-main-uploader"
              :showUploadList="false"
              :action="`${baseUrl}/blogapi/upload`"
              supportServerRender
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload-dragger>
            <p class="writer-main-tag__tip">建议图片尺寸：150 * 100</p>
          </a-form-item>
        </a-col>
        <a-col v-if="isSeo" :sm="24" :md="24">
          <a-divider orientation="left" dashed><span style="color: #aaa">SEO优化</span></a-divider>
          <a-col :sm="24" :md="12">
            <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="Title">
              <a-input v-decorator="['title']" placeholder="请输入博文的SEO标题" />
            </a-form-item>
            <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="Keywords">
              <a-input v-decorator="['keywords']" placeholder="请输入博文的SEO关键词使用 ' , ' 分割" />
            </a-form-item>
            <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="Description">
              <a-input v-decorator="['description']" placeholder="请输入博文的SEO描述" />
            </a-form-item>
          </a-col>
        </a-col>
      </a-form>
    </a-row>
    <a-affix :offsetBottom="0" class="writer-btns">
      <div class="layout-content-mian">
        <a-button class="writer-btns__item" :loading="confirmLoading" @click="handleSubmit('draft')"
          >保存草稿</a-button
        >
        <a-button
          class="writer-btns__item"
          :loading="confirmLoading"
          type="primary"
          @click="handleSubmit('online')"
          >发布</a-button
        >
      </div>
    </a-affix>
  </div>
</template>

<script>
import editor from 'components/editor/Editor'
import { publishArticles } from 'api/article'

export default {
  components: {
    editor
  },
  data() {
    return {
      // 标题统计字数
      maxlength: 100,
      inputTitle: '',
      inputContent: '',

      // form表单
      form: this.$form.createForm(this),
      labelCol: {
        sm: { span: 3 },
        md: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 21 },
        md: { span: 18 }
      },
      tagVisible: false,
      inputTags: '',
      confirmLoading: false,

      // seo
      isSeo: false,

      // 上传图片
      baseUrl: process.env.VUE_APP_API,
      loading: false,
      imageUrl: '',
      tags: []
    }
  },
  async asyncData({ store, error }) {
    try {
      const articleTypes = await store.dispatch('select/handleArticleTypes')
      const articleCategory = await store.dispatch('select/handleArticleCategory')
      const articleTag = await store.dispatch('select/handleArticleTag')

      return {
        articleTypes,
        articleCategory,
        articleTag
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  methods: {
    /**
     * 删除tag
     */
    handleTagClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.tags = tags
    },

    // 显示input
    showInput() {
      this.tagVisible = true
      this.$nextTick(() => {
        this.$refs.inputTag.focus()
      })
    },

    /**
     * 提交tag
     */
    handleInputConfirm() {
      const inputTags = this.inputTags
      let tags = this.tags
      if (inputTags && tags.indexOf(inputTags) === -1) {
        tags = [...tags, inputTags]
      }
      Object.assign(this, {
        tags,
        tagVisible: false,
        inputTags: ''
      })
    },

    /**
     * 上传封面图
     */
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
      } else if (info.file.status === 'done') {
        const { url } = info.file.response.data
        this.loading = false
        this.imageUrl = url
      } else {
        this.loading = false
      }
    },

    /**
     * 点击提交按钮
     * @param {String} status     文章状态草稿-‘draft’、上线-‘online’
     */
    handleSubmit(status) {
      this.form.validateFields((err, values) => {
        if (this.inputTitle === '' || this.inputContent === '') {
          return this.$message.error('文章标题或内容不能为空')
        }
        if (!err) {
          const { title, keywords, description, ...vals } = values
          const resultParam = {
            ...vals,
            title: this.inputTitle,
            content: this.inputContent,
            tags: this.tags,
            cover: this.imageUrl,
            status,
            seo: {
              title,
              keywords,
              description
            }
          }
          this.confirmLoading = true
          this.handleCreate(resultParam)
        }
      })
    },

    /**
     * 发布文章
     */
    handleCreate(vals) {
      publishArticles(vals)
        .then(res => {
          const { id } = res.data.data
          this.inputTitle = ''
          this.inputContent = ''
          this.tags = []
          this.form.resetFields()
          this.confirmLoading = false

          this.$confirm({
            title: `${vals.status === 'online' ? '发布' : '保存'}成功！`,
            content: `文章${vals.status === 'online' ? '发布' : '保存'}成功，你可以继续发布或预览文章~`,
            okText: '预览文章',
            cancelText: '继续发布',
            onOk: () => {
              this.$router.push({
                path: `/article/${id}`
              })
            },
            onCancel: () => {}
          })
        })
        .catch(() => {
          this.confirmLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.writer-main {
  margin-top: 30px;
  padding-bottom: 30px;

  &-layout {
    position: relative;
  }

  &-form {
    margin-top: 30px;
  }

  &-count {
    font-size: 18px;
    position: absolute;
    top: 0;
    line-height: 52px;
    right: 10px;
  }

  &-title {
    border-color: #fff;
    font-size: 18px;
    border-radius: 0;
    padding-right: 90px;
  }

  &-tag {
    &__item {
      line-height: 40px;
      height: 44px;
      padding: 0 12px;
      font-size: 14px;
    }

    &__tip {
      font-size: 13px;
      color: #aaa;
      line-height: 1;
      margin-top: 12px;
    }
  }

  &-seo {
    float: right;
    color: @primary;
    cursor: pointer;
  }

  &-uploader {
    display: inline-block;
    overflow: hidden;
    width: 300px;
    height: 200px;

    img {
      height: 198px;
      object-fit: cover;
      width: 100%;
    }
  }
}

.writer-btns {
  width: 100%;
  bottom: 0;
  right: 0;
  height: 64px;
  line-height: 64px;
  text-align: center;
  margin-top: 10px;

  &__item {
    margin-left: 20px;
    min-width: 120px;
  }
}
</style>

<style lang="less">
.writer-main-uploader {
  .ant-upload.ant-upload-drag .ant-upload {
    padding: 0;
  }
}

.writer-btns {
  .ant-affix {
    left: 0 !important;
    width: 100% !important;
    background-color: #fff;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.03);
  }
}
</style>
