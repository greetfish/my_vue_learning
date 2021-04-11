import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div> this is {{text}}</div>',
  data: {
    text: 0
  }
})

setInterval(() => {
  app.text += 1
}, 1000)

app.$mount('#root')
// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new rander function')
// }
// console.log(app.$root)
// console.log(app.$root === app)
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// 判断是否为服务器端(用于服务器端渲染时)
// console.log(app.$isServer)
// 监听某个变化的值，变化前及变化后的值
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(newText + ':' + oldText)
// })
// setTimeout(() => {
//   unWatch()
// }, 2000)
// 事件触发，可以传值
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// 事件只触发一次，可以传值
// app.$once('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// app.$emit('test', 1, 2)
// 强制渲染一次
// app.$forceUpdate()
// app.$set(app.obj, 'a', i)
// app.$nextTick()
