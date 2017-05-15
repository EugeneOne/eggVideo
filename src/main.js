import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import map from '../router/index.js'

Vue.use(vueRouter)

const router = new vueRouter({
	routes:[...map]
})

console.log(1);
const app = new Vue({router}).$mount("#app");
// new Vue({
//   render: h => h(App)
// }).$mount('#app')
//挂载到根实例，注入router让整个应用都有路由功能
console.log(2);
