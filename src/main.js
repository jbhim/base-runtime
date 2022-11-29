import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import { AppLaunch } from '@lib'
import matedata from '@matedata'
const app = createApp(App)
app.use(new AppLaunch(matedata.views, []))
app.mount('#app')
