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
