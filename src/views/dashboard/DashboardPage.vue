<template>
  <div class="dashboard-page page-container">
    <PageHeader
      title="监控仪表板"
      description="实时监控应用性能、日志和错误统计"
      :icon="DataAnalysis"
    >
      <template #actions>
        <el-button :icon="Refresh" @click="refreshData" circle />
        <el-button :icon="isDark ? Sunny : Moon" @click="toggleTheme" circle />
      </template>
    </PageHeader>

    <div class="page-content">
      <!-- 统计卡片 -->
      <div class="grid grid-4" style="margin-bottom: var(--spacing-lg)">
        <StatCard
          label="页面浏览量"
          :value="stats.pageViews"
          :icon="View"
          color="primary"
          :trend="`+${stats.pvTrend}%`"
          :trend-up="true"
        />
        <StatCard
          label="错误总数"
          :value="stats.errors"
          :icon="WarningFilled"
          color="danger"
          :trend="`${stats.errorTrend}%`"
          :trend-up="false"
        />
        <StatCard
          label="平均响应时间"
          :value="stats.avgResponse"
          suffix="ms"
          :icon="Timer"
          color="success"
          :trend="`-${stats.responseTrend}%`"
          :trend-up="true"
        />
        <StatCard
          label="活跃用户"
          :value="stats.activeUsers"
          :icon="User"
          color="info"
          :trend="`+${stats.userTrend}%`"
          :trend-up="true"
        />
      </div>

      <!-- 图表区域 -->
      <div class="grid grid-2">
        <!-- 性能趋势图 -->
        <ChartCard
          title="性能趋势"
          :option="performanceChartOption"
          height="350px"
        >
          <template #header-actions>
            <el-select v-model="timeRange" size="small" style="width: 100px">
              <el-option label="1小时" value="1h" />
              <el-option label="6小时" value="6h" />
              <el-option label="24小时" value="24h" />
            </el-select>
          </template>
        </ChartCard>

        <!-- 日志级别分布 -->
        <ChartCard
          title="日志级别分布"
          :option="logDistributionOption"
          height="350px"
        />

        <!-- API响应时间 -->
        <ChartCard
          title="API 响应时间"
          :option="apiResponseOption"
          height="350px"
        />

        <!-- 错误类型分布 -->
        <ChartCard
          title="错误类型分布"
          :option="errorTypeOption"
          height="350px"
        />
      </div>

      <!-- 最近日志列表 -->
      <div class="recent-logs" style="margin-top: var(--spacing-lg)">
        <el-card>
          <template #header>
            <div class="flex-between">
              <h3>最近日志</h3>
              <el-button type="primary" size="small" @click="goToLogs">
                查看全部
              </el-button>
            </div>
          </template>
          
          <el-table :data="recentLogs" style="width: 100%">
            <el-table-column prop="level" label="级别" width="100">
              <template #default="{ row }">
                <el-tag :type="getLogTagType(row.level)">
                  {{ row.level.toUpperCase() }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="message" label="消息" />
            <el-table-column prop="timestamp" label="时间" width="180" />
          </el-table>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import PageHeader from '@/components/common/PageHeader.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import {
  DataAnalysis,
  View,
  WarningFilled,
  Timer,
  User,
  Refresh,
  Sunny,
  Moon
} from '@element-plus/icons-vue'
import {
  generateLogData,
  generateLineChartData,
  generatePieChartData,
  randomInt
} from '@/utils/mockData'
import {
  getLineChartOption,
  getPieChartOption,
  getBarChartOption
} from '@/utils/charts'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()

// 时间范围
const timeRange = ref('1h')

// 统计数据
const stats = ref({
  pageViews: 12458,
  pvTrend: 12.5,
  errors: 23,
  errorTrend: 8.2,
  avgResponse: 245,
  responseTrend: 15.3,
  activeUsers: 1024,
  userTrend: 24.8
})

// 性能趋势图
const performanceData = ref(generateLineChartData(20, 2))
const performanceChartOption = computed(() => {
  return getLineChartOption(
    performanceData.value.xAxisData,
    [
      { name: '页面加载时间 (ms)', data: performanceData.value.series[0].data },
      { name: 'API响应时间 (ms)', data: performanceData.value.series[1].data }
    ]
  )
})

// 日志分布
const logDistribution = ref(generatePieChartData(['info', 'warn', 'error', 'debug']))
const logDistributionOption = computed(() => {
  return getPieChartOption(logDistribution.value)
})

// API响应时间柱状图
const apiResponseData = ref({
  categories: ['/api/users', '/api/products', '/api/orders', '/api/analytics', '/api/settings'],
  series: [{ name: '响应时间 (ms)', data: [120, 250, 180, 320, 150] }]
})
const apiResponseOption = computed(() => {
  return getBarChartOption(
    apiResponseData.value.categories,
    apiResponseData.value.series
  )
})

// 错误类型分布
const errorTypeData = ref(generatePieChartData(['NetworkError', 'TypeError', 'ApiError', 'ValidationError']))
const errorTypeOption = computed(() => {
  return getPieChartOption(errorTypeData.value)
})

// 最近日志
const recentLogs = ref(generateLogData(8))

const getLogTagType = (level: string) => {
  const map: Record<string, any> = {
    info: 'info',
    warn: 'warning',
    error: 'danger',
    debug: 'info'
  }
  return map[level] || 'info'
}

const goToLogs = () => {
  router.push('/logs')
}

// 刷新数据
let refreshTimer: number | null = null

const refreshData = () => {
  stats.value = {
    pageViews: randomInt(10000, 15000),
    pvTrend: parseFloat((Math.random() * 30).toFixed(1)),
    errors: randomInt(10, 50),
    errorTrend: parseFloat((Math.random() * 20).toFixed(1)),
    avgResponse: randomInt(200, 400),
    responseTrend: parseFloat((Math.random() * 20).toFixed(1)),
    activeUsers: randomInt(800, 1500),
    userTrend: parseFloat((Math.random() * 30).toFixed(1))
  }

  performanceData.value = generateLineChartData(20, 2)
  logDistribution.value = generatePieChartData(['info', 'warn', 'error', 'debug'])
  errorTypeData.value = generatePieChartData(['NetworkError', 'TypeError', 'ApiError', 'ValidationError'])
  recentLogs.value = generateLogData(8)
}

// 自动刷新
onMounted(() => {
  refreshTimer = window.setInterval(refreshData, 30000) // 每30秒刷新一次
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})
</script>

<style scoped>
.dashboard-page {
  animation: fadeIn 0.5s ease-out;
}

.recent-logs h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

:deep(.el-card__header) {
  padding: var(--spacing-md) var(--spacing-lg);
}
</style>
