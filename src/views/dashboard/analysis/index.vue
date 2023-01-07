<template>
  <div class="page-analysis">
    <div class="coderwyh-pro-body">
      <a-row :gutter="16">
        <a-col :span="6">
          <total-sale></total-sale>
        </a-col>
        <a-col :span="6">
          <access-count></access-count>
        </a-col>
        <a-col :span="6">
          <pay-count></pay-count>
        </a-col>
        <a-col :span="6">
          <op />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import TotalSale from './components/totalSale'
import AccessCount from './components/accessCount'
import PayCount from './components/payCount'
import Op from './components/op'

export default {
  name: 'Analysis',
  mounted() {},
  methods: {},
  components: {
    TotalSale,
    AccessCount,
    PayCount,
    Op
  }
}
</script>

<style scoped lang="less"></style>
