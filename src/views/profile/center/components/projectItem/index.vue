<template>
  <div class="project-item">
    <a-card hoverable style="width: 300px">
      <img slot="cover" :alt="title" :src="coverSource" class="project-cover" />
      <template slot="actions" class="ant-card-actions">
        <a-tooltip>
          <template slot="title">设置</template>
          <a-icon key="setting" type="setting" />
        </a-tooltip>
        <a-tooltip>
          <template slot="title">编辑</template>
          <a-icon key="edit" type="edit" />
        </a-tooltip>
        <a-dropdown>
          <a-icon key="ellipsis" type="ellipsis" />
          <a-menu slot="overlay">
            <a-menu-item key="1">删除</a-menu-item>
            <a-menu-item key="2">编辑</a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
      <a-card-meta :title="title" :description="description">
        <a-avatar slot="avatar" :src="avatarSource" />
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: {
    title: {
      type: String,
      required: true
    },
    coverSource: {
      required: true
    },
    description: {
      type: String,
      required: true
    },
    avatarSource: {
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.project-cover {
    width: 298px;
    height: 128px;
}
</style>
