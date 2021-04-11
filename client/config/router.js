import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // 判断是否需要页面滚动
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    fallback: true
    // 可以定制url后面的参数转换方式  一般用不到
    // parseQuery (query) {

    // },
    // stringifyQuery (obj){

    // }
  })
}
