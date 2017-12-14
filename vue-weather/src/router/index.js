import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import First from '@/components/first/first'
import Second from '@/components/second/second'
import Third from '@/components/third/third'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: Index
    },
    {
      path: '/first',
      name: 'firstpage',
      component: First
    },
    {
      path: '/second',
      name: 'second page is here',
      component: Second
    },
    {
      path: '/third',
      name: 'third',
      component: Third
    }
  ]
})
