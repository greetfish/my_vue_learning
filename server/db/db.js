const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo' // 数据库名

// 构造请求的base url
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

// 错误信息处理
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  console.log(err.code)
  return err
}

// 处理请求的返回
const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  // 构造请求的头部信息
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}` // 需要这样的sha1签名的格式对接apicloud
    }
  }
  return {
    async getAllTodos () { // 向服务器请求获取所以的todos
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders() // 每次请求都getHeaders是因为密钥和时间有关系，时间太久密钥会过期
      }))
    },
    async addTodo (todo) { // 向服务器请求增加一条todo数据
      return handleRequest(await request.post(
        `/${className}`,
        todo,
        { headers: getHeaders() }
      ))
    },
    async updateTodo (id, todo) { // 向服务器请求增加一条todo数据
      return handleRequest(await request.put(
        `/${className}/${id}`,
        todo,
        { headers: getHeaders() }
      ))
    },
    async deleteTodo (id) { // 向服务器请求增加一条todo数据
      return handleRequest(await request.delete(
        `/${className}/${id}`,
        { headers: getHeaders() }
      ))
    },
    async deleteCompleted (ids) { // 向服务器请求增加一条todo数据
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(await request.post(
        '/batch',
        { requests },
        { headers: getHeaders() }
      ))
    }
  }
}
