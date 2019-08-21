import Vue from 'vue'
import Router from 'vue-router'
import Renderer from './Renderer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/renderer'
    },
    {
      path: '/renderer',
      name: 'renderer',
      component: Renderer
    },
    {
      path: '/builder',
      name: 'builder',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './Builder/Index')
    }
  ]
})
