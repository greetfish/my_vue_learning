(self.webpackChunkvue_ssr_tech=self.webpackChunkvue_ssr_tech||[]).push([[463],{463:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>u});const n={props:{todo:{type:Object,required:!0}},methods:{deleteTodo:function(){this.$emit("del",this.todo.id)}}};var l=o(900);const i=(0,l.Z)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{class:["todo-item ",t.todo.completed?"completed":""]},[o("input",{staticClass:"toggle",attrs:{type:"checkbox"},domProps:{value:t.todo.completed},on:{click:function(e){return t.$emit("item_change",t.todo.id)}}}),t._v(" "),o("label",[t._v(t._s(t.todo.content))]),t._v(" "),o("button",{staticClass:"destroy",on:{click:t.deleteTodo}})])}),[],!1,null,null,null).exports,s={props:{filter:{type:String,required:!0},todos:{type:Array,required:!0}},data:function(){return{states:["all","active","completed"]}},computed:{unFinishedTodoLength:function(){return this.todos.filter((function(t){return!t.completed})).length}},methods:{clearAllCompleted:function(){this.$emit("clearall")},toggleFilter:function(t){this.$emit("toggle",t)}}},r=(0,l.Z)(s,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"helper"},[o("span",{staticClass:"left"},[t._v(t._s(t.unFinishedTodoLength)+" items left")]),t._v(" "),o("span",{staticClass:"tabs"},t._l(t.states,(function(e){return o("span",{key:e,class:[e,t.filter===e?"actived":""],on:{click:function(o){return t.toggleFilter(e)}}},[t._v(t._s(e))])})),0),t._v(" "),o("span",{staticClass:"clear",on:{click:t.clearAllCompleted}},[t._v("Clear Completed")])])}),[],!1,null,null,null).exports;var d=0;const c={beforeRouteEnter:function(t,e,o){console.log("todo before enter"),o((function(t){console.log("after enter vm.id is ",t.id)}))},beforeRouteUpdate:function(t,e,o){console.log("todo update enter"),o()},beforeRouteLeave:function(t,e,o){console.log("todo leave enter"),o()},props:["id"],mounted:function(){console.log("来自URL的传参，router自动整合到props 的id变量中: "+this.id)},data:function(){return{todos:[],filter:"all"}},components:{Item:i,Tabs:r},computed:{filteredTodos:function(){if("all"===this.filter)return this.todos;var t="completed"===this.filter;return this.todos.filter((function(e){return t===e.completed}))}},methods:{addTodo:function(t){this.todos.unshift({id:d++,content:t.target.value.trim(),completed:!1}),t.target.value=""},deleteTodo:function(t){this.todos.splice(this.todos.findIndex((function(e){return e.id===t})),1)},toggleFilter:function(t){this.filter=t},doClear:function(){this.todos=this.todos.filter((function(t){return!t.completed}))},itemChange:function(t){var e=this;this.todos[e.todos.findIndex((function(e){return e.id===t}))].completed=!e.todos[e.todos.findIndex((function(e){return e.id===t}))].completed}}},u=(0,l.Z)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"real-app"},[o("input",{staticClass:"add-input",attrs:{type:"text",autofocus:"autofocus",placeholder:"接下去要做什么"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)}}}),t._v(" "),o("tabs",{attrs:{filter:t.filter,todos:t.todos},on:{toggle:t.toggleFilter,clearall:t.doClear}}),t._v(" "),t._l(t.filteredTodos,(function(e){return o("item",{key:e.id,attrs:{todo:e},on:{del:t.deleteTodo,item_change:t.itemChange}})}))],2)}),[],!1,null,null,null).exports}}]);