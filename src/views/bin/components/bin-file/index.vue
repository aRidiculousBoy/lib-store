<template>
  <div class="bin-file" :title="name" :style="fileStyle" draggable="true" @contextmenu.prevent="handleContextMenu">
    <img :src="typeMapper[extension]" class="file-cover">
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
// 待优化... 有问题
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
    // 删除日期
    deleteTime: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    extension: {
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
            label: "查看详细信息",
            onClick: () => {
              this.handleViewDetails()
            }
          }
          ,
          {
            label: "恢复",
            onClick: () => {
              this.handleRecover()
            }
          },
          {
            label: "彻底删除",
            onClick: () => {
              this.handleDelete()
            }
          },
        ],
        customClass: "custom-class",
        event,
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
    handleDelete() {
      const { id, type } = this.$props
      const payload = {
        id,
        type,
        isPhysical: true,
      }
      this.$emit('delete', payload)
    },
    handleRecover() {
      const { id, type } = this.$props
      const payload = {
        id,
        type
      }
      this.$emit('recover', payload)
    },
    handleViewDetails() {
      const payload = {
        ...this.$props
      }
      this.$emit('view', payload)
    }
  }
}
</script>

<style scoped lang="less">
.bin-file {
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
</style>
<style>
.custom-class .menu_item:nth-child(2) {
  color: red;
}
</style>