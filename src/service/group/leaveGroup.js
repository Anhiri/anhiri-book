import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  leaveGroup(idGroup) {
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/v1/groups/${idGroup}/leave-group`,
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
