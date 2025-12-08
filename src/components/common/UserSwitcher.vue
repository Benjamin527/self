<template>
  <el-card class="user-switcher hover-lift">
    <template #header>
      <div class="card-header">
        <h3>切换当前用户</h3>
        <el-tag size="small" effect="plain">模拟不同用户身份</el-tag>
      </div>
    </template>
    
    <div class="avatars-container">
      <div 
        v-for="user in users" 
        :key="user.id" 
        class="user-item"
        @click="changeUser(user)"
      >
        <el-avatar 
          :size="64" 
          :src="user.avatar" 
          :class="{ 'active': currentUser === user.id }"
          class="user-avatar"
        />
        <span class="user-name">{{ user.name }}</span>
        <span class="user-role">{{ user.role }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { customDefineUserInfo } from '@/sdk/index'
import { ElMessage } from 'element-plus'

const currentUser = ref('')

const users = [
  {
    id: 'user_deer',
    name: 'Test Deer',
    role: 'Admin',
    avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    id: 'user_horse',
    name: 'Test Horse',
    role: 'Editor',
    avatar: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  },
  {
    id: 'user_tiger',
    name: 'Test Tiger',
    role: 'Viewer',
    avatar: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
  },
  {
    id: 'user_fox',
    name: 'Test Fox',
    role: 'Guest',
    avatar: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
  }
]

const changeUser = (user: any) => {
  currentUser.value = user.id
  
  // 随机生成一些额外信息
  const randomId = Math.floor(Math.random() * 10000)
  
  const userInfo = {
    id: user.id,
    email: `${user.id}_${randomId}@example.com`,
    name: user.name,
    role: user.role
  }
  
  customDefineUserInfo(userInfo)
  ElMessage.success(`已切换为用户: ${user.name}`)
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.avatars-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-sm);
}

.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform var(--transition-base);
}

.user-item:hover {
  transform: translateY(-4px);
}

.user-avatar {
  border: 3px solid transparent;
  transition: all var(--transition-base);
  margin-bottom: var(--spacing-sm);
}

.user-item:hover .user-avatar {
  box-shadow: var(--shadow-md);
}

.user-avatar.active {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.user-role {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
