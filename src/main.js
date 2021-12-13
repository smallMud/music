import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import Loading from './plugin/loading/index'
Vue.use(VueLazyload, {
  loading: require('./assets/images/account_163@3x.png'),
})
Vue.use(Loading, {
  title: '正在加载...'
})
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
