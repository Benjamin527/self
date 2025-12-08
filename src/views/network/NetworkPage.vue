<template>
  <div class="network-page page-container">
    <PageHeader
      title="网络监控"
      description="API 请求监控和性能分析"
      :icon="Connection"
    />

    <div class="page-content">
      <!-- 网络统计 -->
      <div class="grid grid-4" style="margin-bottom: var(--spacing-lg)">
        <StatCard
          label="总请求数"
          :value="networkStats.totalRequests"
          :icon="DataLine"
          color="primary"
        />
        <StatCard
          label="成功率"
          :value="networkStats.successRate + '%'"
          :icon="CircleCheckFilled"
          color="success"
        />
        <StatCard
          label="平均响应时间"
          :value="networkStats.avgResponseTime"
          suffix="ms"
          :icon="Timer"
          color="info"
        />
        <StatCard
          label="失败请求"
          :value="networkStats.failedRequests"
          :icon="CircleCloseFilled"
          color="danger"
        />
      </div>

      <!-- 模拟请求 -->
      <el-card style="margin-bottom: var(--spacing-lg)">
        <template #header>
          <h3>模拟 API 请求</h3>
        </template>
        <div class="flex gap-md">
          <el-button type="success" @click="simulateRequest('GET', 200)">
            GET 成功
          </el-button>
           <el-button type="primary" @click="simulateRequest('POST', 201)">
            POST 成功
          </el-button>
          <el-button type="warning" @click="simulateRequest('GET', 404)">
            404 错误
          </el-button>
          <el-button type="danger" @click="simulateRequest('POST', 500)">
            500 错误
          </el-button>
        </div>
      </el-card>

      <!-- 图表 -->
      <div class="grid grid-2" style="margin-bottom: var(--spacing-lg)">
        <ChartCard
          title="请求响应时间"
          :option="responseTimeOption"
          height="300px"
        />
        <ChartCard
          title="请求状态分布"
          :option="statusDistributionOption"
          height="300px"
        />
      </div>

      <!-- 请求列表 -->
      <el-card>
        <template #header>
          <div class="flex-between">
            <h3>请求列表</h3>
            <div class="flex gap-sm">
              <el-select v-model="filterMethod" placeholder="请求方法" clearable style="width: 120px">
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
                <el-option label="PUT" value="PUT" />
                <el-option label="DELETE" value="DELETE" />
              </el-select>
              <el-select v-model="filterStatus" placeholder="状态码" clearable style="width: 120px">
                <el-option label="2xx" value="2" />
                <el-option label="4xx" value="4" />
                <el-option label="5xx" value="5" />
              </el-select>
            </div>
          </div>
        </template>

        <el-table :data="filteredRequests" style="width: 100%">
          <el-table-column prop="method" label="方法" width="100">
            <template #default="{ row }">
              <el-tag :type="getMethodTagType(row.method)" size="small">
                {{ row.method }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="URL" />
          <el-table-column prop="status" label="状态码" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.status)" size="small">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="耗时" width="100" align="center">
            <template #default="{ row }">
              <span :class="{ 'slow-request': row.duration > 1000 }">
                {{ row.duration }}ms
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="size" label="大小" width="100" align="center">
            <template #default="{ row }">
              {{ formatSize(row.size) }}
            </template>
          </el-table-column>
          <el-table-column prop="timestamp" label="时间" width="100" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import {
  Connection,
  DataLine,
  CircleCheckFilled,
  CircleCloseFilled,
  Timer
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { generateNetworkData, randomInt } from '@/utils/mockData'
import { getLineChartOption, getPieChartOption } from '@/utils/charts'
import dayjs from 'dayjs'

// 网络统计
const networkStats = ref({
  totalRequests: 1248,
  successRate: 94.2,
  avgResponseTime: 285,
  failedRequests: 72
})

// 请求列表
const requestList = ref(generateNetworkData(30))
const filterMethod = ref('')
const filterStatus = ref('')

const filteredRequests = computed(() => {
  let result = requestList.value
  
  if (filterMethod.value) {
    result = result.filter(req => req.method === filterMethod.value)
  }
  
  if (filterStatus.value) {
    result = result.filter(req => req.status.toString().startsWith(filterStatus.value))
  }
  
  return result
})

// 响应时间趋势
const responseTimeData = ref({
  xAxisData: Array.from({ length: 20 }, (_, i) =>
    dayjs().subtract(20 - i, 'minute').format('HH:mm')
  ),
  series: [
    { name: '响应时间 (ms)', data: Array.from({ length: 20 }, () => randomInt(100, 500)) }
  ]
})

const responseTimeOption = computed(() => {
  return getLineChartOption(
    responseTimeData.value.xAxisData,
    responseTimeData.value.series
  )
})

// 状态码分布
const statusDistributionData = ref([
  { name: '2xx 成功', value: 1176 },
  { name: '4xx 客户端错误', value: 45 },
  { name: '5xx 服务器错误', value: 27 }
])

const statusDistributionOption = computed(() => {
  return getPieChartOption(statusDistributionData.value)
})

// 标签类型
const getMethodTagType = (method: string) => {
  const map: Record<string, string> = {
    GET: 'success',
    POST: 'primary',
    PUT: 'warning',
    DELETE: 'danger'
  }
  return map[method] || ''
}

const getStatusTagType = (status: number) => {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400 && status < 500) return 'warning'
  if (status >= 500) return 'danger'
  return ''
}

// 格式化大小
const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// 模拟请求
const simulateRequest = (method: string, status: number) => {
  const newRequest = {
    id: `req-${Date.now()}`,
    method,
    url: '/api/test',
    status,
    duration: randomInt(50, 2000),
    timestamp: dayjs().format('HH:mm:ss'),
    size: randomInt(100, 50000)
  }
  
  requestList.value.unshift(newRequest)
  networkStats.value.totalRequests++
  
  if (status >= 200 && status < 300) {
    ElMessage.success(`${method} 请求成功 (${status})`)
  } else {
    networkStats.value.failedRequests++
    ElMessage.error(`${method} 请求失败 (${status})`)
  }
  
  // 重新计算成功率
  const successCount = requestList.value.filter(r => r.status >= 200 && r.status < 300).length
  networkStats.value.successRate = parseFloat(((successCount / requestList.value.length) * 100).toFixed(1))
}
</script>

<style scoped>
.slow-request {
  color: var(--danger-color);
  font-weight: 600;
}

:deep(.el-card__header h3) {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
