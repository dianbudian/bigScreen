import { createApp } from 'vue';
import './style.css'
import 'element-plus/dist/index.css';
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';

import vue3SeamlessScroll from "vue3-seamless-scroll";
import other from '/@/utils/other';
const app =createApp(App)

app.use(router).use(vue3SeamlessScroll).use(ElementPlus).mount('#app');
app.config.globalProperties.$isMobile = other.isMobile();

