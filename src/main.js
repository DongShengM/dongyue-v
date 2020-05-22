// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSlimScroll from 'vue-slimscroll'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import i18n from './i18n/i18n'
// import jianfan from './common/js/jianfan'

import './common/css/icon.css'

// Vue.prototype.jianfan=jianfan
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

Vue.use(VueSlimScroll)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})


axios.interceptors.request.use(
  config=>{
    if (localStorage.token){
      config.headers.token = 'c8d16b9b630220e5a40ea13be25eac46'
    }

    console.log(config)
    // console.log(localStorage.token)
    return config
  },
  error=>{
    return Promise.reject(error)
  }
)
