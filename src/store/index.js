import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import cashier from './module/carshier'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    cashier
  }
})
