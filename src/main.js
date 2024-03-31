import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import { createVuetify } from 'vuetify'
import store from './store'

const app = createApp(App)
const vuetify = createVuetify({})

app.use(store)
app.use(vuetify)

app.mount('#app')

