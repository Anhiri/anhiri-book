import axios from 'axios'

const API_URL = 'http://localhost:2020'
class Payment {
  // eslint-disable-next-line class-methods-use-this
  getPayment() {
    const token = localStorage.getItem('user')
    return axios.get(`${API_URL}/api/payment`,
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  createPayment(payment) {
    console.log(payment)
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/payment`,
      {
        cart: payment.cart,
        phoneNumber: payment.phoneNumber,
        address: payment.address,
        name: payment.name,
      },
      { headers: { Authorization: token } })
  }
}

export default new Payment()
