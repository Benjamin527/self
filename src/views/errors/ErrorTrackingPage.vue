<template>
  <div class="error-tracking-page page-container">
    <PageHeader
      title="错误追踪"
      description="应用错误监控和分析"
      :icon="WarningFilled"
    />

    <div class="page-content">
      <!-- 错误统计 -->
      <div class="grid grid-4" style="margin-bottom: var(--spacing-lg)">
        <StatCard
          label="总错误数"
          :value="errorStats.total"
          :icon="WarningFilled"
          color="danger"
        />
        <StatCard
          label="受影响用户"
          :value="errorStats.affectedUsers"
          :icon="UserFilled"
          color="warning"
        />
        <StatCard
          label="严重错误"
          :value="errorStats.critical"
          :icon="CircleCloseFilled"
          color="danger"
        />
        <StatCard
          label="已修复"
          :value="errorStats.resolved"
          :icon="CircleCheckFilled"
          color="success"
        />
      </div>

      <!-- 触发错误场景 -->
      <el-card style="margin-bottom: var(--spacing-lg)">
        <template #header>
          <h3>触发错误场景</h3>
        </template>
        <div class="flex gap-md">
          <el-button type="danger" @click="triggerError('TypeError')">
            触发 TypeError
          </el-button>
          <el-button type="danger" @click="triggerError('NetworkError')">
            触发网络错误
          </el-button>
          <el-button type="danger" @click="triggerError('ApiError')">
            触发 API 错误
          </el-button>
          <el-button type="warning" @click="triggerError('ValidationError')">
            触发验证错误
          </el-button>
        </div>
      </el-card>

      <!-- 图表 -->
      <div class="grid grid-2" style="margin-bottom: var(--spacing-lg)">
        <ChartCard
          title="错误趋势"
          :option="errorTrendOption"
          height="300px"
        />
        <ChartCard
          title="错误类型分布"
          :option="errorTypeOption"
          height="300px"
        />
      </div>

      <!-- 错误列表 -->
      <el-card>
        <template #header>
          <div class="flex-between">
            <h3>错误列表</h3>
            <el-input
              v-model="searchKeyword"
              placeholder="搜索错误..."
              style="width: 200px"
              clearable
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
        </template>

        <el-table :data="filteredErrors" style="width: 100%">
          <el-table-column prop="type" label="类型" width="150">
            <template #default="{ row }">
              <el-tag :type="getSeverityType(row.severity)">
                {{ row.type }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="错误信息" />
          <el-table-column prop="count" label="发生次数" width="100" align="center" />
          <el-table-column prop="affectedUsers" label="受影响用户" width="120" align="center" />
          <el-table-column prop="timestamp" label="最后发生时间" width="180" />
          <el-table-column label="操作" width="100" align="center">
            <template #default="{ row }">
              <el-button type="primary" size="small" link @click="showErrorDetail(row)">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 错误详情对话框 -->
    <el-dialog v-model="dialogVisible" title="错误详情" width="700px">
      <div v-if="selectedError">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="错误类型">
            <el-tag :type="getSeverityType(selectedError.severity)">
              {{ selectedError.type }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="严重程度">
            {{ selectedError.severity }}
          </el-descriptions-item>
          <el-descriptions-item label="发生次数">
            {{ selectedError.count }}
          </el-descriptions-item>
          <el-descriptions-item label="受影响用户">
            {{ selectedError.affectedUsers }}
          </el-descriptions-item>
          <el-descriptions-item label="最后发生时间" :span="2">
            {{ selectedError.timestamp }}
          </el-descriptions-item>
          <el-descriptions-item label="错误信息" :span="2">
            {{ selectedError.message }}
          </el-descriptions-item>
          <el-descriptions-item label="堆栈信息" :span="2">
            <pre class="stack-trace">{{ selectedError.stack }}</pre>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import StatCard from '@/components/dashboard/StatCard.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import {
  WarningFilled,
  UserFilled,
  CircleCloseFilled,
  CircleCheckFilled,
  Search
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { generateErrorData, generateLineChartData, generatePieChartData } from '@/utils/mockData'
import { getLineChartOption, getPieChartOption } from '@/utils/charts'
import { customDefineErrors } from '@/sdk/index'

// 错误统计
const errorStats = ref({
  total: 156,
  affectedUsers: 89,
  critical: 12,
  resolved: 98
})

// 错误列表
const errorList = ref(generateErrorData(15))
const searchKeyword = ref('')

const filteredErrors = computed(() => {
  if (!searchKeyword.value) return errorList.value
  
  return errorList.value.filter(error => 
    error.type.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    error.message.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 错误趋势
const errorTrendData = ref(generateLineChartData(20, 1))
const errorTrendOption = computed(() => {
  return getLineChartOption(
    errorTrendData.value.xAxisData,
    [{ name: '错误数量', data: errorTrendData.value.series[0].data }]
  )
})

// 错误类型分布
const errorTypeData = ref(generatePieChartData(['TypeError', 'NetworkError', 'ApiError', 'ValidationError']))
const errorTypeOption = computed(() => {
  return getPieChartOption(errorTypeData.value)
})

// 错误详情对话框
const dialogVisible = ref(false)
const selectedError = ref<any>(null)

const showErrorDetail = (error: any) => {
  selectedError.value = error
  dialogVisible.value = true
}

const getSeverityType = (severity: string) => {
  const map: Record<string, any> = {
    low: 'info',
    medium: 'warning',
    high: 'danger',
    critical: 'danger'
  }
  return map[severity] || 'info'
}

// 触发错误
const triggerError = (errorType: string) => {
  const errorData = {
    error_type: errorType,
    message: `这是一个测试${errorType}`,
    stack: `Error: ${errorType}\n  at triggerError (ErrorTrackingPage.vue:123)\n  at onClick (ErrorTrackingPage.vue:89)`,
    timestamp: new Date().toISOString()
  }
  
  // 调用SDK
 customDefineErrors(errorType, errorData)
  
  // 添加到列表
  errorList.value.unshift({
    id: `error-${Date.now()}`,
    type: errorType,
    message: errorData.message,
    stack: errorData.stack,
    timestamp: new Date().toLocaleString(),
    count: 1,
    affectedUsers: 1,
    severity: errorType === 'ValidationError' ? 'medium' : 'high'
  })
  
  errorStats.value.total++
  
  ElMessage.error(`已触发 ${errorType}`)
}
</script>

<style scoped>
.stack-trace {
  background: var(--bg-secondary);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 12px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

:deep(.el-card__header h3) {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
