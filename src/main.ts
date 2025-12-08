import { createApp } from 'vue'
import './styles/theme.css'
import './styles/animations.css'
import './style.css'
import App from './App.vue'
import { setupLogs, setupRum, initPosthog } from './sdk'
//引入ele
import { setupElementPlus } from './util/element'
import router from './router'

setupRum();
setupLogs();
initPosthog();

const app = createApp(App)
setupElementPlus(app)
app.use(router)
app.mount('#app')
