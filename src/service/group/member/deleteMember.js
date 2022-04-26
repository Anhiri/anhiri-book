import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  deleteMember(idGroup, memberId) {
    const token = localStorage.getItem('user')
    return axios.delete(`${API_URL}/api/v1/groups/${idGroup}/members/${memberId}`,
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
