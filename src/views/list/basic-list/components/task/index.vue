<template>
  <div class="task-card">
    <div class="task-main">
      <div class="task-cover">
        <a-avatar :src="cover" :size="64" shape="square"></a-avatar>
      </div>
      <div class="title">
        <a-space direction="vertical" size="middle">
          <a class="task-name">{{ name }}</a>
          <div class="desc">{{ desc }}</div>
        </a-space>
      </div>
    </div>
    <a-space size="large">
      <div class="response-user desc-item">
        <a-space direction="vertical" size="middle">
          <div class="response-title">负责人</div>
          <div class="user">{{ responseUser }}</div>
        </a-space>
      </div>
      <div class="start-time desc-item">
        <a-space direction="vertical" size="middle">
          <div class="time-title">开始时间</div>
          <div class="time">{{ startTime }}</div>
        </a-space>
      </div>
      <div class="task-progress" style="width: 196px">
        <a-progress :percent="progress" />
      </div>
      <div class="actions desc-item">
        <a-space size="small">
          <a @click="edit">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              更多
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">编辑</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-space>
      </div>
    </a-space>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: {
    cover: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    responseUser: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      validator(value) {
        if (value > 100 || value < 0) {
          return 'progress is out of bound'
        }
        return value
      }
    }
  },
  methods: {
    edit() {
      this.$emit('edit', {
        ...this.$props
      })
    }
  }
}
</script>

<style scoped lang="less">
.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px;

  &:first-child {
    padding-top: 0px;
  }
}

.task-main {
  display: flex;

  .title {
    margin-left: 16px;
  }
}

.desc-item {
  padding: 4px 20px;
}
</style>
