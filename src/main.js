// src/main.js
// import './mock/index.js';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// if (process.env.NODE_ENV === 'development') {
//      // 确保在生产环境下不启用 Mock
// }

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount('#app');
