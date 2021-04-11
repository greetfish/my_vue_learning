import Vue from 'vue'

// 创建一个组件对象
const component = {
  // 定义组件的被使用时的行为
  props: {
    active: Boolean, // 可作为组件的变量传入
    propOne: String
  },
  template: `
    <div>{{text}}<br>
      <span v-show="active">show if active true</span>
      <br>
      <span>{{propOne}}</span>
    </div>`,
  data () {
    return {
      text: 'this is a component'
    }
  },
  mounted () {
    console.log('-----comp mounted method')
  }
}

const CompVue = Vue.extend(component)

const app = new CompVue({
  propsData: { // 通过这样来传递props变量
    active: true
  },
  data: {
    text: '456' // 可以覆盖组子件中的变量值
  },
  mounted () {
    // 生命周期方法不会被覆盖，两个mounted方法都会被执行,且有先后顺序
    console.log('-----instance mounted method')
  }
})

const componet2 = {
  extends: component, // 也可以通过新建组件来继承其他组件并做定制
  data () {
    return {
      text: 2
    }
  },
  mounted () {
    console.log('-----comp2 mounted')
  }
}
const app2 = new Vue({
  components: {
    Comp: componet2
  },
  template: '<comp></comp>'
})
// app.$mount('#root')
console.log(app)
app2.$mount('#root')
