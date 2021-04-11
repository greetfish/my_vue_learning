import Vue from 'vue'

const component = {
  props: {
    value: String
  },
  // template: `
  //   <div :style="style">
  //     这是vue自带的插槽组件： <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement('div', { // 创建出来的并不是真正的html节点，而是v-node 能被vue管理
      style: this.style
    }, this.$slots.default)
  },
  data () {
    return {
      style: {
        width: '600px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span) // 打印出来一个是组件，一个是html的代码
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `,
  render (createElement) { // 自实现和template一样的节点挂载效果，因为template最终也是使用render方法挂载的节点
    return createElement(
      'comp-one',
      {
        ref: 'comp'
      },
      [
        createElement(
          'span',
          {
            ref: 'span'
          }, this.value)
      ])
  }
})
