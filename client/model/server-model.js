const config = require('../../app.config')
const createDb = require('../../server/db/db')

const db = createDb(config.db.appId, config.db.appKey)

// 把服务器端渲染过程中要用到的数据相关的api放这里，基本都是get相关的api
export default {
  getAllTodos () {
    return db.getAllTodos()
  }
}
