import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter} from './router'

const app = createApp(App)
const router = createRouter(app)
app.use(router)

app.mount('#app')
