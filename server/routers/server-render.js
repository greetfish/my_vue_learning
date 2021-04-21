const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path, user: ctx.session.user } // 加个user,方便服务器端渲染时判断用户是否已登录

  try {
    const appString = await renderer.renderToString(context) // 这一步就是渲染出html

    if (context.router.currentRoute.fullPath !== ctx.path) {
      // 因为如果没有登录的话，todo的asyncData方法会替换掉router.currentRoute.fullPath为'/login'
      // 进行redirect操作，这样的话，用户就不会先看到todos页面再看到自动跳转login页面的过程，提升用户体验
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      // 相当于把state存储到网页节点中了
      inistlState: context.renderState() // 会在服务器端渲染后的网页源码中生成一个window.__INITIAL_STATE__变量保存渲染前请求的state数据
    })

    ctx.body = html
  } catch (error) {
    console.log('render error', error)
    throw error
  }
}
