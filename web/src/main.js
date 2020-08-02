import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
import ('./style.scss')
import ('./assets/iconfont/iconfont.css')
import axios from 'axios'
Vue.prototype.$http=axios.create({
  baseURL:'http://192.168.0.104:3000/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
