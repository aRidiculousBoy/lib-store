<template>
  <div class="file-breadcrumb">
    <a-breadcrumb v-bind="$attrs">
      <a-breadcrumb-item v-if="prefix">
        <a v-if="clickFn" @click="handleClick(prefix)">{{  prefix.name  }}</a>
        <router-link v-else :to="base + prefix.id">{{ prefix.name }}</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="item in items">
        <a v-if="clickFn" @click="handleClick(item)">{{  item.name  }}</a>
        <router-link v-else :to="base + item.id">{{ item.name }}</router-link>
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
    },
    clickFn: {
      type: Function
    }
  },
  methods: {
    handleClick(item) {
      this.clickFn && this.clickFn(item)
    }
  }
}
</script>

<style scoped lang="less">

</style>
