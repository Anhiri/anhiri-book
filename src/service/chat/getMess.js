import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  getMess(idMess, currentPage) {
    const token = localStorage.getItem('user')
    return axios.get(`${API_URL}/api/v1/groups/${idMess}/messages?page=${currentPage}&limit=15`,
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
