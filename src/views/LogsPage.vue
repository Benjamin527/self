<template>
  <div class="logs-page">
    <!-- 顶部导航栏 -->
    <div class="page-header">
      <el-button 
        type="success" 
        :icon="ArrowLeft" 
        @click="goBack"
        class="back-button"
      >
        返回主页
      </el-button>
      <h1 class="page-title">日志监控页面</h1>
    </div>
    
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>日志功能演示</span>
        </div>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <h3>日志功能演示</h3>
            <p>这里展示日志记录和监控相关功能</p>
            
            <el-space direction="vertical" style="width: 100%;">
              <el-button
                v-for="item in buttonFuncList"
                :type="item.type"
                @click="item.func"
              >
              {{ item.label }}
              </el-button>
            </el-space>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card shadow="hover">
            <h3>日志级别说明</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item
                v-for="item in descriptionInfoList"
                :label="item.label"
                >
                <el-tag :type="item.type">{{ item.message }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>
      
      <el-divider />
      
      <div class="logs-display">
        <h3>日志记录</h3>
        <el-input
          v-model="searchText"
          placeholder="搜索日志..."
          style="margin-bottom: 10px;"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <el-table :data="filteredLogs" style="width: 100%" max-height="400">
          <el-table-column prop="level" label="级别" width="100">
            <template #default="scope">
              <el-tag :type="getLogTagType(scope.row.level)">
                {{ scope.row.level }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="消息" />
          <el-table-column prop="timestamp" label="时间" width="200" />
          <el-table-column prop="data" label="数据" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { customDebugLogs } from '@/sdk/index'
import { ElMessage } from 'element-plus'
import { Search, ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

const searchText = ref('')
const logs = ref([
  { level: 'INFO', message: '页面加载', timestamp: new Date().toLocaleString(), data: 'LogsPage 初始化' }
])

const filteredLogs = computed(() => {
  if (!searchText.value) return logs.value
  return logs.value.filter(log => 
    log.message.toLowerCase().includes(searchText.value.toLowerCase()) ||
    log.level.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

const getLogTagType = (level: string) => {
  const typeMap: Record<string, string> = {
    'DEBUG': 'info',
    'INFO': 'success',
    'WARN': 'warning',
    'ERROR': 'danger'
  }
  return typeMap[level] || 'info'
}

const addDebugLog = () => {
  const logData = {
    user: 'test_user',
    action: 'debug_test',
    timestamp: Date.now()
  }
  customDebugLogs('debug_log_test', logData, 'debug')
  logs.value.unshift({
    level: 'DEBUG',
    message: 'debug_log_test',
    timestamp: new Date().toLocaleString(),
    data: JSON.stringify(logData)
  })
  ElMessage.info('Debug 日志已添加')
}

const addInfoLog = () => {
  const logData = {
    user: 'test_user',
    action: 'info_test',
    timestamp: Date.now()
  }
  customDebugLogs('info_log_test', logData, 'info')
  logs.value.unshift({
    level: 'INFO',
    message: 'info_log_test',
    timestamp: new Date().toLocaleString(),
    data: JSON.stringify(logData)
  })
  ElMessage.success('Info 日志已添加')
}

const addWarnLog = () => {
  const logData = {
    user: 'test_user',
    action: 'warn_test',
    timestamp: Date.now()
  }
  customDebugLogs('warn_log_test', logData, 'warn')
  logs.value.unshift({
    level: 'WARN',
    message: 'warn_log_test',
    timestamp: new Date().toLocaleString(),
    data: JSON.stringify(logData)
  })
  ElMessage.warning('Warning 日志已添加')
}

const addErrorLog = () => {
  const logData = {
    user: 'test_user',
    action: 'error_test',
    timestamp: Date.now(),
    error: '测试错误信息'
  }
  customDebugLogs('error_log_test', logData, 'error')
  logs.value.unshift({
    level: 'ERROR',
    message: 'error_log_test',
    timestamp: new Date().toLocaleString(),
    data: JSON.stringify(logData)
  })
  ElMessage.error('Error 日志已添加')
}


//按钮列表
const buttonFuncList = ref([
  { label: '添加 Debug 日志', type: 'primary', func: addDebugLog },
  { label: '添加 Info 日志', type: 'success', func: addInfoLog },
  { label: '添加 Warning 日志', type: 'warning', func: addWarnLog },
  { label: '添加 Error 日志', type: 'danger', func: addErrorLog }
])

//按钮列表
const descriptionInfoList = ref([
  { label: 'DEBUG', type: 'info', message: '调试信息' },
  { label: 'INFO', type: 'success', message: '一般信息' },
  { label: 'WARN', type: 'warning', message: '警告信息' },
  { label: 'ERROR', type: 'danger', message: '错误信息' }
])
</script>

<style scoped>
.logs-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0;
}

.page-header {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.box-card {
  margin: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.logs-display {
  margin-top: 20px;
}

</style>
