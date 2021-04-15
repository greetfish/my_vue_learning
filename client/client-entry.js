import createApp from './create-app'

const { app, router } = createApp() // 改为使用create-app.js来创建应用，而不是使用原本的index.js

router.onReady(() => {
  app.$mount('#root')
})
