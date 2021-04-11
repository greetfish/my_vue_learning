import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    // 这个设置只能在开发环境下配置，意味着编码过程中不允许在组件中直接修改store的数据，必须通过mutations方法去更新数据
    strict: isDev,
    state: defaultState, // 单独从文件引入defaultState，方便后期维护
    mutations, // 单独从文件引入mutations，方便后期维护
    getters,
    actions,
    modules: { // 使用模块功能
      module_a: { // 模块A
        namespaced: true, // 允许mutation的方法名和其他模块有重复，但是这样调用的时候需要model_a/functionName这样调用
        state: {
          text: 1
        },
        mutations: { // 允许mutation的方法名和其他模块有重复，但是这样调用的时候需要model_a/functionName这样调用
          updateText (state, text) {
            console.log('model_a.state', state)
            state.text = text
          }
        },
        getters: {
          // 第二个参数是全局的getters方法，第三个参数可以获取全局的state数据，所以也可以通过state.module_b.xxx来获取其他模块的数据
          textPlus (state, getters, rootState) {
            return state.text + 1
          }
        },
        // 所以actions也和getters一样
        actions: {
          add ({ state, commit, rootState }) {
            commit('updateText', rootState.count)
            commit('updateCount', 996, { root: true })
          }
        }
      },
      module_b: { // 模块B
        state: {
          text: 2
        }
      }
    },
    // 声明插件
    plugins: [
      (store) => {
        console.log('my store plugin invoked')
      }
    ]
  })

  if (module.hot) { // 添加store的热更新功能，以解决每次更改store代码后，前端页面都要重新刷新才生效的问题
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        actions: newActions,
        mutations: newMutations,
        getters: newGetters
      })
    })
  }
  return store
}
