<template>
  <div class="h-table">
    <a-table
      v-if="showSelection"
      :columns="filterColumns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleChange"
      :row-selection="rowSelection"
      v-bind="options"
    >
      <div v-for="item in slotCols" :slot="item.slot" slot-scope="scope" :key="item.slot">
        <slot :name="item.slot" :[item.slot]="scope">{{ scope }}</slot>
      </div>
      <span slot="action" slot-scope="text, record">
        <slot name="action" :scope="record"></slot>
      </span>
    </a-table>
    <a-table
      v-else
      :columns="filterColumns"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleChange"
      v-bind="options"
    >
      <div v-for="item in slotCols" :slot="item.slot" slot-scope="scope" :key="item.slot">
        <slot :name="item.slot" :[item.slot]="scope">{{ scope }}</slot>
      </div>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'HTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    pagination: {
      type: [Boolean, Object],
      default: true
    },
    showSelection: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    rowSelection: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    filterColumns() {
      return this.columns.map((col) => {
        col.slot ? (col.scopedSlots = { customRender: col.slot }) : undefined
        return col
      })
    },
    slotCols() {
      return this.columns.filter((item) => item.slot && item.slot !== 'action')
    }
  },
  methods: {
    handleChange(...args) {
      this.$emit('change', ...args)
    }
  }
}
</script>

<style scoped lang="less"></style>
