import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const router = createRouter(app)

app.mount('#app')
