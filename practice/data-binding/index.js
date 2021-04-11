import Vue from 'vue'

let globalVar = 'global var' // eslint-disable-line

const app = new Vue({
  // template: `
  //   <div v-bind:class='styleClass' v-on:click='handleClick'>
  //     {{isActive ? 'active' : 'not active'}}
  //     <hr :class='styleClass' @click='handleClick'>
  //     {{arr.join('-')}}
  //     <hr>
  //     {{Date.now()}}
  //     <hr>
  //     <div v-html="newHtml"></div>
  //   </div>
  // `,
  template: `
  <div :class="{ active: !isActive}" :style="newStyle">
    <div :style="[oldStyle, newStyle]">
      {{arr.join('-')}}
      <hr>
      {{getArrJoin(arr)}}
    </div>
  </div>
`,
  data: {
    styleClass: 'aaa',
    isActive: false,
    arr: [1, 2, 3],
    newHtml: '<span>new html here</span>',
    oldStyle: {
      color: 'black'
    },
    newStyle: {
      color: 'red',
      appearance: 'none'
    }
  },
  methods: {
    handleClick () {
      console.log('click')
    },
    getArrJoin (arr) {
      return arr.join('--')
    }
  }
})

app.$mount('#root')
