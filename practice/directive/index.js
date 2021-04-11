import Vue from 'vue'

const app = new Vue({
  template: `
  <div>
  不解析{{}} :<a v-pre>{{text}}</a>
  <br>
  v-once :<a v-once>{{text}}</a>
    <p v-text="text"></p>
    <div v-show="false">v-show content</div>
    <div v-if="false" v-html="newHtml"></div>
    <div v-else v-html="oldHtml"></div>
    <ul>
      <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
    </ul>
    <ul>
      <li v-for="(val, key, index) in obj">{{val}}:{{key}}:{{index}}</li>
    </ul>
    数字类型
    <input type="text" v-model.number="text">
    鼠标失去焦点的时候再变化
    <input type="text" v-model.lazy="text">
    去除空格
    <input type="text" v-model.trim="text">
    <div>复选框
      <input type="checkbox" :value="1" v-model="arr">
      <input type="checkbox" :value="2" v-model="arr">
      <input type="checkbox" :value="3" v-model="arr">
    </div>
    <div>单选框
      <input type="radio" value="1" v-model="picked">
      <input type="radio" value="2" v-model="picked">
      <input type="radio" value="3" v-model="picked">
    </div>
  </div>
`,
  data: {
    active: 'true',
    text: 0,
    newHtml: '<a>this is new html</a>',
    oldHtml: '<a>this is old html</a>',
    // 循环时使用:key指定key，方便指向数据，减少性能开销,用index当作key可能出问题
    arr: [2, 3],
    obj: {
      a: '11',
      b: '22',
      c: '33'
    },
    picked: ''
  }
})

app.$mount('#root')
