<template>
  <div class="home">
    <el-card class="main-card">
      <div>
      <DarkMode></DarkMode>
    </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" class="feature-card">
            <h3>RUM 监控</h3>
            <p>实时用户监控和性能分析</p>
            <el-button type="primary" @click="goToRum">
              进入 RUM 页面
            </el-button>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card shadow="hover" class="feature-card">
            <h3>日志监控</h3>
            <p>应用日志记录和分析</p>
            <el-button type="success" @click="goToLogs">
              进入日志页面
            </el-button>
          </el-card>
        </el-col>
      </el-row>
      
      <el-divider />
      
      <changeUser v-model = "isDark"/>
      
      
      <!-- Element Plus 示例组件 -->
      <ElementExample />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import ElementExample from '@/components/ElementExample.vue';
import changeUser from './changeUser.vue';



import { useDark } from '@vueuse/core'
  
const isDark = useDark() // 自动绑定 html.classList

const router = useRouter()

const goToRum = () => {
  router.push('/rum')
}

const goToLogs = () => {
  router.push('/logs')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.main-card {
  flex: 1;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  overflow: hidden;
  padding: 30px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.feature-card {
  text-align: center;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  margin: 0 0 10px 0;
  color: #409eff;
  font-size: 20px;
  font-weight: 600;
}

.feature-card p {
  color: #666;
  margin: 0 0 20px 0;
  font-size: 14px;
  line-height: 1.5;
}
</style>
