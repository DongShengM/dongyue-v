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
import './common/css/icon2.css'

// Vue.prototype.jianfan=jianfan
Vue.config.productionTip = false

import axios from 'axios'
import $ from 'jquery'
import Cookies from 'js-cookie'

Vue.prototype.$axios = axios
//全域url代理
//axios.defaults.baseURL = 'http://101.201.144.206:2002/dy-heat/'
//axios.defaults.baseURL = 'http://t.jiankangtiyu.com/dy-heat'

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//设置请求base
//axios.defaults.baseURL
//异步请求前
// axios.interceptors.request.use(config=>{
//   if (Cookies.get('token')) {
//     config.headers.token = Cookies.get('token');
//   }
//     console.log("储存cookie"+Cookies.get('token'));
//     return config;
//   },err=>{
//     console.log("请求失败")
//   })


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


// axios.interceptors.request.use(
//   config=>{
//     if (localStorage.token){
//       //config.headers.token = 'c8d16b9b630220e5a40ea13be25eac46'
//       console.log("发送请求拦截");
//       if (Cookies.get('token')) {
//         config.headers.token = Cookies.get('token');
//       }
//     }
//     return config
//   },
//   error=>{
//     return Promise.reject(error)
//   }
// )
axios.interceptors.request.use(
  config=>{
    //console.log("发送请求拦截");
    console.log(config);
    //添加token
    console.log(Cookies.get('token'))
    if(Cookies.get('token')){
      config.headers.token = Cookies.get('token');
    }
    return config
  },
  error=>{
    return Promise.reject(error)
  }
)
