import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  deleteGroup(idGroup) {
    const token = localStorage.getItem('user')
    return axios.delete(`${API_URL}/api/v1/groups/${idGroup}`,
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
