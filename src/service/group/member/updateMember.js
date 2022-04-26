import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  updateMember(idGroup, member) {
    const token = localStorage.getItem('user')
    return axios.put(`${API_URL}/api/v1/groups/${idGroup}/members/${member.memberId}`,
      { nickName: member.nickName },
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
