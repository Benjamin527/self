import dayjs from 'dayjs'

// 生成随机数
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成随机浮点数
export function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
}

// 生成性能数据
export function generatePerformanceData(count: number = 20) {
  const now = Date.now()
  return Array.from({ length: count }, (_, i) => ({
    timestamp: dayjs(now - (count - i) * 60000).format('HH:mm'),
    pageLoad: randomInt(800, 3000),
    apiResponse: randomInt(100, 800),
    lcp: randomFloat(1.5, 4.0),
    fid: randomFloat(50, 300, 0),
    cls: randomFloat(0.05, 0.25, 3)
  }))
}

// 生成日志数据
export function generateLogData(count: number = 50) {
  const levels = ['info', 'warn', 'error', 'debug']
  const messages = [
    '用户登录成功',
    'API请求完成',
    '数据加载中',
    '页面渲染完成',
    '网络请求超时',
    '资源加载失败',
    '表单验证错误',
    '数据保存成功',
    '缓存更新',
    '用户操作记录'
  ]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `log-${i}`,
    level: levels[randomInt(0, levels.length - 1)],
    message: messages[randomInt(0, messages.length - 1)],
    timestamp: dayjs().subtract(randomInt(0, 3600), 'second').format('YYYY-MM-DD HH:mm:ss'),
    data: {
      userId: `user_${randomInt(1000, 9999)}`,
      page: `/page${randomInt(1, 5)}`,
      userAgent: 'Mozilla/5.0...'
    }
  }))
}

// 生成错误数据
export function generateErrorData(count: number = 30) {
  const errorTypes = ['TypeError', 'ReferenceError', 'NetworkError', 'ApiError', 'ValidationError']
  const errorMessages = [
    'Cannot read property of undefined',
    'Network request failed',
    'API返回错误: 500',
    '表单验证失败',
    '资源加载超时',
    '数据格式错误',
    '权限验证失败'
  ]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `error-${i}`,
    type: errorTypes[randomInt(0, errorTypes.length - 1)],
    message: errorMessages[randomInt(0, errorMessages.length - 1)],
    stack: 'Error: Sample error\n  at Component.vue:42\n  at handle (app.js:123)',
    timestamp: dayjs().subtract(randomInt(0, 86400), 'second').format('YYYY-MM-DD HH:mm:ss'),
    count: randomInt(1, 50),
    affectedUsers: randomInt(1, 100),
    severity: ['low', 'medium', 'high', 'critical'][randomInt(0, 3)]
  }))
}

// 生成网络请求数据
export function generateNetworkData(count: number = 40) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE']
  const endpoints = [
    '/api/users',
    '/api/products',
    '/api/orders',
    '/api/analytics',
    '/api/settings'
  ]
  const statuses = [200, 201, 204, 400, 401, 403, 404, 500, 503]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `req-${i}`,
    method: methods[randomInt(0, methods.length - 1)],
    url: endpoints[randomInt(0, endpoints.length - 1)],
    status: statuses[randomInt(0, statuses.length - 1)],
    duration: randomInt(50, 2000),
    timestamp: dayjs().subtract(randomInt(0, 3600), 'second').format('HH:mm:ss'),
    size: randomInt(100, 50000)
  }))
}

// 生成用户会话数据
export function generateSessionData(count: number = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: `session-${i}`,
    userId: `user_${randomInt(1000, 9999)}`,
    duration: randomInt(30, 1800),
    pageViews: randomInt(3, 20),
    actions: randomInt(5, 50),
    startTime: dayjs().subtract(randomInt(0, 86400), 'second').format('YYYY-MM-DD HH:mm:ss'),
    device: ['Desktop', 'Mobile', 'Tablet'][randomInt(0, 2)],
    browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][randomInt(0, 3)],
    location: ['北京', '上海', '深圳', '广州', '杭州'][randomInt(0, 4)]
  }))
}

// 生成柱状图数据
export function generateBarChartData(categories: string[], seriesCount: number = 1) {
  return {
    categories,
    series: Array.from({ length: seriesCount }, (_, i) => ({
      name: `系列${i + 1}`,
      data: categories.map(() => randomInt(10, 100))
    }))
  }
}

// 生成饼图数据
export function generatePieChartData(names: string[]) {
  return names.map(name => ({
    name,
    value: randomInt(10, 100)
  }))
}

// 生成折线图数据
export function generateLineChartData(points: number = 20, seriesCount: number = 1) {
  const xAxisData = Array.from({ length: points }, (_, i) => 
    dayjs().subtract(points - i, 'minute').format('HH:mm')
  )
  
  return {
    xAxisData,
    series: Array.from({ length: seriesCount }, (_, i) => ({
      name: `指标${i + 1}`,
      data: Array.from({ length: points }, () => randomInt(50, 200))
    }))
  }
}

// 日志级别统计
export function getLogLevelStats(logs: any[]) {
  const stats: Record<string, number> = {
    info: 0,
    warn: 0,
    error: 0,
    debug: 0
  }
  
  logs.forEach(log => {
    if (stats[log.level] !== undefined) {
      stats[log.level]++
    }
  })
  
  return Object.entries(stats).map(([name, value]) => ({ name, value }))
}
