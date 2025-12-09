<template>
  <div class="home">
    <!-- 主内容区 -->
    <div class="home-content">
      <!-- 顶部工具栏 -->
      <div class="top-toolbar">
        <div class="logo-section">
          <h1 class="text-gradient">CloudCare SDK Demo</h1>
          <p>实时监控与日志分析平台</p>
        </div>
        <el-button :icon="isDark ? Sunny : Moon" @click="toggleTheme" circle size="large" />
      </div>

      <!-- 功能卡片网格 -->
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.path"
          class="feature-card hover-lift animate-fadeInUp"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="navigateTo(feature.path)"
        >
          <div class="feature-icon" :class="`icon-${feature.color}`">
            <component :is="feature.icon" />
          </div>
          <div class="feature-content">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            <div class="feature-stats">
              <span v-for="stat in feature.stats" :key="stat.label" class="stat-item">
                <strong>{{ stat.value }}</strong>
                {{ stat.label }}
              </span>
            </div>
          </div>
          <div class="feature-arrow">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
      </div>

      <!-- 用户切换区域 -->
      <div class="user-section">
        <UserSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import UserSwitcher from '@/components/common/UserSwitcher.vue'
import {
  DataAnalysis,
  Monitor,
  Document,
  TrendCharts,
  Warning,
  Connection,
  Sunny,
  Moon,
  ArrowRight,
  EditPen
} from '@element-plus/icons-vue'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()

// 功能列表
const features = ref([
  {
    path: '/dashboard',
    title: '监控仪表板',
    description: '综合监控数据可视化，实时查看应用运行状态',
    icon: DataAnalysis,
    color: 'purple',
    stats: [
      { label: '指标', value: '12+' },
      { label: '图表', value: '6' }
    ]
  },
  {
    path: '/rum',
    title: 'RUM 监控',
    description: '真实用户体验监控，追踪用户行为和性能指标',
    icon: Monitor,
    color: 'blue',
    stats: [
      { label: 'PV', value: '12.5K' },
      { label: '用户', value: '1024' }
    ]
  },
  {
    path: '/logs',
    title: '日志监控',
    description: '实时日志采集和分析，快速定位问题',
    icon: Document,
    color: 'green',
    stats: [
      { label: '今日日志', value: '8.2K' },
      { label: '错误', value: '23' }
    ]
  },
  {
    path: '/performance',
    title: '性能分析',
    description: 'Core Web Vitals 监控，优化用户体验',
    icon: TrendCharts,
    color: 'orange',
    stats: [
      { label: 'LCP', value: '2.8s' },
      { label: 'FID', value: '120ms' }
    ]
  },
  {
    path: '/errors',
    title: '错误追踪',
    description: '自动捕获和分析应用错误，提升稳定性',
    icon: Warning,
    color: 'red',
    stats: [
      { label: '总错误', value: '156' },
      { label: '严重', value: '12' }
    ]
  },
  {
    path: '/network',
    title: '网络监控',
    description: 'API 请求监控，分析接口性能和成功率',
    icon: Connection,
    color: 'cyan',
    stats: [
      { label: '请求数', value: '1.2K' },
      { label: '成功率', value: '94%' }
    ]
  },
  {
    path: '/calligraphy',
    title: '书法临摹',
    description: '在线书法临摹练习，支持田字格和多种笔触',
    icon: EditPen,
    color: 'purple',
    stats: [
      { label: '字帖', value: '1' },
      { label: '画笔', value: '3' }
    ]
  }
])

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(-45deg, #0f172a, #1e1b4b, #312e81, #0f172a);
  background-size: 400% 400%;
  animation: bg-pan 15s ease infinite;
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(0, 242, 254, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(240, 147, 251, 0.15) 0%, transparent 40%);
  pointer-events: none;
  filter: blur(40px);
}

.home-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.top-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
  color: white;
}

.logo-section h1 {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 var(--spacing-sm) 0;
  background: linear-gradient(135deg, #fff 0%, #a5f3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(0, 242, 254, 0.3);
  letter-spacing: -1px;
}

.logo-section p {
  margin: 0;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  letter-spacing: 1px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.feature-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}

.dark .feature-card {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.8);
}

.dark .feature-card:hover {
  border-color: rgba(0, 242, 254, 0.5);
  box-shadow: 0 0 30px rgba(0, 242, 254, 0.15);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transform: scaleX(0);
  transition: transform 0.4s ease;
  transform-origin: left;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.icon-purple { background: linear-gradient(135deg, #667eea, #764ba2); }
.icon-blue { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.icon-green { background: linear-gradient(135deg, #11998e, #38ef7d); }
.icon-orange { background: linear-gradient(135deg, #fa709a, #fee140); }
.icon-red { background: linear-gradient(135deg, #f093fb, #f5576c); }
.icon-cyan { background: linear-gradient(135deg, #4facfe, #00f2fe); }

.feature-content {
  flex: 1;
}

.feature-content h3 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.feature-content p {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.feature-stats {
  display: flex;
  gap: var(--spacing-md);
}

.stat-item {
  font-size: 12px;
  color: var(--text-tertiary);
  background: rgba(0, 0, 0, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
}

.dark .stat-item {
  background: rgba(255, 255, 255, 0.05);
}

.stat-item strong {
  color: var(--primary-color);
  margin-right: 4px;
  font-weight: 700;
}

.feature-arrow {
  font-size: 24px;
  color: var(--text-tertiary);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-10px);
}

.feature-card:hover .feature-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--primary-color);
}

.user-section {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.dark .user-section {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .home {
    padding: var(--spacing-lg);
  }

  .logo-section h1 {
    font-size: 36px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    flex-direction: column;
    text-align: center;
    padding: var(--spacing-lg);
  }

  .feature-arrow {
    display: none;
  }
}
</style>
