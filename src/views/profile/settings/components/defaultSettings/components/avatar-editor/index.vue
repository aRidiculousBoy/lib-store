<template>
  <div class="avatar-editor">
    <a-modal v-model="visible" title="修改图像" :width="792" :footer="null">
      <div class="preview">
        <vueCropper ref="cropperRef" v-bind="cropper.option" style="width: 376px;height: 350px"
          @realTime="handleRealTime">
        </vueCropper>
        <div class="real-time">
          <a-avatar :src="avatarSrc" :size="208" />
        </div>
      </div>
      <div class="action">
        <div class="avatar-action">
          <a-space size="large">
            <a-upload name="file" :customRequest="handleUpload" :showUploadList="false" @change="handleChange">
              <a-button> <a-icon type="upload" />选择图片</a-button>
            </a-upload>
            <a-button icon="plus" @click="handleScale(1)"></a-button>
            <a-button icon="minus" @click="handleScale(-1)"></a-button>
            <a-button icon="undo" @click="handleRotateLeft"></a-button>
            <a-button icon="redo" @click="handleRotateRight"></a-button>
          </a-space>
        </div>
        <div class="save">
          <a-space>
            <a-button @click="handlePreview">预览</a-button>
            <a-button type="primary" @click="handleUploadAvatar" :loading="submitting">保存</a-button>
          </a-space>
        </div>
      </div>
    </a-modal>
    <div class="model" v-show="model">
      <div class="model-show" @click="model = false">
        <img :src="modelSrc" alt="" @click="model = false">
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { throttle } from 'lodash'

export default {
  name: 'avatar-editor',
  data() {
    return {
      visible: false,
      cropper: {
        option: {
          img: null,
          size: 1,
          outputType: 'png',
          canScale: true,
          autoCrop: true,
          full: true,
          original: false
        }
      },
      avatarSrc: null,
      model: false,
      modelSrc: null,
      file: null,
      callback: undefined,
      submitting: false
    }
  },
  components: {
    VueCropper
  },
  methods: {
    open(callback) {
      this.callback = callback
      this.clear()
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleUpload(file) {
    },
    handleUploadAvatar() {
      this.submitting = true
      this.$refs.cropperRef?.getCropBlob(data => {
        const file = new File([data], 'avatar')
        const payload = {
          file
        }
        this.$store.dispatch('user/uploadUserAvatar', payload).then(response => {
          this.callback && this.callback()
          this.$message.success('头像更新成功')
        }).finally(() => {
          this.submitting = false
          this.close()
        })
      })
    },
    handleChange(e) {
      const file = e.file.originFileObj
      if (this.cropper.option.img) {
        window.URL.revokeObjectURL(this.cropper.option.img)
      }
      this.cropper.option.img = window.URL.createObjectURL(file)
    },
    handleRealTime: throttle(function () {
      if (!this.cropper.option.img) {
        return false
      }
      this.$refs.cropperRef?.getCropBlob(data => {
        const binaryData = []
        binaryData.push(data)
        if (this.avatarSrc) {
          window.URL.revokeObjectURL(this.avatarSrc)
        }
        this.avatarSrc = window.URL.createObjectURL(new Blob(binaryData))
      })
    }, 100),
    handleScale(value) {
      this.$refs.cropperRef?.changeScale(value)
    },
    handleRotateLeft() {
      this.$refs.cropperRef?.rotateLeft()
    },
    handleRotateRight() {
      this.$refs.cropperRef?.rotateRight()
    },
    handlePreview() {
      if (!this.cropper.option.img) {
        return false
      }
      this.$refs.cropperRef?.getCropBlob(data => {
        const binaryData = []
        binaryData.push(data)
        if (this.modelSrc) {
          window.URL.revokeObjectURL(this.modelSrc)
        }
        this.modelSrc = window.URL.createObjectURL(new Blob(binaryData))
        this.model = true
      })
    },
    clear() {
      window.URL.revokeObjectURL(this.avatarSrc)
      window.URL.revokeObjectURL(this.cropper.option.img)
      window.URL.revokeObjectURL(this.modelSrc)
      this.cropper.option.img = null
      this.avatarSrc = null
      this.modelSrc = null
    }
  }
}
</script>

<style scoped lang="less">
.preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.real-time {
  flex: 1;
  text-align: center;

  /deep/ .ant-avatar {
    img {
      padding: 2px;
      border: 2px solid #e9e9e9;
      border-radius: 50%;
    }
  }
}

.action {
  display: flex;
  align-items: center;

  .avatar-action {
    flex: 1;
  }

  .save {
    flex: 1;
    text-align: center;
  }
}

.model {
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  width: auto;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}
</style>