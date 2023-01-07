<template>
  <div class="binding-item">
    <a-avatar shape="square" :size="48" icon="user" />
    <a-divider type="vertical" dashed></a-divider>
    <div class="information">
      <div class="app-state">
        <div class="app-name">{{ app }}</div>
        <div class="binding-state">
          {{ `当前${bindingState ? '已' : '未'}绑定${app}账号` }}
        </div>
      </div>
      <a class="action">绑定</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BindingItem',
  props: {
    app: {
      required: true,
      type: String
    },
    bindingState: {
      required: true,
      type: Boolean
    }
  }
}
</script>

<style scoped lang="less">
.binding-item {
  display: flex;
  width: 100%;
  align-items: center;
}
.information {
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  padding: 16px 0;
  .app-name {
    &:hover {
      color: #1890ff;
      cursor: pointer;
    }
  }
  .binding-state {
    margin-top: 8px;
  }
  .app-state {
    display: flex;
    flex-direction: column;
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
