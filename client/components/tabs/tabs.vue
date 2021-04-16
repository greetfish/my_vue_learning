<script>
import TabContainer from './tab-container.vue'
export default {
  name: 'tabs',
  components: {
    TabContainer
  },
  provide () { // provide中的属性可以在自组件中拿到
    return {
      value: this.value
    }
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  },
  data () {
    return {
      panes: []
    }
  },
  render () { // 里面写jsx
    const paneses = [...this.panes]
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          {this.$slots.default}
        </ul>
        <tab-container panes={paneses}></tab-container>
      </div>
    )
  }
}
</script>

<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
</style>
