<template>
  <div class="safety-item">
    <div class="item">
      <div class="title">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
    </div>
    <div class="action">
      <a>修改</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafetyItem',
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.safety-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  .item {
    display: flex;
    flex-direction: column;
    .title {
        &:hover {
          color: #1890ff;
          cursor: pointer;
        }
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      margin-top: 8px;
    }
  }
  .action {
    margin-right: 24px;
  }
}
</style>
