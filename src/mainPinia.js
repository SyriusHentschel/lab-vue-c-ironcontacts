import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './AppPinia.vue'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')