import Vue from 'vue'
import 'vue-tsx-support/enable-check'
// import 'vue-tsx-support/options/allow-unknown-props'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import AutoStorage from 'vue-auto-storage'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(iView)
Vue.use(AutoStorage)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
