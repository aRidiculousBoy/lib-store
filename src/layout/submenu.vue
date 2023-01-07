<template>
  <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <a-icon :type="menuInfo.meta.icon" />
      <span>{{ menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.meta.hasSubMenu"
        :key="item.path"
        @click="menuItemClick(item.path)"
      >
        <a-icon :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" v-on="$listeners" />
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from 'ant-design-vue'
import MenuItem from './submenu.vue'

export default {
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      required: true
    }
  },
  components: {
    MenuItem
  },
  methods: {
    menuItemClick(path) {
      this.$emit('menuItemClick', path)
    }
  }
}
</script>

<style scoped lang="less"></style>
