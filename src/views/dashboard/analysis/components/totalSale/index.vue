<template>
<chart-template :chartConfig="option" title="总销售额" desc="日销售额 ￥1,234" value="￥126,560"></chart-template>
</template>

<script>
import ChartTemplate from '../chartTemplate'

export default {
  name: 'TotalSale',
  components: {
    ChartTemplate
  },
  data() {
    const option = {
      tooltip: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
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
          data: [140, 232, 101, 264, 90, 340, 250],
          type: 'line',
          smooth: true,
          showSymbol: false,
          areaStyle: {
            color: 'rgb(45,140,240)'
          },
          lineStyle: {
            width: 0
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

<style scoped lang="less">
.container {
  width: 100%;
  height: 196px;
}
.chart-container {
  width: 100%;
  height: 100%;
}
.stastic {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
}

/deep/.ant-card-body {
  padding: 20px;
}

.value {
  font-size: 20px;
  color: #262626;
}

.desc {
  height: 18px;
  margin-top: 16px;
}
</style>
