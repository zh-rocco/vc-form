import Vue from 'vue'
import Router from 'vue-router'
import Example from './Example'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/example'
    },
    {
      path: '/example',
      name: 'example',
      component: Example
    },
    {
      path: '/builder',
      name: 'builder',
      component: () => import(/* webpackChunkName: "builder" */ './Builder/Index')
    }
  ]
})
