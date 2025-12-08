<template>
  <div class="rum-page page-container">
    <PageHeader
      title="RUM 监控页面"
      description="实时用户监控和性能分析"
      :icon="Monitor"
    >
      <template #actions>
        <el-button :icon="Refresh" @click="refreshPage">刷新</el-button>
      </template>
    </PageHeader>

    <div class="page-content">
      <div class="grid grid-2">
        <el-card shadow="hover" class="hover-lift">
          <template #header>
            <h3>RUM 功能演示</h3>
          </template>
          
          <p style="margin-bottom: var(--spacing-lg); color: var(--text-secondary)">
            这里展示 RUM (Real User Monitoring) 相关功能
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
            <h3>RUM 配置信息</h3>
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
      
      <UserSwitcher />
      
      <el-card class="hover-lift" style="margin-top: var(--spacing-lg)">
        <template #header>
          <h3>操作历史</h3>
        </template>
        <el-table :data="actionHistory" style="width: 100%">
          <el-table-column prop="action" label="操作" width="200" />
          <el-table-column prop="timestamp" label="时间" width="200" />
          <el-table-column prop="data" label="数据" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import { customDefineActions, customDefineTags, customDefineErrors, customDefineUserInfo } from '@/sdk/index'
import { ElMessage } from 'element-plus'
import { Monitor, Refresh } from '@element-plus/icons-vue'
import UserSwitcher from '@/components/common/UserSwitcher.vue'



const refreshPage = () => {
  ElMessage.success('页面已刷新')
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

  customDefineActions('custom', {
    test: true
  })

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

const changeCustomUser = () => {
  //随机id
  const randomUserid = Math.floor(Math.random() * 10000)

  const userInfo = {
    id: `user_${randomUserid}`,
    email: `test_${randomUserid}@example.com`,
    name: `测试用户_${randomUserid}`,
  }
  customDefineUserInfo(userInfo)
  actionHistory.value.unshift({
    action: '设置用户信息',
    timestamp: new Date().toLocaleString(),
    data: JSON.stringify(userInfo)
  })
  ElMessage.info('用户信息已设置')
}

//按钮列表
const buttonFuncList = ref([
  { label: '添加自定义 Action', type: 'primary', func: addCustomAction },
  { label: '添加自定义 Tag', type: 'success', func: addCustomTag },
  { label: '添加自定义 Error', type: 'warning', func: addCustomError },
  { label: '切换用户信息', type: 'info', func: changeCustomUser }
])
</script>

<style scoped>
.rum-page {
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
