// index 文件是整个项目的入口文件
// 引入vue
import Vue from 'vue'
// 引入组件
import App from './app.vue'
import './assets/styles/default.css'
// 引入vuerouter
import VueRouter from 'vue-router'
// 引入router配置文件
import createRouter from './config/router'
// 引入store 以使用vuex
import Vuex from 'vuex'
import createStore from './store/store'

// 创建vue项目的根元素
// 因为在webpackconfig。client中使用了html模板所以不需要这样创建节点了
// const root = document.createElement('div')
// document.body.append(root)

// 使用vue-router
// 使用store
Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()

// 可以在组件中临时注册一个store模块,这样做是为了方便在用到的地方再加载，减少开销
// 该模块用法和其他模块一样
store.registerModule('module_c', {
  state: {
    text: 3
  }
})

// store.unregisterModule('module_c') // 解绑一个module
// store count值的监控
store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watched: ', newCount)
})

// 监控store中mutation函数的调用 一般用作日志记录
// store.subscribe((mutation, state) => {
//   console.log('-----', mutation.type)
//   console.log('-----', mutation.payload) // 调用时传送的参数
//   console.log('-----', state.count)
// })

// 监控store中action函数的调用 一般用作日志记录
store.subscribe((action, state) => {
  console.log('-----', action.type)
  console.log('---..', action.payload) // 调用时传送的参数
  console.log('-----', state.count)
})

// 可以给router对象设置导航守卫 每次路由切换时会执行这些导航方法
router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  // 只有next()执行之后才会真正跳转，可以进行数据校验
  // if (to.fullPath === '/app') {
  //   next('/login')
  // } else {
  //   next()
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  // 只有next()执行之后才会真正跳转
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
  // 路由跳转之后执行
})

new Vue({
  router,
  store,
  // 挂载App组件
  render: (h) => h(App)
}).$mount('#root')
