import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import router from './router'
import store from './store'
import config from '@/config'
import 'iview/dist/styles/iview.css'
import './assets/styles/index.less'
import './libs/filters'

Vue.use(iView)

Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
