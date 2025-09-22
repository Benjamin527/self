module.exports = {
  env: {
    node: true,  // 告诉 ESLint 这是 Node.js 环境
    browser: true, // 如果你也在浏览器中运行，启用浏览器环境
  },
  extends: [
    'eslint:recommended', // 基础推荐规则
    'plugin:vue/vue3-recommended', // Vue 3 推荐规则
    'plugin:prettier/recommended' // 使用 Prettier 的规则
  ],
  rules: {
    'indent': ['error', 2], // 强制使用两个空格缩进
    'quotes': ['error', 'single'], // 强制使用单引号
    'semi': ['error', 'always'], // 强制使用分号
    'prettier/prettier': ['error', { 'singleQuote': true, 'semi': false }], // Prettier 配置
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }], // Vue 模板中每行最多允许多少个属性
    'vue/singleline-html-element-content-newline': ['error', {
      'severity': 'warning',
      'ignoreWhenNoAttributes': false,
      'ignoreWhenNoChildren': false
    }]
  },
  parserOptions: {
    parser: 'babel-eslint' // 如果你使用的是 Babel
  }
}
