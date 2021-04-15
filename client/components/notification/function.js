import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)

  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) { // 判断如果是服务端，则不进行dom操作
    return
  }
  const {
    autoClose,
    ...rest // 解构剩下的属性到...rest中
  } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })
  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16

  instance.verticalOffset = verticalOffset
  instances.push(instance)

  // 监听消失动画效果结束事件
  instance.vm.$on('closed', () => {
    // 执行删除节点操作 ，由closed事件触发此操作
    // eslint-disable-next-line no-debugger
    // debugger
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删除DOM节点
    instance.vm.$destroy()// 删除VM对象
  })

  // 监听关闭按钮点击事件
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })

  return instance.vm
}

export default notify
