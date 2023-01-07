<template>
  <chart-template :chartConfig="option" title="支付笔数" value="6,060" desc="转化率 60%">
  </chart-template>
</template>

<script>
import ChartTemplate from '../chartTemplate'

export default {
  name: 'PayCount',
  components: {
    ChartTemplate
  },
  data() {
    const option = {
      xAxis: {
        type: 'category',
        data: []
      },
      tooltip: {},
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          itemStyle: {
            normal: {
              color: 'rgb(58,161,255)'
            }
          }
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
