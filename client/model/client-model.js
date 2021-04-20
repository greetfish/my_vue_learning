// 封装一个客户端发送请求的包，用来给nodeserver发请求
// 此处的export里面的方法由store里面的actions中的方法调用
import axios from 'axios'
import { createError } from './util'

const request = axios.create({
  // 这样写目的在于服务器端渲染时获取数据，/前不会自动加上http://127.0.0.1:3333/， 这样就可以自己给自己发请求了。
  // 但是，这样存在问题是，自己给自己发请求，就拿不到cookie了，没有办法判断当前这个请求有么有登录
  // baseURL: process.env.VUE_ENV === 'server' ? 'http://127.0.0.1:3333/' : '/'
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch(err => {
      const resp = err.response
      if (resp.status === 401) {
        reject(createError(401, 'need auth'))
      }
    })
  })
}

export default {
  getAllTodos () {
    return handleRequest(request.get('/api/todos'))
  },
  login (username, password) {
    return handleRequest(request.post('/user/login', { username, password }))
  },
  updateTodo (id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  createTodo (todo) {
    return handleRequest(request.post('/api/todo', todo))
  },
  deleteTodo (id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompleted (ids) {
    return handleRequest(request.post('/api/delete/completed', { ids }))
  }
}
