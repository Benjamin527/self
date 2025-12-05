<template>
    <div class="logs-page">
      <!-- 顶部导航栏 -->
      <div class="page-header">
        <el-button 
          type="primary" 
          :icon="ArrowLeft" 
          @click="goBack"
          class="back-button"
        >
          返回主页
        </el-button>
        <h1 class="page-title">日志上报演示</h1>
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
              <h3>触发日志</h3>
              <p>点击按钮上报不同类型的日志到观测云</p>
              
              <el-space direction="vertical" style="width: 100%; align-items: normal">
                <el-button
                  v-for="item in buttonFuncList"
                  :key="item.label"
                  :type="item.type"
                  @click="item.func()"
                >
                  {{ item.label }}
                </el-button>
              </el-space>
            </el-card>
          </el-col>
          
          <el-col :span="12">
            <el-card style="margin: 20px" shadow="hover">
              <h3>日志配置信息</h3>
              <el-descriptions :column="1" border >
                <el-descriptions-item 
                  v-for="(item, index) in labelInfo" 
                  :key="index"
                  :label="item.label">
                  {{ item.value }}
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
          </el-col>
        </el-row>
        
        <el-divider />
        
        <div class="action-history">
          <h3>上报历史</h3>
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
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { customDebugLogs } from '@/sdk/index'
  import { ElMessage } from 'element-plus'
  import { ArrowLeft } from '@element-plus/icons-vue'
  
  const router = useRouter()
  
  const goBack = () => {
    router.push('/')
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
  
  .action-history {
    margin-top: 20px;
  }
  </style>
  