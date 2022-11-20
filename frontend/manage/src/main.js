import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue-cookies';


const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(VueCookies)

// axios.defaults.baseURL = 'http://10.186.2.215:4399/administrator'
axios.defaults.baseURL = 'http://10.186.229.65:4399/administrator'

// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.headers.common['Authorization'] = ''; 
app.config.globalProperties.$http = axios
app.config.globalProperties.$qs = qs
app.mount('#app')