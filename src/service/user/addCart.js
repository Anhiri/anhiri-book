import axios from 'axios'

const API_URL = 'http://localhost:2020'
class Cart {
  // eslint-disable-next-line class-methods-use-this
  addCart(cart) {
    console.log(cart)
    const token = localStorage.getItem('user')
    return axios.patch(`${API_URL}/user/addCart`,
      { cart },
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  deleteCart(idProduct) {
    const token = localStorage.getItem('user')
    return axios.delete(`${API_URL}/user/product/${idProduct}/cart`,
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  updateCart(cart) {
    console.log('service', cart)
    const token = localStorage.getItem('user')
    return axios.put(`${API_URL}/user/product/${cart.idProduct}/cart`,
      { quantity: cart.quantify },
      { headers: { Authorization: token } })
  }
}

export default new Cart()
