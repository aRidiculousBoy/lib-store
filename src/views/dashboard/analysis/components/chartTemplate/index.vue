<template>
  <a-card>
    <div class="stastic">
      <div class="title">{{ title }}</div>
      <span style="cursor:pointer">
        <a-tooltip>
          <template slot="title">指标说明</template>
          <a-icon type="info-circle"></a-icon>
        </a-tooltip>
      </span>
    </div>
    <span class="value">{{ value }}</span>
    <div class="container">
      <div class="chart-container" ref="chartRef"></div>
    </div>
    <div class="desc">
      <slot name="desc">{{ desc }}</slot>
    </div>
  </a-card>
</template>

<script>
import * as echarts from 'echarts'
import { throttle } from 'lodash'
export default {
  name: 'ChartTemplate',
  props: {
    chartConfig: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    }
  },
  mounted() {
    if (!this.chart) {
      this.chart = echarts.init(this.$refs.chartRef)
      const option = {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        ...this.chartConfig
      }


      window.addEventListener(
        'resize',
        throttle(() => {
          this.chart.resize()
        }, 300)
      )
      this.chart.setOption(option)

    }
  },
  data() {
    const chart = null
    return {
      chart
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
  border-top: 1px solid #e8e8e8;
  height: 18px;
  margin-top: 16px;
  padding: 6px;
}
</style>
