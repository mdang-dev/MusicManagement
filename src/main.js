import '@/assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap-icons/icons/bootstrap.svg'
import Vue3Apexcharts from 'vue3-apexcharts';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

const app = createApp(App);
app.use(router);
app.use(Vue3Apexcharts);
app.mount('#app');

