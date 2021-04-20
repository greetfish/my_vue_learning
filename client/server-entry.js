import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 如果用户已登录，则在服务器端渲染时，给store.state.user赋值，目的时为了根据用户是否已登录决定是否渲染某些数据
    if (context.user) {
      store.state.user = context.user // 这样在todo.vue的asyncData方法中才能判断用户是否已登录
    }

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }

      // 可以这样在服务器渲染时调用组件内声明的方法，实现把数据获取完成之后再进行服务器端渲染的效果
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            store
          })
        } else {
          console.log('has no function asyncData')
          return null
        }
      })).then(data => {
        // console.log(store.state)
        context.meta = app.$meta()
        context.state = store.state // 会在服务器端渲染后的网页源码中生成一个window.__INITIAL_STATE__变量保存渲染前请求的state数据
        resolve(app)
      })
    })
  })
}
