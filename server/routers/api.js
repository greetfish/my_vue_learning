const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

// 这个方法当作路由请求方法里面的参数，当作中间件使用，会被按顺序执行
const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = '需要登录后才能操作'
  } else {
    await next()
  }
}
// apiRouter.use(validateUser) // 也可以给每个请求方法前都加上判断是否登录的逻辑

const successResponse = (data) => {
  return {
    success: true,
    data: data
  }
}

apiRouter
  .get('/todos', validateUser, async (ctx) => { // 获取所以todos
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', validateUser, async (ctx) => { // 创建一个todo
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', validateUser, async (ctx) => { // 更新一个todo
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', validateUser, async (ctx) => { // 删除一个todo
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/delete/completed', validateUser, async (ctx) => { // 删除所有已完成的todo
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
