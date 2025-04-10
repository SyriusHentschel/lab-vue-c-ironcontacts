import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './AppPinia.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')