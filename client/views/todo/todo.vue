<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="tabValue" @change="handleChangeTab">
          <tab label="tab1" index="1">
            <span>tab content 1 {{inputContent}}</span>
          </tab>
          <tab index="2" >
            <span slot="label" style="color: red">tab2</span>
            <span>tab content 2</span>
            </tab>
          <tab label="tab3" index="3">
            <span>tab content 3</span>
          </tab>
    </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      v-model="inputContent"
      placeholder="接下去要做什么"
      @keyup.enter="handleAdd"
    />
    <Helper
    :filter="filter"
    :todos="todos"
    @toggle="toggleFilter"
    @clearall="clearAllCompleted"
    ></Helper>
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
      @item_change="itemChange"
      @toggle="toggleTodoState"
    ></item>
    <!-- <router-view /> -->
  </section>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'
export default {
  metaInfo: {
    title: 'my-todo-component'
  },
  // 在组件内部也可以设置导航守卫方法
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter')
    next(vm => { // 可以通过vm拿到当前组件的this  一般来说是在这里获取数据，塞到页面当中
      console.log('after enter vm.id is ', vm.id)
    })
  },
  // 在组件内部也可以设置导航守卫方法
  beforeRouteUpdate (to, from, next) {
    console.log('todo update enter')
    next()
  },
  // 在组件内部也可以设置导航守卫方法
  beforeRouteLeave (to, from, next) {
    // 可以在leave中做一些提醒用户保存修改
    console.log('todo leave enter')
    // if (global.confirm('are you sure ?')) {
    //   next()
    // }
    next()
  },
  props: ['id'],
  mounted () {
    console.log('来自URL的传参，router自动整合到props 的id变量中: ' + this.id)
    // 因为服务器端渲染已经加载了todos数据，所以判断下没有todos数据时才去请求一遍，否则不用再次请求
    if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
  },
  // 声明一个非生命周期方法,用于在服务器端渲染时提前准备数据
  asyncData ({ store }) {
    // 判断如果登陆了，才能在服务器端渲染时获取todos数据
    if (store.state.user) {
      return store.dispatch('fetchTodos') // 返回的是todos数据
    } else {
      return Promise.resolve()
    }
  },
  data () {
    return {
      // todos: [],
      filter: 'all',
      tabValue: '1',
      inputContent: ''
    }
  },
  components: {
    Item,
    Helper
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入todo内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // deleteTodo (id) {
    //   this.todos.splice(
    //     this.todos.findIndex((todo) => todo.id === id), 1)
    // },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        // todo 需要通过深拷贝
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      // this.todos = this.todos.filter(todo => !todo.completed)
      this.deleteAllCompleted()
    },
    doClear () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    itemChange (id) {
      const tempThis = this
      this.todos[tempThis.todos.findIndex((todo) => todo.id === id)].completed = !tempThis.todos[tempThis.todos.findIndex((todo) => todo.id === id)].completed
    },
    handleChangeTab (value) {
      this.tabValue = value
    }
  }
}
</script>

<style lang="css">
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input {
  position: relative;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 #666;
  box-sizing: border-box;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px #999;
}
.tab-container {
  background-color: #fff;
  border-bottom: 2px solid #ededed;
  padding: 0 15px;
}
</style>
