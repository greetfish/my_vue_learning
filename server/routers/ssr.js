const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
// const VueServerRender = require('vue-server-renderer')
const VueServerRender = require('vue-server-renderer/build.dev') // 因为手动修改了build.dev中的代码，所以不能使用编译后的代码
const clientManifest = require('../../public/vue-ssr-client-manifest.json')

const serverRender = require('./server-render')

const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
