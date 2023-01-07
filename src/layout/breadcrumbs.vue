<template>
  <div class="breadcrumbs">
    <a-breadcrumb :routes="breadItems">
      <template slot="itemRender" slot-scope="{ route }">
        <router-link :to="route.path">
          {{ route.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    breadItems() {
      const items = [
        {
          title: '首页',
          path: '/'
        }
      ]
      this.$route.matched.forEach((v) => {
        if (v.meta.title) {
          items.push({
            title: v.meta.title,
            path: v.path
          })
        }
      })
      return items
    }
  }
}
</script>

<style scoped lang="less">
.ant-breadcrumb {
  line-height: 1;
  height: 18px;
}
</style>
