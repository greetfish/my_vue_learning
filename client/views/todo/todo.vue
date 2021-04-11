<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么"
      @keyup.enter="addTodo"
    />
    <tabs
    :filter="filter"
    :todos="todos"
    @toggle="toggleFilter"
    @clearall="doClear"
    ></tabs>
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
      @item_change="itemChange"
    ></item>
    <!-- <router-view /> -->
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
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
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(
        this.todos.findIndex((todo) => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    doClear () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    itemChange (id) {
      const tempThis = this
      this.todos[tempThis.todos.findIndex((todo) => todo.id === id)].completed = !tempThis.todos[tempThis.todos.findIndex((todo) => todo.id === id)].completed
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
</style>
