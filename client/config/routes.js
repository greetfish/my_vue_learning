import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // 异步加载组件 ，不在本配置文件的头部import组件，而是在这里import
    component: Todo
  },
  {
    name: 'app',
    path: '/app/:id/kkk',
    // 通过props: true配置吗可以直接将path中的 :id参数传递到Todo中去，就不要$route来使用了,建议这样用
    props: true,
    // component: Todo,
    // 异步加载组件 ，不在本配置文件的头部import组件，而是在这里import
    component: Todo,
    // 如果有多个router-view的话 ，这样的情况可以适合根据不同路由切换不同的导航或者头部
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    // 页面的元信息，方便seo
    meta: {
      title: 'this is an app',
      description: 'asdfghjkl'
    }
    // 子路由，格式和路由差不多
    // 子路由对应的组件只能在父组件的template的router-view中展示
    // children: [
    //   {
    //     path: 'children1',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    // component: Login,
    // 异步加载组件 ，不在本配置文件的头部import组件，而是在这里import
    component: Login,
    // 此处也可以设置导航守卫方法
    beforeEnter (to, from, next) {
      console.log('login route before enter')
      next()
    }
  },
  {
    path: '/login/exact',
    // component: Login,
    // 异步加载组件 ，不在本配置文件的头部import组件，而是在这里import
    component: Login
  }
]
