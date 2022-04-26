import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  sentMess(idGroup, content) {
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/v1/groups/${idGroup}/messages`,
      { content },
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
