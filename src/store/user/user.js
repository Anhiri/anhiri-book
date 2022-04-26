import getUsers from '@/service/user/user'
import updateUser from '@/service/user/updateUser'

export default {
  state: {
    userInfos: [],
  },
  getters: {
    userInfos: state => state.userInfos,
  },
  mutations: {
    // eslint-disable-next-line no-shadow
    GET_USER(state, getUser) {
      state.userInfos = getUser
      console.log(getUser, 'user')
      // eslint-disable-next-line no-underscore-dangle
      localStorage.setItem('userId', getUser._id)
    },
    UPDATE_USER(state, user) {
      // eslint-disable-next-line no-underscore-dangle
      state.userInfos.result._id = user.id
    },
  },
  actions: {
    async getUserInfo({ commit }) {
      try {
        // const token = localStorage.getItem('user')
        // if (token) {
        await getUsers.getUser().then(response => {
          commit('GET_USER', response.data)
          // console.log(response.data)
        })
        // }
      } catch (error) {
        console.log(error)
      }
    },
    async updateUserInfo({ commit }, user) {
      try {
        await updateUser.updateUser(user).then(response => {
          commit('UPDATE_USER', response.data)
          console.log(response.data)
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
