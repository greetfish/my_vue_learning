import Vue from 'vue'

const app = new Vue({
  // 使用app.$mount('#root')与使用 el: '#root'效果等同
  // el: '#root',
  // template: '<div> this is {{text}}</div>',
  // 使用render就可以不使用template
  render (h) {
    return h('div', {}, this.text)
  },
  // 开发时可以用renderError显示本组件的rander的错误信息
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 可以捕获子组件的错误,可以在生产环境使用
  },
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  created () {
    console.log(this, 'created')
  },
  beforeMount () { // 服务端渲染时不会被调用
    console.log(this, 'beforeMount')
  },
  mounted () { // 服务端渲染时不会被调用
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () { // 在组件章节讲解
    console.log(this, 'activated')
  },
  deactivated () { // 在组件章节讲解
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  }
})
app.$mount('#root')
// setInterval(() => {
//   app.text += 1
// }, 1000)
setTimeout(() => {
  app.$destroy()
}, 1000)
