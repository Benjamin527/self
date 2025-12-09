import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 导入页面组件
import Home from '@/views/Home.vue'
import DashboardPage from '@/views/dashboard/DashboardPage.vue'
import RumPage from '@/views/rum/RumPage.vue'
import LogsPage from '@/views/logs/LogsPage.vue'
import PerformancePage from '@/views/performance/PerformancePage.vue'
import ErrorTrackingPage from '@/views/errors/ErrorTrackingPage.vue'
import NetworkPage from '@/views/network/NetworkPage.vue'
import CalligraphyPage from '@/views/calligraphy/CalligraphyPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/rum',
    name: 'RumPage',
    component: RumPage
  },
  {
    path: '/logs',
    name: 'LogsPage',
    component: LogsPage
  },
  {
    path: '/performance',
    name: 'Performance',
    component: PerformancePage
  },
  {
    path: '/errors',
    name: 'ErrorTracking',
    component: ErrorTrackingPage
  },
  {
    path: '/network',
    name: 'Network',
    component: NetworkPage
  },
  {
    path: '/calligraphy',
    name: 'Calligraphy',
    component: CalligraphyPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
