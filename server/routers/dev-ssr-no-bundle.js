// 另一种实现服务器渲染的方式 ，略不同于dev-ssr.js
// 但是使用这种方式的服务器端渲染，不能异步加载组件，只能写同步组件，意思就是routes.js里面的写法不能在一个路由方法里面单独import组件，只能在该文件的顶部统一引入
// 但是上述问题，在正式环境不存在该问题
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

const NativeModule = require('module')
const vm = require('vm')

const serverCompile = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompile.outputFileSystem = mfs

let bundle
serverCompile.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson
  if (stats.errors || stats.warnings) {
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))
  }

  const bundlePath = path.join(
    serverConfig.output.path,
    // 'vue-ssr-server-bundle.json'
    'server-entry.js'
  )

  delete require.cache[bundlePath]
  // 下面两行代码，测试不从mfs运行服务端渲染时的routes的异步加载组件的功能能否正常，，当然下面的try里面的代码要注释掉
  // delete require.cache[bundlePath]
  // bundle = require('../../server-build/server-entry.js').default
  // 换一种服务器端渲染方式
  try {
    const m = { exports: {} }
    const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
    const wrapper = NativeModule.wrap(bundleStr)
    const script = new vm.Script(wrapper, {
      filename: 'server-entry.js',
      displayErrors: true
    })
    const result = script.runInThisContext()
    result.call(m.exports, m.exports, require, m)
    bundle = m.exports.default // 其实这里的m.exports.default,就是文件server-entry.js exports出来的东西
  } catch (err) {
    console.error('compile js error: ', err)
  }

  // bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '稍等，服务端正准备渲染环境'
    return
  }

  const clientManifestResp = await axios.get( // 获取devserver打包的js的文件
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer.createRenderer({
    inject: false,
    clientManifest
  })

  // await serverRender(ctx, renderer, template)
  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
