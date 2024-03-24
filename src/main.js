import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api';
createApp(App).use(router).use(router).mount('#app')
