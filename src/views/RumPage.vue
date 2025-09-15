<template>
  <div class="rum-page">
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
      <h1 class="page-title">RUM 监控页面</h1>
    </div>
    
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>RUM 功能演示</span>
        </div>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <h3>RUM 功能演示</h3>
            <p>这里展示 RUM (Real User Monitoring) 相关功能</p>
            
            <el-space direction="vertical" style="width: 100%;">
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
          <el-card shadow="hover">
            <h3>RUM 配置信息</h3>
            <el-descriptions :column="1" border >
              <el-descriptions-item 
                v-for="item in labelInfo" 
                :label="item.label">
                {{ item.value }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
      </el-row>
      
      <el-divider />
      
      <div class="action-history">
        <h3>操作历史</h3>
        <el-table :data="actionHistory" style="width: 100%">
          <el-table-column prop="action" label="操作" width="200" />
          <el-table-column prop="timestamp" label="时间" width="200" />
          <el-table-column prop="data" label="数据" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { customDefineActions, customDefineTags, customDefineErrors } from '@/sdk/index'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

//操作历史
const actionHistory = ref([
  { action: '页面加载', timestamp: new Date().toLocaleString(), data: 'RUM 页面初始化' }
])



//应用信息
const labelInfo = ref([
  { label: '应用ID', value: 'self' },
  { label: '环境', value: 'env' },
  { label: '版本', value: '1.0' },
  { label: '服务', value: 'self' }
])

//自定义添加action
const addCustomAction = () => {
  const customData = {
    name: 'RUM Action',
    page: 'RumPage',
    timestamp: Date.now()
  }
  customDefineActions('custom_rum_action', customData)

  actionHistory.value.unshift({
    action: '自定义 Action',
    timestamp: new Date().toLocaleString(),
    data: JSON.stringify(customData)
  })
  ElMessage.success('RUM Action 已添加')
}

const addCustomTag = () => {
  const customData = {
    user: 'test_user',
    feature: 'rum_monitoring'
  }
  customDefineTags('rum_user_info', customData)
  actionHistory.value.unshift({
    action: '自定义 Tag',
    timestamp: new Date().toLocaleString(),
    data: JSON.stringify(customData)
  })
  ElMessage.success('RUM Tag 已添加')
}

const addCustomError = () => {
  const errorData = {
    error_type: 'custom_error',
    message: '这是一个测试错误',
    stack: 'Error: 测试错误堆栈'
  }
  customDefineErrors('rum_test_error', errorData)
  actionHistory.value.unshift({
    action: '自定义 Error',
    timestamp: new Date().toLocaleString(),
    data: JSON.stringify(errorData)
  })
  ElMessage.warning('RUM Error 已添加')
}

//按钮列表
const buttonFuncList = ref([
  { label: '添加自定义 Action', type: 'primary', func: addCustomAction },
  { label: '添加自定义 Tag', type: 'success', func: addCustomTag },
  { label: '添加自定义 Error', type: 'warning', func: addCustomError }
])
</script>

<style scoped>
.rum-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
