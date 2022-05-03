import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './logout/auth'
import user from './user/user'
import categories from './categories/index'
import products from './products/index'
import payment from './payment/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    user,
    categories,
    products,
    payment,
  },
  strict: process.env.DEV,
})
