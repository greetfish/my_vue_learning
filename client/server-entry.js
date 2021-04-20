import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }

      // 可以这样在服务器渲染时调用组件内声明的方法，来达到把数据获取完成之后再进行渲染的效果
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
        console.log(data)
        context.meta = app.$meta()
        resolve(app)
      })
    })
  })
}
