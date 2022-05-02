import axios from 'axios'

const API_URL = 'http://localhost:2020'
export default {
  getUser() {
    const token = localStorage.getItem('user')
    // console.log(token, 'token')
    return axios.get(`${API_URL}/user/infor`,
      { headers: { Authorization: token } })
  },
}
