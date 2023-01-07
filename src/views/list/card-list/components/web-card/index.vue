<template>
  <div clas="web-card">
    <a-card>
      <div class="web-info">
        <a-avatar :src="source" :size="avatarSize" :shape="type"></a-avatar>
        <div class="text">
          <div class="web-name">{{ name }}</div>
          <div class="web-desc">{{ description }}</div>
        </div>
      </div>
      <template slot="actions">
        <a-icon key="edit" type="edit" />
        <a-icon key="delete" type="delete" />
        <a-icon key="ellipsis" type="ellipsis" />
      </template>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'web-card',
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    avatarSize: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      validator(value) {
        if (!['circle', 'square'].includes(value)) {
          return "type value must be one of ['circle','square']"
        }
        return value
      },
      default: 'square'
    }
  }
}
</script>

<style scoped lang="less">
.web-info {
  display: flex;
}

.web-name {
  font-size: 16px;
  color: #000;
  transform: translateY(-6px);
}

.text {
  margin-left: 16px
}
/deep/ .ant-card-body {
  padding: 32px !important;
}
</style>
