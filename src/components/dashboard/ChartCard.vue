<template>
  <div class="chart-card">
    <div v-if="title" class="chart-header">
      <h3>{{ title }}</h3>
      <slot name="header-actions"></slot>
    </div>
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'

interface Props {
  option: EChartsOption
  title?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '300px'
})

const chartRef = ref<HTMLElement>()
let chartInstance: ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(props.option)
    
    // 响应式调整
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})

watch(() => props.option, (newOption) => {
  chartInstance?.setOption(newOption, true)
}, { deep: true })

const handleResize = () => {
  chartInstance?.resize()
}
</script>

<style scoped>
.chart-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.chart-card:hover {
  box-shadow: var(--shadow-lg);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.chart-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.chart-container {
  width: 100%;
  height: v-bind(height);
}
</style>
