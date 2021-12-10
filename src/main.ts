import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import VueCropper from 'vue-cropper';
import 'vue-cropper/dist/index.css'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueCropper)

app.use(ElementPlus)
app.mount('#app')