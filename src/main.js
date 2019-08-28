import Vue from 'vue'
import App from './App.vue'
import iview from 'iview'
import router from './router'
import 'iview/dist/styles/iview.css'
import './assets/styles/index.less'

Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
