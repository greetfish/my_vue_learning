export default {
  updateCount (state, num) { // num 是传过来的数据
    state.count = num
  },
  updateCount2 (state, { num, num2 }) { // 传2个数据的时候，需要通过这样结构的方式来传
    state.count = num + num2
  },
  fillTodos (state, todos) {
    state.todos = todos // 需要在state里面声明todos这个变量
  },
  addTodo (state, todo) {
    state.todos.unshift(todo)
  },
  updateTodo (state, { id, todo }) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id), // 通过id找到指定位置
      1, // 删除一个节点
      todo // 在该位置插入
    )
  },
  deleteTodo (state, id) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id), // 通过id找到指定位置
      1 // 删除一个节点
    )
  },
  deleteAllCompleted (state) {
    state.todos = state.todos.filter(t => !t.completed) // 直接用所有未完成的todo去覆盖todos
  },
  doLogin (state, userInfo) {
    state.user = userInfo
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
