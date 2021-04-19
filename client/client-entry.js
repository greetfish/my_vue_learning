import createApp from './create-app'
import bus from './util/bus'

const { app, router } = createApp() // 改为使用create-app.js来创建应用，而不是使用原本的index.js

// 监听auth事件，并重定向到login页面
bus.$on('auth', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
