import Vue from 'vue'

const component = {
  props: {
    value: String
  },
  template: `
    <div :style="style">
      这是vue自带的插槽组件： <slot></slot>
      <div class="header">
      具名插槽header： <slot name="header"></slot>
      </div>
      <div class="body">
      具名插槽body： <slot name="body"></slot>
      </div>
      <div class="other">
      具名scope插槽other： <slot name="other" value="456"></slot>
      </div>
    </div>
  `,
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

const Childcomponent = {
  template: '<div>Child component</div>'
}

new Vue({
  components: {
    CompOne: component,
    Childcomponent: Childcomponent
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
  template: `
    <div>
      <comp-one ref="comp">
        <span ref="span">this is content</span>
        <span slot="body">this is body</span>
        <span slot="header">this is header</span>
        <span slot="other" slot-scope="props">{{props.value}} {{value}}</span>
      </comp-one>
      <Childcomponent></Childcomponent>
    </div>
  `
})
