import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import JinchuSchool from '@/components/jinchuSchool'
import JieduanVital from '@/components/jieduanVital'
import TemperatureVital from '@/components/temperatureVital'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: JinchuSchool
    },
    {
      path:'/jinchuSchool',
      name:'jinchuSchool',
      component:JinchuSchool
    },
    {
      path:'/jieduanVital',
      name:'jieduanVital',
      component:JieduanVital
    },
    {
      path:'/temperatureVital',
      name:'temperatureVital',
      component:TemperatureVital
    }
  ]
})
