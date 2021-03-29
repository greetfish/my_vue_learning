// index 文件是整个项目的入口文件
// 引入vue
import Vue from 'vue'
// 引入组件
import App from './app.vue'
import './assets/styles/default.css'

// 创建vue项目的根元素
const root = document.createElement('div')
document.body.append(root)

new Vue({
  // 挂载App组件
  render: (h) => h(App)
}).$mount(root)
