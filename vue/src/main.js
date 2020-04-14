import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'

let serverUrl = window.location.host;
const isProduction = process.env.NODE_ENV === 'production'
if (isProduction) {
  console.log("is production");
}else {
  console.log("is not production");
  serverUrl = "192.168.8.30:3000"
}

// Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(new VueSocketIO({
  debug: false,
  connection: serverUrl,
  vuex: {
  }
}))


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
