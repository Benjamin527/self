<template>
  <div class="page-header" :class="{ 'with-gradient': gradient }">
    <div class="header-content">
      <div class="header-left">
        <el-button 
          v-if="showBack"
          type="primary" 
          :icon="ArrowLeft" 
          @click="handleBack"
          class="back-button"
        >
          返回
        </el-button>
        <div class="header-title">
          <component :is="icon" v-if="icon" class="title-icon" />
          <h1>{{ title }}</h1>
        </div>
      </div>
      <div class="header-right">
        <slot name="actions"></slot>
      </div>
    </div>
    <p v-if="description" class="header-description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

interface Props {
  title: string
  description?: string
  showBack?: boolean
  icon?: any
  gradient?: boolean
}

withDefaults(defineProps<Props>(), {
  showBack: true,
  gradient: true
})

const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>

<style scoped>
.page-header {
  background: var(--bg-primary);
  padding: var(--spacing-lg) var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.page-header.with-gradient {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
}

.back-button {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}

.header-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.title-icon {
  font-size: 28px;
}

.header-title h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.page-header:not(.with-gradient) .header-title h1 {
  color: var(--text-primary);
}

.header-description {
  margin: var(--spacing-sm) 0 0 0;
  opacity: 0.9;
  font-size: 14px;
}

.page-header:not(.with-gradient) .header-description {
  color: var(--text-secondary);
}

.header-right {
  display: flex;
  gap: var(--spacing-sm);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  
  .header-right {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
