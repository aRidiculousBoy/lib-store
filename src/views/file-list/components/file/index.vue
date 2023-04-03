<template>
  <div class="file" :title="name" :style="fileStyle" draggable="true" @contextmenu.prevent="handleContextMenu"
    @click="handleClick">
    <img :src="snapshot || typeMapper[extension] || typeMapper.fallback" class="file-cover">
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>

export default {
  name: 'file',
  props: {
    // 文件类型 
    type: {
      type: String,
      validator(value) {
        if (!['file', 'folder'].includes(value)) {
          return new Error('type value should be in ["file","folder"]')
        }
        else {
          return value
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
    },
    collect: {
      type: Boolean,
      required: true
    },
    thumbnail: {
      type: String
    }
  },
  inject: ['typeMapper'],
  data() {
    return {
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
          {
            label: "分享",
            onClick: () => {
              this.handleShare()
            }
          },
          {
            label: "共享",
            onClick: () => {
              this.handleCoShare()
            }
          },
          {
            label: this.collect ? '取消收藏' : '收藏',
            divided: true,
            customClass: 'context-menu-item',
            onClick: () => [
              this.collect ? this.handleUnFavor() : this.handleFavor()
            ]
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
            customClass: 'context-menu-item',
            onClick: () => {
              this.handleMove()
            }
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
      const { type, id, extension, name, fileId } = this.$props
      const payload = {
        type,
        id,
        extension,
        name,
        fileId
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
        id: this.id,
        name: this.name + this.extension
      }
      this.$emit('download', payload)
    },
    handleShare() {
      const payload = {
        ...this.$props
      }
      this.$emit('share', payload)
    },
    handleMove() {
      const { id, name, type } = this.$props
      const payload = {
        id,
        name,
        type
      }
      this.$emit('move', payload)
    },
    handleCoShare() {
      const payload = {
        ...this.$props
      }
      this.$emit('coShare', payload)
    },
    handleFavor() {
      const payload = {
        id: this.id,
        type: this.type
      }
      this.$emit('favor', payload)
    },
    handleUnFavor() {
      const payload = {
        id: this.id,
        type: this.type
      }
      this.$emit('unFavor', payload)
    }
  },
  computed: {
    snapshot() {
      return this.thumbnail ? this.thumbnail : undefined
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
