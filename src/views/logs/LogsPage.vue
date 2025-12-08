<template>
  <div class="logs-page page-container">
    <PageHeader
      title="日志监控"
      description="应用日志记录和分析"
      :icon="Document"
    >
      <template #actions>
        <el-button :icon="Refresh" @click="refreshLogs">刷新</el-button>
      </template>
    </PageHeader>

    <div class="page-content">
      <div class="grid grid-2">
        <el-card shadow="hover" class="hover-lift">
          <template #header>
            <h3>触发日志</h3>
          </template>
          
          <p style="margin-bottom: var(--spacing-lg); color: var(--text-secondary)">
            点击按钮上报不同类型的日志到观测云
          </p>
          
          <el-space direction="vertical" style="width: 100%; align-items: normal">
            <el-button
              v-for="item in buttonFuncList"
              :key="item.label"
              :type="item.type"
              @click="item.func()"
              size="large"
            >
              {{ item.label }}
            </el-button>
          </el-space>
        </el-card>
        
        <el-card shadow="hover" class="hover-lift">
          <template #header>
            <h3>日志配置信息</h3>
          </template>
          
          <el-descriptions :column="1" border>
            <el-descriptions-item 
              v-for="(item, index) in labelInfo" 
              :key="index"
              :label="item.label">
              {{ item.value }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
      
      <el-card class="hover-lift" style="margin-top: var(--spacing-lg)">
        <template #header>
          <h3>上报历史</h3>
        </template>
        
        <el-table :data="actionHistory" style="width: 100%">
          <el-table-column prop="type" label="类型" width="120">
            <template #default="scope">
              <el-tag :type="getLogTagType(scope.row.type)">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="timestamp" label="时间" width="200" />
          <el-table-column prop="message" label="消息内容" />
          <el-table-column prop="data" label="详细数据" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import PageHeader from '@/components/common/PageHeader.vue'
  import { customDebugLogs } from '@/sdk/index'
  import { ElMessage } from 'element-plus'
  import { Document, Refresh } from '@element-plus/icons-vue'
  
  const refreshLogs = () => {
    ElMessage.success('日志已刷新')
  }
  
  //操作历史
  const actionHistory = ref<any[]>([
    { type: 'info', timestamp: new Date().toLocaleString(), message: '页面初始化', data: '-' }
  ])
  
  const getLogTagType = (type: string) => {
    const map: Record<string, string> = {
      info: 'info',
      warn: 'warning',
      error: 'danger',
      critical: 'danger',
      debug: 'info'
    }
    return map[type] || 'info'
  }
  
  //应用信息
  const labelInfo = ref([
    { label: '服务名称', value: 'browser-log-demo' },
    { label: 'SDK状态', value: '已初始化' },
    { label: '上报环境', value: 'development' }
  ])
  
  const sendLog = (level: 'info' | 'warn' | 'error' | 'debug', msg: string) => {
    const logData = {
      page: 'LogsPage',
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    }
    
    // Call SDK function
    customDebugLogs(msg, logData, level)
    
    // Add to history
    actionHistory.value.unshift({
      type: level,
      timestamp: new Date().toLocaleString(),
      message: msg,
      data: JSON.stringify(logData)
    })
    
    ElMessage({
      message: `已发送 ${level} 日志`,
      type: level === 'warn' ? 'warning' : level === 'error' ? 'error' : 'success'
    })
  }
  
  //按钮列表
  const buttonFuncList = ref([
    { 
      label: '发送 INFO 日志', 
      type: 'primary', 
      func: () => sendLog('info', '这是一条普通信息日志') 
    },
    { 
      label: '发送 WARN 日志', 
      type: 'warning', 
      func: () => sendLog('warn', '警告：系统负载稍高') 
    },
    { 
      label: '发送 ERROR 日志', 
      type: 'danger', 
      func: () => sendLog('error', '错误：API请求失败') 
    },
    { 
      label: '发送 CRITICAL 日志', 
      type: 'danger', 
      func: () => sendLog('error', '严重错误：核心服务不可用') 
    },
      { 
      label: '发送 DEBUG 日志', 
      type: 'info', 
      func: () => sendLog('debug', '调试信息：变量x=100') 
    }
  ])
  </script>
  
  <style scoped>
  .logs-page {
    animation: fadeIn 0.5s ease-out;
  }
  
  :deep(.el-card__header h3) {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  :deep(.el-card) {
    margin-bottom: var(--spacing-lg);
  }
  </style>
  