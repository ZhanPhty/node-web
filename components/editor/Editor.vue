<template>
  <div class="editor-main" :class="{ 'editor-main-full': fullEdit }">
    <div v-if="isFull" @click="bindFull">
      <i v-if="fullEdit" class="editor-icon">
        <svg
          viewBox="64 64 896 896"
          data-icon="fullscreen-exit"
          width="20px"
          height="20px"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"
          ></path>
        </svg>
      </i>
      <i v-else class="editor-icon">
        <svg
          viewBox="64 64 896 896"
          data-icon="fullscreen"
          width="20px"
          height="20px"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"
          ></path>
        </svg>
      </i>
    </div>
    <div
      ref="editorBox"
      class="editor-box typography-layout"
      :class="{ 'editor-box-full-icon': isFull }"
    ></div>
  </div>
</template>

<script>
import Edit from 'wangeditor'

const toolMenus = [
  'head',
  'bold',
  'italic',
  'underline',
  'strikeThrough',
  'foreColor',
  'backColor',
  'link',
  'list',
  'justify',
  'quote',
  'image',
  'table',
  'video',
  'code',
  'undo',
  'redo'
]

export default {
  props: {
    /**
     * 菜单工具栏
     */
    tools: {
      type: Array,
      default() {
        return toolMenus
      }
    },

    /**
     * 是否全屏
     */
    isFull: {
      type: Boolean,
      default: true
    },

    /**
     * 上传文件服务器接口url
     * 默认process.env.VUE_APP_API
     */
    baseUrl: {
      type: String,
      default: process.env.VUE_APP_API
    },

    /**
     * 上传接口
     */
    action: {
      type: String
    },

    /**
     * 最多上传图片张数
     * 默认1000张
     */
    maxLength: {
      type: Number,
      default: 1000
    },

    /**
     * 上传图片大小
     * 默认10M
     */
    size: {
      type: Number,
      default: 10 * 1024
    },

    /**
     * 上传参数
     * 上传图片时可自定义传递一些参数，参数会被添加到formdata中
     */
    params: {
      type: Object,
      default() {
        return {}
      }
    },

    /**
     * 上传文件名
     * formdata中的name属性
     */
    name: {
      type: String,
      default: 'file'
    },

    /**
     * 自定义 header
     */
    headers: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      editorContent: '',
      fullEdit: false,
      editor: null
    }
  },
  methods: {
    /**
     * 初始化编辑器
     * @link https://www.kancloud.cn/wangfupeng/wangeditor3/332599  # 文档
     * @link https://www.kancloud.cn/wangfupeng/wangeditor3/335782  # 图片上传
     */
    initEdit() {
      // 创建实例
      this.editor = new Edit(this.$refs.editorBox)

      this.editor.customConfig.onchange = html => {
        this.editorContent = html
      }

      // 工具菜单
      this.editor.customConfig.menus = this.tools

      // 图片上传配置
      this.action && (this.editor.customConfig.uploadImgServer = `${this.baseUrl}/${this.action}`)
      this.editor.customConfig.uploadImgMaxSize = this.size * 1024
      this.editor.customConfig.uploadImgMaxLength = this.maxLength
      this.editor.customConfig.uploadImgParams = this.params
      this.editor.customConfig.uploadFileName = this.name
      this.editor.customConfig.uploadImgHeaders = this.headers
      this.editor.customConfig.uploadImgHooks = {
        customInsert: (insertImg, result, editor) => {
          const { url } = result.data
          insertImg(url)
        }
      }

      this.editor.create()
    },

    /**
     * 全屏
     */
    bindFull() {
      this.fullEdit = !this.fullEdit
    }
  },
  mounted() {
    this.initEdit()
  }
}
</script>

<style lang="less">
@editHeight: 440px;

.editor-main {
  position: relative;
}

.editor-icon {
  position: absolute;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 7px 10px;
  z-index: 7;
  top: 6px;
  right: 4px;

  &:hover {
    color: @colorText;
  }
}

.editor-placeholder {
  padding-bottom: @editHeight - 0;
}

.editor-box {
  position: relative;
  height: 100%;
  text-align: left;
  z-index: 6;

  .w-e-toolbar {
    border: 0 !important;
    padding: 8px 4px;
    flex-wrap: wrap;

    .w-e-menu {
      line-height: 1;
      padding: 7px 10px;

      i {
        font-size: 16px;
      }
    }
  }

  .w-e-text-container {
    min-height: @editHeight;
    border-color: #f6f7f8 !important;
    background-color: #fff;
  }

  .w-e-text {
    padding: 10px;
    font-size: 16px;
  }
}

.editor-box-full-icon {
  .w-e-toolbar {
    padding-right: 56px;
  }
}

.editor-main-full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: #fff;

  .w-e-text-container {
    height: 100% !important;
    padding-bottom: 60px;
  }
}
</style>
