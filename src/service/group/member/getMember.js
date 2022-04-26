import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  getMember(idGroup) {
    const token = localStorage.getItem('user')
    return axios.get(`${API_URL}/api/v1/groups/${idGroup}/members`,
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
