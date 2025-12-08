<template>
  <div class="performance-page page-container">
    <PageHeader
      title="性能分析"
      description="Core Web Vitals 和页面性能指标监控"
      :icon="TrendCharts"
    />

    <div class="page-content">
      <!-- Core Web Vitals -->
      <div class="grid grid-3" style="margin-bottom: var(--spacing-lg)">
        <el-card class="vitals-card">
          <div class="vitals-header">
            <h3>LCP</h3>
            <el-tooltip content="Largest Contentful Paint - 最大内容绘制">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="vitals-value" :class="getLCPClass(currentMetrics.lcp)">
            {{ currentMetrics.lcp }}s
          </div>
          <div class="vitals-bar">
            <div class="bar-segment good"></div>
            <div class="bar-segment needs-improvement"></div>
            <div class="bar-segment poor"></div>
            <div class="bar-indicator" :style="{ left: getLCPPosition(currentMetrics.lcp) }"></div>
          </div>
          <div class="vitals-labels">
            <span>好 (&lt;2.5s)</span>
            <span>需要改进</span>
            <span>差 (&gt;4s)</span>
          </div>
        </el-card>

        <el-card class="vitals-card">
          <div class="vitals-header">
            <h3>FID</h3>
            <el-tooltip content="First Input Delay - 首次输入延迟">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="vitals-value" :class="getFIDClass(currentMetrics.fid)">
            {{ currentMetrics.fid }}ms
          </div>
          <div class="vitals-bar">
            <div class="bar-segment good"></div>
            <div class="bar-segment needs-improvement"></div>
            <div class="bar-segment poor"></div>
            <div class="bar-indicator" :style="{ left: getFIDPosition(currentMetrics.fid) }"></div>
          </div>
          <div class="vitals-labels">
            <span>好 (&lt;100ms)</span>
            <span>需要改进</span>
            <span>差 (&gt;300ms)</span>
          </div>
        </el-card>

        <el-card class="vitals-card">
          <div class="vitals-header">
            <h3>CLS</h3>
            <el-tooltip content="Cumulative Layout Shift - 累积布局偏移">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="vitals-value" :class="getCLSClass(currentMetrics.cls)">
            {{ currentMetrics.cls }}
          </div>
          <div class="vitals-bar">
            <div class="bar-segment good"></div>
            <div class="bar-segment needs-improvement"></div>
            <div class="bar-segment poor"></div>
            <div class="bar-indicator" :style="{ left: getCLSPosition(currentMetrics.cls) }"></div>
          </div>
          <div class="vitals-labels">
            <span>好 (&lt;0.1)</span>
            <span>需要改进</span>
            <span>差 (&gt;0.25)</span>
          </div>
        </el-card>
      </div>

      <!-- 性能测试场景 -->
      <el-card style="margin-bottom: var(--spacing-lg)">
        <template #header>
          <h3>性能测试场景</h3>
        </template>
        <div class="flex gap-md">
          <el-button type="primary" @click="runPerformanceTest('fast')">
            模拟快速加载
          </el-button>
          <el-button type="warning" @click="runPerformanceTest('slow')">
            模拟慢速加载
          </el-button>
          <el-button type="danger" @click="runPerformanceTest('heavy')">
            模拟重负载
          </el-button>
          <el-button @click="clearMetrics">
            重置指标
          </el-button>
        </div>
      </el-card>

      <!-- 图表区域 -->
      <div class="grid grid-2">
        <!-- 页面加载时间线 -->
        <ChartCard
          title="页面加载时间线"
          :option="loadTimelineOption"
          height="350px"
        />

        <!-- 性能趋势 -->
        <ChartCard
          title="性能指标趋势"
          :option="metricsHistoryOption"
          height="350px"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import { TrendCharts, QuestionFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { randomFloat, randomInt } from '@/utils/mockData'
import { getBarChartOption, getLineChartOption } from '@/utils/charts'
import dayjs from 'dayjs'

// 当前性能指标
const currentMetrics = ref({
  lcp: 2.8,
  fid: 120,
  cls: 0.15
})

// 页面加载时间线数据
const loadTimelineData = ref({
  categories: ['DNS查询', 'TCP连接', '请求', '响应', 'DOM解析', '资源加载'],
  series: [{ name: '耗时 (ms)', data: [45, 120, 80, 200, 350, 600] }]
})

const loadTimelineOption = computed(() => {
  return getBarChartOption(
    loadTimelineData.value.categories,
    loadTimelineData.value.series
  )
})

// 性能历史数据
const metricsHistory = ref({
  xAxisData: Array.from({ length: 20 }, (_, i) => 
    dayjs().subtract(20 - i, 'minute').format('HH:mm')
  ),
  series: [
    { name: 'LCP (s)', data: Array.from({ length: 20 }, () => randomFloat(1.5, 4.0)) },
    { name: 'FID (x10 ms)', data: Array.from({ length: 20 }, () => randomInt(5, 30)) },
    { name: 'CLS (x10)', data: Array.from({ length: 20 }, () => randomInt(1, 3)) }
  ]
})

const metricsHistoryOption = computed(() => {
  return getLineChartOption(
    metricsHistory.value.xAxisData,
    metricsHistory.value.series
  )
})

// LCP 评级和位置
const getLCPClass = (value: number) => {
  if (value <= 2.5) return 'good'
  if (value <= 4.0) return 'needs-improvement'
  return 'poor'
}

const getLCPPosition = (value: number) => {
  const percent = Math.min((value / 5) * 100, 100)
  return `${percent}%`
}

// FID 评级和位置
const getFIDClass = (value: number) => {
  if (value <= 100) return 'good'
  if (value <= 300) return 'needs-improvement'
  return 'poor'
}

const getFIDPosition = (value: number) => {
  const percent = Math.min((value / 400) * 100, 100)
  return `${percent}%`
}

// CLS 评级和位置
const getCLSClass = (value: number) => {
  if (value <= 0.1) return 'good'
  if (value <= 0.25) return 'needs-improvement'
  return 'poor'
}

const getCLSPosition = (value: number) => {
  const percent = Math.min((value / 0.3) * 100, 100)
  return `${percent}%`
}

// 运行性能测试
const runPerformanceTest = (scenario: string) => {
  switch (scenario) {
    case 'fast':
      currentMetrics.value = {
        lcp: randomFloat(1.5, 2.3),
        fid: randomInt(50, 90),
        cls: randomFloat(0.05, 0.09, 3)
      }
      ElMessage.success('快速加载场景测试完成 - 性能优秀！')
      break
    case 'slow':
      currentMetrics.value = {
        lcp: randomFloat(3.0, 3.8),
        fid: randomInt(150, 250),
        cls: randomFloat(0.15, 0.22, 3)
      }
      ElMessage.warning('慢速加载场景测试完成 - 性能需要改进')
      break
    case 'heavy':
      currentMetrics.value = {
        lcp: randomFloat(4.2, 5.5),
        fid: randomInt(320, 450),
        cls: randomFloat(0.27, 0.40, 3)
      }
      ElMessage.error('重负载场景测试完成 - 性能较差')
      break
  }
}

// 重置指标
const clearMetrics = () => {
  currentMetrics.value = {
    lcp: 2.8,
    fid: 120,
    cls: 0.15
  }
  ElMessage.info('性能指标已重置')
}
</script>

<style scoped>
.vitals-card {
  text-align: center;
}

.vitals-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.vitals-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.vitals-value {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.vitals-value.good {
  color: var(--success-color);
}

.vitals-value.needs-improvement {
  color: var(--warning-color);
}

.vitals-value.poor {
  color: var(--danger-color);
}

.vitals-bar {
  position: relative;
  height: 8px;
  display: flex;
  margin: var(--spacing-md) 0;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.bar-segment {
  flex: 1;
}

.bar-segment.good {
  background-color: var(--success-color);
}

.bar-segment.needs-improvement {
  background-color: var(--warning-color);
}

.bar-segment.poor {
  background-color: var(--danger-color);
}

.bar-indicator {
  position: absolute;
  top: -4px;
  width: 4px;
  height: 16px;
  background-color: var(--text-primary);
  border-radius: 2px;
  transform: translateX(-50%);
  transition: left 0.3s ease;
}

.vitals-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
}

:deep(.el-card__header h3) {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
