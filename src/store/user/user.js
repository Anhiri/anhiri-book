import getUsers from '@/service/user/user'
import updateUser from '@/service/user/updateUser'
import addCart from '@/service/user/addCart'

export default {
  state: {
    userInfos: [],
    listProductCart: [],
  },
  getters: {
    userInfos: state => state.userInfos,
    listProductCart: state => state.listProductCart,
  },
  mutations: {
    // eslint-disable-next-line no-shadow
    GET_USER(state, getUser) {
      state.userInfos = getUser
      // console.log(getUser, 'user')
      // eslint-disable-next-line no-underscore-dangle
      localStorage.setItem('userId', getUser._id)
    },
    UPDATE_USER(state, user) {
      // eslint-disable-next-line no-underscore-dangle
      state.userInfos.result._id = user.id
    },
    ADD_CART(state, cart) {
      console.log(cart)
      state.userInfos.cart.unshift(cart)
    },
    GET_CART(state, cart) {
      state.listProductCart = cart
      // eslint-disable-next-line no-underscore-dangle
      state.userInfos.cart.idProduct = cart._id
    },
  },
  actions: {
    async getUserInfo({ commit }) {
      try {
        await getUsers.getUser().then(response => {
          commit('GET_USER', response.data)
        })
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
    async addCart({ commit }, cart) {
      console.log(cart)
      try {
        const response = await addCart.addCart(cart)
        const product = {
          // eslint-disable-next-line no-underscore-dangle
          idProduct: cart.product._id,
          product: cart.product,
          quantity: cart.quantity,
          data: response.data,
        }
        // console.log(product)
        commit('ADD_CART', product)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
