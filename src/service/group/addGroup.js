import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  addGroup(group) {
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/v1/groups`, {
      name: group.name,
      description: group.description,
    },
    { headers: { Authorization: `Bearer ${token}` } })
  },
}
