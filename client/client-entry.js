import createApp from './create-app'
import bus from './util/bus'

const { app, router, store } = createApp() // 改为使用create-app.js来创建应用，而不是使用原本的index.js

// 如果服务器端渲染已经加载过的数据，就不用再去请求一遍了
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 监听auth事件，并重定向到login页面
bus.$on('auth', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
