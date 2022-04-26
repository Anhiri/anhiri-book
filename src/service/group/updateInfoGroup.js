import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  updateInfoGroup(group) {
    const token = localStorage.getItem('user')
    return axios.put(`${API_URL}/api/v1/groups/${group.idGroup}`,
      {
        name: group.name,
        description: group.description,
      },
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
