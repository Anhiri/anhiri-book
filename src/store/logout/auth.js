/* eslint-disable no-shadow */
// import { userSetter } from 'core-js/library/es6/symbol'
import AuthService from '../../service/auth'

// const user = JSON.parse(localStorage.getItem('auth'))
// const initialState = user
//   ? { status: { loggedIn: true }, user }
//   : { status: { loggedIn: false }, user: null }

export default {
  state: {
    // initialState,
    loginStatus: {},
    registerStatus: {},
    userLoggedIn: false,
  },
  getters: {
    loginStatus: state => state.loginStatus,
    registerStatus: state => state.registerStatus,

  },
  mutations: {
    // setToken(state, token) {
    //   state.token = token
    // },
    LOGIN_SUCCESS(state, data) {
      state.loginStatus.status = true
      state.userLoggedIn = !!(data.accesstoken)
      localStorage.setItem('user', data.accesstoken)
      // console.log(data, 'aaaaaaa')
    },
    LOGIN_FAILED(state, error) {
      state.loginStatus.error = error.msg
    },
    LOGOUT() {
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
    },
    REGISTER_SUCCESS(state, data) {
      state.registerStatus.status = true
      localStorage.setItem('user', data.accesstoken)
    },
    REGISTER_FAILED(state, error) {
      state.registerStatus.error = error.msg
    },
  },
  actions: {
    // setToken({ commit }, token) {
    //   commit('setToken', token)
    // },
    async login({ commit }, user) {
      try {
        const { data } = await AuthService.login(user)
        commit('LOGIN_SUCCESS', data)
      } catch (error) {
        // console.log(error, 'error')
        commit('LOGIN_FAILED', error)
      }
    },
    async logout({ commit }) {
      commit('LOGOUT')
    },
    // async register({ commit }, user) {
    //   try {
    //     const { data } = await AuthService.login(user)
    //     commit('REGISTER_SUCCESS', data)
    //   } catch (error) {
    //     commit('REGISTER_FAILED', error)
    //   }
    // },
    async register({ commit }, user) {
      try {
        await AuthService.register(user).then(
          response => {
            commit('REGISTER_SUCCESS', response.data)
          },
          console.log('register'),
        )
      } catch (error) {
        commit('REGISTER_FAILED', error)
        console.log('register fail')
      }
    },
  },
}
