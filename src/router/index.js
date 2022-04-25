import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    replace:"/wro",
    children:[
      {
        path:'/users',
        name:'users',
        component:()=>import('../views/chider/users.vue')
      },
      {
        path:'/roles',
        name:'roles',
        component:()=>import('../views/chider/roles.vue')
      },
      {
        path:'/rights',
        name:'rights',
        component:()=>import('../views/chider/rights.vue')
      },
      {
        path:'/reports',
        name:'reports',
        component:()=>import('../views/chider/reports.vue')
      },
      {
        path:'/goods',
        name:'goods',
        component:()=>import('../views/chider/goods.vue')
      },
      {
        path:'/params',
        name:'params',
        component:()=>import('../views/chider/params.vue')
      },
      {
        path:'/orders',
        name:'orders',
        component:()=>import('../views/chider/orders.vue')
      },
      {
        path:'/categories',
        name:'categories',
        component:()=>import('../views/chider/categories.vue')
      },
      {
        path:'/wro',
        name:'/wro',
        component:()=>import('../views/chider/wro.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
