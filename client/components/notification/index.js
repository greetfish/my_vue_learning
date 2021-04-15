// 注册成全局组件,在create-app.js中import
import Notification from './notification.vue'
import notify from './function'

export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify // 这样加了之后，在其他组件内通过this.$nofity就可以调用了
}
