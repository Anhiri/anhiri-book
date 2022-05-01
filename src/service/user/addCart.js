import axios from 'axios'

const API_URL = 'http://localhost:2020'
export default {
  addCart(cart) {
    console.log(cart)
    const token = localStorage.getItem('user')
    return axios.patch(`${API_URL}/user/addCart`,
      { cart },
      { headers: { Authorization: token } })
  },
}
