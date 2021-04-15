import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import Notification from './components/notification'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'

import './assets/styles/default.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification) // 使用自定义的全局组件（插件）

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
