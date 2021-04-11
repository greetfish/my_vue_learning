import Vue from 'vue'

// 创建一个组件对象
const component = {
  // 定义组件的被使用时的行为
  props: {
    active: Boolean, // 可作为组件的变量传入
    propOne: String,
    onChange: Function,
    prop1: {
      type: Boolean,
      require: false, // 这样定义属性为必传属性，设置为true时如果没有传会报错
      default: false, // 设置没有传值时的默认值，前提是没有被设置为必传
      validator (value) {
        // 在这里面可以自定义数据验证的方法 这样就可以去掉 type: Boolean这样的简单数据验证
        return typeof value === 'boolean'
      }
    }
  },
  template: `
    <div>{{text}}<br>
      <span v-show="active">show if active true</span>
      <br>
      <span @click="onChange">{{propOne}}</span>
      <span @click="handelChange">{{propOne}}</span>
    </div>`,
  data () {
    return {
      text: 'this is a component'
    }
  },
  methods: {
    handelChange () {
      this.$emit('change')
    }
  }
}

// Vue.component('Comp', component) // 全局使用的方式挂载组件

const app = new Vue({
  components: {
    Comp: component
  },
  data: {
    prop1: 'text-prop-one' // 单向数据流来修改组件中的props 当然也可以使用事件机制
  },
  methods: {
    handelChange () { // @change事件指向此方法 来改变prop的值实现单向数据流操作数据
      this.prop1 += 1
    }
  },
  template: '<comp :active="true" :prop-one="prop1" :on-change="handelChange" @change="handelChange"></comp>'
})
app.$mount('#root')
