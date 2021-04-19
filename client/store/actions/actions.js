// 因为mutations的方法只能是同步方法，异步代码只能写在actions里面
import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'
const handleError = (err) => {
  // 处理错误
  if (err.code === 401) {
    notify({
      content: '请先登录'
    })
    bus.$emit('auth') // 使用bus.js（实际上是一个vue对象）触发auth实际，并在client-entry.js中监听该事件
  }
}

export default {
  updateCountSync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos ({ commit }) {
    commit('startLoading') // 开启数据加载动画
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data) // 在mutations中中调用fillTodos方法
        commit('endLoading') // 关闭数据加载动画
      })
      .catch(err => {
        commit('endLoading') // 关闭数据加载动画
        handleError(err)
      })
  },
  addTodo ({ commit }, todo) {
    commit('startLoading') // 开启数据加载动画
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        commit('endLoading') // 关闭数据加载动画
        notify({
          content: '添加todo成功'
        })
      }).catch(err => {
        commit('endLoading') // 关闭数据加载动画
        handleError(err)
      })
  },
  updateTodo ({ commit }, { id, todo }) {
    commit('startLoading') // 开启数据加载动画
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
        commit('endLoading') // 关闭数据加载动画
      }).catch(err => {
        commit('endLoading') // 关闭数据加载动画
        handleError(err)
      })
  },
  deleteTodo ({ commit }, id) {
    commit('startLoading') // 开启数据加载动画
    model.deleteTodo(id)
      .then(() => {
        commit('deleteTodo', id)
        commit('endLoading') // 关闭数据加载动画
        notify({
          content: '删除todo成功'
        })
      }).catch(err => {
        commit('endLoading') // 关闭数据加载动画
        handleError(err)
      })
  },
  deleteAllCompleted ({ commit, state }) {
    commit('startLoading') // 开启数据加载动画
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        // console.log(ids)
        commit('deleteAllCompleted')
        commit('endLoading') // 关闭数据加载动画
        notify({
          content: '清理所有已完成todo'
        })
      }).catch(err => {
        commit('endLoading') // 关闭数据加载动画
        handleError(err)
      })
  },
  login ({ commit }, { username, password }) {
    commit('startLoading') // 开启数据加载动画
    return new Promise((resolve, reject) => { // 因为login成功后需要跳转到todos页面，所以这样写
      // eslint-disable-next-line no-debugger
      // debugger // 添加断点
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          commit('endLoading') // 关闭数据加载动画
          notify({
            content: '登录成功'
          })
          resolve() // 成功则跳转
        }).catch(err => {
          console.log('登录失败')
          commit('endLoading') // 关闭数据加载动画
          handleError(err)
          reject(err) // 失败则reject
        })
    })
  }
}
