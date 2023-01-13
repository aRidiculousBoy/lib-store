<template>
  <div class="file" :title="name" :style="fileStyle" draggable="true" @contextmenu.prevent="handleContextMenu"
    @click="handleClick">
    <img :src="typeMapper[extension]" class="file-cover">
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
import folderSvg from '@/assets/svg/folder.svg'
import jpgSvg from '@/assets/svg/jpg.svg'
import mp3Svg from '@/assets/svg/mp3.svg'
import mp4Svg from '@/assets/svg/mp4.svg'
import pdfSvg from '@/assets/svg/pdf.svg'
import pngSvg from '@/assets/svg/png.svg'




const typeMapper = {
  'folder': folderSvg,
  '.jpg': jpgSvg,
  '.mp3': mp3Svg,
  '.mp4': mp4Svg,
  '.pdf': pdfSvg,
  '.png': pngSvg
}

export default {
  name: 'file',
  props: {
    // 文件类型 
    type: {
      type: String,
      validator(value) {
        if (!['file,folder'].includes(value)) {
          return new Error('type value should be in ["file","folder"]')
        }
      }
    },
    // 文件名称
    name: {
      type: String,
      required: true
    },
    // 创建日期
    createTime: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    extension: {
      type: String
    },
    size: {
      type: Number
    },
    fileId: {
      type: String
    }
  },
  data() {
    return {
      folderSvg,
      typeMapper,
      fileStyle: {}
    }
  },
  created() {
    const width = (parseInt(getComputedStyle(document.body).width) - 240) / 10
    this.fileStyle = {
      width: `${width}px`
    }
  },
  methods: {
    handleContextMenu(event) {
      this.$contextmenu({
        items: [
          {
            label: "下载",
            onClick: () => {
              this.handleDownLoad()
            },
            customClass: 'context-menu-item'
          },
          { label: "分享" },
          {
            label: "收藏",
            divided: true,
            customClass: 'context-menu-item'

          },
          {
            label: "重命名",
            onClick: () => {
              this.handleReanme()
            },
            customClass: 'context-menu-item'

          },
          {
            label: "移动",
            customClass: 'context-menu-item'
          },
          {
            label: "查看详细信息",
            divided: true,
            onClick: () => {
              this.handleViewDetails()
            },
            customClass: 'context-menu-item'
          },
          {
            label: "移动到回收站",
            onClick: () => {
              this.handleMoveBin()
            },
            customClass: 'context-menu-item'
          },
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "file-context-menu",
        zIndex: 3,
        minWidth: 180
      });
      return false;
    },
    handleClick() {
      const payload = {
        type: this.type,
        id: this.id
      }
      this.$emit('click', payload)
    },
    handleReanme() {
      const payload = {
        id: this.id,
        name: this.name,
        type: this.type
      }
      this.$emit('rename', payload)
    },
    handleViewDetails() {
      this.$emit('view', { ...this.$props, ...this.$attrs })
    },
    handleMoveBin() {
      const payload = {
        id: this.id,
        name: this.name,
        type: this.type
      }
      this.$emit('moveBin', payload)
    },
    handleDownLoad() {
      const payload = {
        type: this.type,
        id: this.fileId
      }
      this.$emit('download', payload)
    }
  }
}
</script>

<style scoped lang="less">
.file {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 12px;
  padding: 8px 0;

  &:hover {
    cursor: pointer;
    background-color: rgba(132, 133, 141, .08);
  }

  transition: all .2s linear;
}

.name {
  width: 100%;
  padding-top: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.file-cover {
  width: 64%;
  height: 108px;
}

/deep/.contextmenu_menu {
  padding: 12px !important;
}
</style>
