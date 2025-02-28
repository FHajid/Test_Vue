import './assets/main.css'
import i18n from './assets/i18n.js'; // Import the i18n instance
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(i18n);
app.use(router)
app.use(createPinia())
app.mount('#app')
