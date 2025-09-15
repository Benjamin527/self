<template>
  <div class="element-example">
    <h2>Element Plus 按需引入示例</h2>
    
    <!-- 自动引入的组件，无需手动导入 -->
    <el-button type="primary" @click="showMessage">点击我</el-button>
    <el-button type="success" @click="showNotification">显示通知</el-button>
    
    <el-input 
      v-model="inputValue" 
      placeholder="请输入内容"
      style="margin: 10px 0; width: 300px;"
    />
    
    <el-table :data="tableData" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="age" label="年龄" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
    
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="10"
      :total="100"
      layout="prev, pager, next"
      style="margin-top: 20px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'

const inputValue = ref('')
const currentPage = ref(1)

const tableData = ref([
  { name: '张三', age: 25, address: '北京市朝阳区' },
  { name: '李四', age: 30, address: '上海市浦东新区' },
  { name: '王五', age: 28, address: '广州市天河区' }
])

const showMessage = () => {
  ElMessage.success('这是一个成功消息！')
}

const showNotification = () => {
  ElNotification({
    title: '通知标题',
    message: '这是一个通知消息',
    type: 'info'
  })
}
</script>

<style scoped>
.element-example {
  padding: 20px;
}
</style>
