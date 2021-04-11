// getters类似于computed, 方便生成一些在应用内能直接使用的数据，处理后端传来的数据后直接用于展示
export default {
  // 这个fullName方法直接在组件的computed方法中返回就能方便使用
  fullName (state) {
    return `${state.firstName} . ${state.lastName}`
  }
}
