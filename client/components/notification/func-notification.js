// 继承并扩展组件
import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimmer()
  },
  methods: {
    createTimmer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      console.log('clear TIMMER')
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () { // 动画有改变的时候传递去除的组件的实际高度
      // eslint-disable-next-line no-debugger
      // debugger // 添加断点检测是否进入了afterEnter方法
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory () {
    this.clearTimer()
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  }
}
