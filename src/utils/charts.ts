import type { EChartsOption } from 'echarts'

// 通用图表配置
export function getBaseChartOption(): EChartsOption {
  return {
    backgroundColor: 'transparent',
    textStyle: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#333',
      textStyle: {
        color: '#fff'
      }
    }
  }
}

// 折线图配置
export function getLineChartOption(
  xAxisData: string[],
  series: Array<{ name: string; data: number[] }>,
  title?: string
): EChartsOption {
  return {
    ...getBaseChartOption(),
    title: title ? {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal'
      }
    } : undefined,
    xAxis: {
      type: 'category',
      data: xAxisData,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#e0e0e0'
        }
      }
    },
    series: series.map((s) => ({
      name: s.name,
      type: 'line',
      data: s.data,
      smooth: true,
      lineStyle: {
        width: 2
      },
      areaStyle: {
        opacity: 0.3
      },
      emphasis: {
        focus: 'series'
      }
    })),
    legend: {
      data: series.map(s => s.name),
      top: 'bottom'
    }
  }
}

// 柱状图配置
export function getBarChartOption(
  categories: string[],
  series: Array<{ name: string; data: number[] }>,
  title?: string
): EChartsOption {
  return {
    ...getBaseChartOption(),
    title: title ? {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal'
      }
    } : undefined,
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#e0e0e0'
        }
      }
    },
    series: series.map(s => ({
      name: s.name,
      type: 'bar',
      data: s.data,
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        focus: 'series'
      }
    })),
    legend: series.length > 1 ? {
      data: series.map(s => s.name),
      top: 'bottom'
    } : undefined
  }
}

// 饼图配置
export function getPieChartOption(
  data: Array<{ name: string; value: number }>,
  title?: string
): EChartsOption {
  return {
    ...getBaseChartOption(),
    title: title ? {
      text: title,
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal'
      }
    } : undefined,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '统计',
        type: 'pie',
        radius: '60%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          formatter: '{b}: {d}%'
        }
      }
    ]
  }
}

// 仪表盘配置
export function getGaugeChartOption(
  value: number,
  title: string,
  max: number = 100
): EChartsOption {
  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: max,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#67c23a'],
              [0.5, '#e6a23c'],
              [0.75, '#f56c6c'],
              [1, '#909399']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 8,
          lineStyle: {
            color: 'auto',
            width: 1
          }
        },
        splitLine: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 3
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 12,
          distance: -50
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 16,
          color: '#464646'
        },
        detail: {
          fontSize: 24,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value) + ''
          },
          color: 'auto'
        },
        data: [
          {
            value: value,
            name: title
          }
        ]
      }
    ]
  }
}

// 热力图配置
export function getHeatmapChartOption(
  xAxisData: string[],
  yAxisData: string[],
  data: Array<[number, number, number]>,
  title?: string
): EChartsOption {
  return {
    ...getBaseChartOption(),
    title: title ? {
      text: title,
      left: 'center'
    } : undefined,
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '70%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%'
    },
    series: [
      {
        name: '数值',
        type: 'heatmap',
        data: data,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
