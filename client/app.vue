<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <p>count: {{count}}</p>
        <p>fullname: {{fullName}}</p>
        <p>textPlus = textA + 1  : {{textPlus}}</p>
        <p>textA: {{textA}}</p>
        <p>textB: {{textB}}</p>
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <router-link to="/app/2/kkk">app</router-link>
        <router-link to="/login">login</router-link>
        <!-- 可以对子路径的父link做样式识别 -->
        <router-link to="/login/exact">login exact</router-link>
        <!-- <todo></todo> -->
        <!-- 可以包个动画 transition,相应的在default.css中写相关的动画样式-->
        <transition name="fade">
            <router-view />
        </transition>
        <button @click="notify">notify演示</button>
        <!-- <notification content="test notify"></notification> -->
        <Footer></Footer>
        <!-- <router-view name="a" /> -->
    </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
// import Notification from './components/notification/notification.vue'
export default {
  metaInfo: {
    title: 'my-vue-app'
  },
  components: {
    Header,
    Footer
    // Notification
  },
  mounted () {
    // 这个方法可以打印路由传参的数据，在组件中也可以打印 ，但是不建议这样使用
    console.log(this.$route)
    // 调用store对象
    console.log(this.$store)
    // let i = 1,
    // 调用actions方法来修改store数据，类似于数据请求这样的需求写在actions中
    this.$store.dispatch('updateCountSync', {
      num: 5,
      time: 2000
    })
    // 因为在methods中使用了...mapActions来引入actions方法，所以可以直接这样用
    this.updateCountSync({
      num: 6,
      time: 3000
    })
    this.['module_a/updateText']('123') // 调用store中模块A的mutation方法
    this.['module_a/add']()
    // 调用mutations方法来修改store中的数据
    // let i = 0
    // setInterval(() => {
    //   // 使用mutations提供的修改store中数据的方法来修改数据
    //   this.$store.commit('updateCount', i++)
    //   // 如果要传入两个数据
    //   this.$store.commit('updateCount2', {
    //     num: i++,
    //     num2: 2
    //   })
    // }, 5000)
  },
  methods: {
    // 也可以通过mapMutations和mapActions来自动匹配store中相应的方法
    ...mapActions(['updateCountSync', 'module_a/add']),
    ...mapMutations(['updateCount', 'module_a/updateText']),
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close',
        autoClose: 3000
      })
    }
  },
  computed: {
    // 也可以使用mapState 和mapGetters来更方便的使用Vuex
    ...mapState(['count']),
    // 也可以这样写,换一个名字，并且可以对state中的数据做处理后输出
    ...mapState({
      counter: (state) => state.count,
      textB: state => state.module_b.text
    }),
    // count () {
    //   return this.$store.state.count // 将count与store中的count绑定
    // },
    // 也可以使用mapState 和mapGetters来更方便的使用Vuex
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'module_a/textPlus'
    }),
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    textA () { // 返回模块A的数据  当然，也可以通过上面的...mapState来匹配a模块中的数据，如textB改为了...mapstate隐射
      return this.$store.state.module_a.text
    }
    // textB () { // 返回模块B的数据
    //   return this.$store.state.module_b.text
    // }
  }
}
</script>

<style lang="css" scoped>
    #app{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    #cover{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #999;
        opacity: .9;
        z-index: -1;
    }
</style>
