const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path, user: ctx.session.user } // 加个user,方便服务器端渲染时判断用户是否已登录

  try {
    const appString = await renderer.renderToString(context)

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
