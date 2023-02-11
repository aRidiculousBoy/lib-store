<template>
  <div class="avatar-editor">
    <a-modal v-model="visible" title="修改图像" :width="792" :footer="null">
      <div class="preview">
        <vueCropper ref="cropperRef" v-bind="cropper.option" class="cropper" @realTime="handleRealTime">
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
          <a-button type="primary">保存</a-button>
        </div>
      </div>
    </a-modal>
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
      avatarSrc: null
    }
  },
  components: {
    VueCropper
  },
  methods: {
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleUpload(file) {
    },
    handleChange(e) {
      const file = e.file.originFileObj
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = (event) => {
        const { result } = event.target
        this.cropper.option.img = result
      }
    },
    handleRealTime: throttle(function () {
      if (!this.cropper.option.img) {
        return false
      }
      this.$refs.cropperRef?.getCropBlob(data => {
        this.avatarSrc = URL.createObjectURL(data)
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
    }
  }
}
</script>

<style scoped lang="less">
.cropper {
  width: 376px;
  height: 350px;
}

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
</style>
