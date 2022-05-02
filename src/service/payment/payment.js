import axios from 'axios'

const API_URL = 'http://localhost:2020'
class Payment {
  // eslint-disable-next-line class-methods-use-this
  getPayment(payment) {
    console.log(payment)
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/payment`,
      {
        cart: payment.cart,
        paymentID: payment.paymentID,
        address: payment.address,
      },
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  createPayment(payment) {
    console.log(payment)
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/payment`,
      {
        cart: payment.cart,
        paymentID: payment.paymentID,
        address: payment.address,
      },
      { headers: { Authorization: token } })
  }
}

export default new Payment()
