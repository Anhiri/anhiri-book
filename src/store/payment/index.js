import Payment from '@/service/payment/payment'

export default {
  state: {
    listPayment: [],
  },
  getters: {
    listPayment: state => state.listPayment,
  },
  mutations: {
    // eslint-disable-next-line no-shadow
    GET_PAYMENT(state, payment) {
      state.listPayment = payment
      console.log(state.listPayment, 'payment')
    },
    CREATE_PAYMENT(state, payment) {
      console.log(payment, 'mutation')
      state.listPayment = state.listPayment.unshift(payment)
    },
  },
  actions: {
    async getPayment({ commit }) {
      try {
        await Payment.getPayment().then(response => {
          commit('GET_PAYMENT', response.data)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async createPayment({ commit }, payment) {
      try {
        await Payment.createPayment(payment)
          .then(response => {
            const newPayment = {
              cart: payment.cart,
              phoneNumber: payment.phoneNumber,
              address: payment.address,
              name: payment.name,
              data: response.data,
            }
            commit('CREATE_PAYMENT', newPayment)
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
