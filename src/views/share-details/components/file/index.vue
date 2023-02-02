<template>
  <div class="file" :title="originalName" :style="fileStyle" draggable="true" @contextmenu.prevent="handleContextMenu"
    @click="handleClick">
    <img :src="typeMapper[extension]" class="file-cover">
    <div class="name">{{ originalName }}</div>
  </div>
</template>

<script>
export default {
  name: 'file',
  inject: ['typeMapper'],
  props: {
    shareName: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    extension: {
      type: String,
    }
  },
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
  }
  ,
  methods: {
    handleClick() {

    },
    handleContextMenu() {

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
