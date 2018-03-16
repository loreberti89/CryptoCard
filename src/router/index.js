import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import CardDetail from '@/components/CardDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    { 
      path: '/card/:id',
      name: 'card-detail', 
      component: CardDetail,
      props: true 
    }
  ]
})
