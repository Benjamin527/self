<template>
  <div class="stat-card" :class="[color, { 'animate-fadeInUp': animate }]">
    <div class="stat-icon">
      <component :is="icon" v-if="icon" class="icon" />
    </div>
    <div class="stat-content">
      <div class="stat-label">{{ label }}</div>
      <div class="stat-value">{{ formattedValue }}</div>
      <div v-if="trend" class="stat-trend" :class="trendClass">
        <el-icon><component :is="trendIcon" /></el-icon>
        <span>{{ trend }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'

interface Props {
  label: string
  value: number | string
  icon?: any
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  trend?: string
  trendUp?: boolean
  animate?: boolean
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  animate: true,
  suffix: ''
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString() + props.suffix
  }
  return props.value
})

const trendClass = computed(() => {
  return props.trendUp ? 'trend-up' : 'trend-down'
})

const trendIcon = computed(() => {
  return props.trendUp ? ArrowUp : ArrowDown
})
</script>

<style scoped>
.stat-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all var(--transition-base);
  border-left: 4px solid var(--primary-color);
}

.stat-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.stat-card.primary {
  border-left-color: var(--primary-color);
}

.stat-card.success {
  border-left-color: var(--success-color);
}

.stat-card.warning {
  border-left-color: var(--warning-color);
}

.stat-card.danger {
  border-left-color: var(--danger-color);
}

.stat-card.info {
  border-left-color: var(--info-color);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.stat-card.primary .stat-icon {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
}

.stat-card.success .stat-icon {
  background: linear-gradient(135deg, #67c23a, #85ce61);
  color: white;
}

.stat-card.warning .stat-icon {
  background: linear-gradient(135deg, #e6a23c, #f0c78a);
  color: white;
}

.stat-card.danger .stat-icon {
  background: linear-gradient(135deg, #f56c6c, #f89898);
  color: white;
}

.stat-card.info .stat-icon {
  background: linear-gradient(135deg, #409eff, #79bbff);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  font-size: 12px;
}

.trend-up {
  color: var(--success-color);
}

.trend-down {
  color: var(--danger-color);
}

.icon {
  width: 1em;
  height: 1em;
}
</style>
