import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupLogs,setupRum } from './sdk'
//引入ele
import { setupElementPlus } from './util/element'
import router from './router'

setupRum();
setupLogs();

const app = createApp(App)
setupElementPlus(app)
app.use(router)
app.mount('#app')
