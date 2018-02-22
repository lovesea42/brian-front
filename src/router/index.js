import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/homepage'
    },
    {
      path:'/homepage',
      component:resolve => require(['../components/common/Home.vue'],resolve),
      children:[
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/dashboard/Dashboard.vue'], resolve)
        },{
          path: '/booksearch',
          component:resolve => require(['../components/page/Book.vue'],resolve)
        },{
          path: '/readme',
          component: resolve => require(['../components/page/Readme.vue'], resolve)
        }
      ]
    }
  ]
})
