<template>
  <chart-template :chartConfig="option" title="运营活动效果" value="90%" desc="1">
    <div slot="desc">
      <a-space>
        <span>周同比 <a-icon type="arrow-up"></a-icon>12%</span>
        <span
          >日同比 <a-icon type="arrow-down" style="color: rgb(82, 196, 26)"></a-icon>10%</span
        >
      </a-space>
    </div>
  </chart-template>
</template>

<script>
import ChartTemplate from '../chartTemplate'
export default {
  name: 'Op',
  components: {
    ChartTemplate
  },
  data() {
    const option = {
      xAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        data: []
      },
      yAxis: {
        type: 'category',
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: 'effetive',
          type: 'bar',
          data: [90],
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#4ad2ff'
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
