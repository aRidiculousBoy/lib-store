<template>
  <div class="file-breadcrumb">
    <a-breadcrumb v-bind="$attrs">
      <a-breadcrumb-item v-if="prefix">
        <router-link :to="base + prefix.id">{{ prefix.name }}</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="item in items">
        <router-link :to="base + item.id">{{ item.name }}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'file-breadcrumb',
  props: {
    base: {
      type: String,
      default: ''
    },
    prefix: {
      type: Object
    },
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">

</style>
