<template>
  <chart-template
    :chartConfig="option"
    title="访问量"
    value="666,66"
    desc="日访问量 1,234"
  ></chart-template>
</template>

<script>
import ChartTemplate from '../chartTemplate'
export default {
  name: 'AccessCount',
  components: {
    ChartTemplate
  },
  data() {
    const option = {
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLable: {
          show: false
        }
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }

    return {
      option
    }
  }
}
</script>

<style scoped lang="less"></style>
