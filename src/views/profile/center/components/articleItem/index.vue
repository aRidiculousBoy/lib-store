<template>
  <div class="article">
    <a-card :bordered="false">
      <p>{{ title }}</p>
      <div class="desc-tags">
        <a-tag v-for="tag in descTags" :key="tag">{{ tag }}</a-tag>
      </div>
      <p class="description">{{ description }}</p>
      <div class="publish-info">
        <a-space>
          <a-avatar :size="32" :src="cover"></a-avatar>
          <a>{{ author }}</a>
          <span>发布在</span>
          <a>{{ url }}</a>
          <span>{{ publishDate }}</span>
        </a-space>
      </div>
      <div class="action">
        <span class="action-item">
          <a-space>
            <a-icon type="star"></a-icon>
            <span>{{ star }}</span>
          </a-space>
        </span>
        <a-divider type="vertical" />

        <span class="action-item">
          <a-space>
            <a-icon type="like"></a-icon>
            <span>{{ like }}</span>
          </a-space>
        </span>
        <a-divider type="vertical" />

        <span class="action-item">
          <a-space>
            <a-icon type="paper-clip"></a-icon>
            <span>{{ comment }}</span>
          </a-space>
        </span>
      </div>
      <a-divider />
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    title: {
      required: true,
      type: String
    },
    descTags: {
      required: true,
      type: Array
    },
    description: {
      required: true,
      type: String
    },
    author: {
      required: true,
      type: String
    },
    url: {
      required: true,
      type: String
    },
    publishDate: {
      required: true,
      type: String
    },
    star: {
      required: true,
      type: Number
    },
    like: {
      required: true,
      type: Number
    },
    comment: {
      required: true,
      type: Number
    },
    cover: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped lang="less">
/deep/.ant-card-body {
  padding: 0;
}
.description {
  padding: 6px 0;
}
.publish-info {
  padding-bottom: 12px;
}

.action-item:hover {
  cursor: pointer;
  color: #4298f2;
}
</style>
