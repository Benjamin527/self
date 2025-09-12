import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupLogs,setupRum } from './sdk';

setupRum();
setupLogs();

createApp(App).mount('#app')
