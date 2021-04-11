// 因为mutations的方法只能是同步方法，异步代码只能写在actions里面
export default {
  updateCountSync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  }
}
