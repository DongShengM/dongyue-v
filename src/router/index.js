import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import JinchuSchool from '@/components/jinchuSchool'
import JieduanVital from '@/components/jieduanVital'
import TemperatureVital from '@/components/temperatureVital'
import TemperatureData from '@/components/temperatureData'
import MoveStep from '@/components/moveStep'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,

    },
    {
      path:'/jinchuSchool',
      name:'jinchuSchool',
      component:JinchuSchool,
      meta:{
        requireAuth:true
      }
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
    },
    {
      path:'/temperatureData',
      name:'temperatureData',
      component:TemperatureData
    },
    {
      path:'/moveStep',
      name:'moveStep',
      component:MoveStep
    }

  ]
})

//
router.beforeEach((to,from,next)=>{
  /* if (to.matched.some(res => res.meta.requireAuth)) {
   if (localStorage.getItem('token')){
   next()
   }else {
   window.location.href = 'https://www.baidu.com'
   }
   }else{
   next()
   }*/

  console.log(window.location.search)
  next()




  // window.location.href = 'https://www.baidu.com'
})


export default router
