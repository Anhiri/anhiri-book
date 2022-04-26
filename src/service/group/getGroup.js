import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'

export default {
  getGroup(currentPage) {
    const token = localStorage.getItem('user')
    return axios.get(`${API_URL}/api/v1/groups?page=${currentPage}&limit=15`,
      { headers: { authorization: `Bearer ${token}` } })
  },
}
