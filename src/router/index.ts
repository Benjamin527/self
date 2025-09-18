import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 导入页面组件
import Home from '@/views/Home.vue'
import RumPage from '@/views/rum/RumPage.vue'
import LogsPage from '@/views/logs/LogsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
