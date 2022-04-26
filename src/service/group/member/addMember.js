import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  addMember(params) {
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/v1/groups/${params.idGroup}/members`,
      { memberId: params.memberId },
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
