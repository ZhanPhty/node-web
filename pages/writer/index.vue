<template>
  <div class="writer-main">
    <div class="writer-main-layout">
      <a-input
        v-model="inputCount"
        :maxlength="maxlength"
        size="large"
        class="writer-main-title"
        placeholder="请输入文章标题"
      />
      <div class="writer-main-count">{{ inputCount.length || 0 }}<span>/</span>{{ maxlength }}</div>
      <editor action="/blogapi/upload" />
    </div>
    <a-row :gutter="20" class="writer-main-form">
      <a-form :form="form" @submit="handleSubmit">
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
              <a-input
                v-if="tagVisible"
                ref="inputTag"
                v-model="inputValue"
                type="text"
                :style="{ width: '110px' }"
                placeholder="请输入标签"
                maxlength="8"
                @change="handleInputChange"
                @blur="handleInputConfirm"
                @pressEnter="handleInputConfirm"
              />
              <a-button v-else type="dashed" @click="showInput"> <a-icon type="plus" /> 添加标签</a-button>
            </template>
            <p class="writer-main-tag__tip">最多添加5个标签</p>
          </a-form-item>
          <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="文章类型">
            <a-select
              v-decorator="['select', { rules: [{ required: true, message: '请选择文章类型' }] }]"
              placeholder="请选择文章类型"
            >
              <a-select-option value="china">
                China
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="博客分类">
            <a-select
              v-decorator="['select', { rules: [{ required: true, message: '请选择博客分类' }] }]"
              placeholder="请选择博客分类"
            >
              <a-select-option value="china">
                China
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="私密文章">
            <a-radio-group v-decorator="['radio-group']">
              <a-radio value="1">是</a-radio>
              <a-radio value="2">否</a-radio>
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
        <a-col :sm="24" :md="24" v-if="isSeo">
          <a-divider orientation="left" dashed><span style="color: #aaa">SEO优化</span></a-divider>
          <a-col :sm="24" :md="12">
            <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="Title">
              <a-input v-decorator="['radio-group']" placeholder="请输入博文的SEO标题" />
            </a-form-item>
            <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="Keywords">
              <a-input v-decorator="['radio-group']" placeholder="请输入博文的SEO关键词使用 ' , ' 分割" />
            </a-form-item>
            <a-form-item :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" label="Description">
              <a-input v-decorator="['radio-group']" placeholder="请输入博文的SEO描述" />
            </a-form-item>
          </a-col>
        </a-col>
      </a-form>
    </a-row>
    <a-affix :offsetBottom="0" class="writer-btns">
      <div class="layout-content-mian">
        <a-button class="writer-btns__item">保存草稿</a-button>
        <a-button class="writer-btns__item" type="primary">发布</a-button>
      </div>
    </a-affix>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import editor from 'components/editor/Editor'

export default {
  components: {
    editor
  },
  data() {
    return {
      // 标题统计字数
      maxlength: 100,
      inputCount: '',

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
      inputValue: '',

      // seo
      isSeo: false,

      // 上传图片
      baseUrl: process.env.VUE_APP_API,
      loading: false,
      imageUrl: '',
      tags: []
    }
  },
  methods: {
    ...mapActions({
      loadTypes: 'select/handleArticleTypes',
      loadCategory: 'select/handleArticleCategory',
      loadTags: 'select/handleArticleTag'
    }),

    /**
     * 删除tag
     */
    handleTagClose(removedTag) {
      console.log(removedTag)
      const tags = this.tags.filter(tag => tag !== removedTag)
      console.log(tags)
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
     *  更改input值
     */
    handleInputChange(e) {
      this.inputValue = e.target.value
    },

    /**
     * 提交tag
     */
    handleInputConfirm() {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        tagVisible: false,
        inputValue: ''
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
     * 提交
     */
    handleSubmit() {}
  },
  mounted() {
    this.loadTags()
    this.loadTypes()
    this.loadCategory()
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
