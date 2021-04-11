import Vue from 'vue'

let globalVar = 'global var' // eslint-disable-line

const app = new Vue({
  template: `
  <div>
  <span>FullName: {{getFullName}}</span>
  <hr>
  <span>nowName: {{nowName}}</span>
  <hr>
  <span>Number: {{number}}</span>
  <p>LastName :<input type="text" v-model="lastName"></p>
  <p>Number :<input type="text" v-model="number"></p>
  <p>name :<input type="text" v-model="name"></p>
  <p>firsrtName :<input type="text" v-model="firstName"></p>
  </div>
`,
  data: {
    firstName: 'john',
    lastName: 'snow',
    nowName: ' ',
    number: 0
  },
  computed: {
    getFullName () {
      console.log('get full name')
      return `${this.firstName} ${this.lastName}`
    },
    name: {
      get () {
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    // 在watch中不要去修改被监听的值，避免死循环，应该处理成一个新的属性或者与监听对象无关的属性
    // *
    // firstName (newName, oldName) {
    //   this.nowName = newName + ' ' + this.lastName
    // }
    // 如果要在一开始绑定的时候默认执行一次，而不是等到数据变化再执行，需要像下面这样设置immediate: true
    firstName: {
      handler (newstr, oldstr) {
        this.nowName = newstr + ' ' + this.lastName
      },
      immediate: true, // 用于在一开始加载时自动触发一次监听事件，不用等到监听对象发生改变
      deep: true // 用于监听对象时同时监听该对象内部的属性 ，当然也可以直接监听 'object.a'对象内部属性
    }
  }
})

app.$mount('#root')
