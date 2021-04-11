export default {
  updateCount (state, num) { // num 是传过来的数据
    state.count = num
  },
  updateCount2 (state, { num, num2 }) { // 传2个数据的时候，需要通过这样结构的方式来传
    state.count = num + num2
  }
}
