import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  deleteMess(idMess) {
    const token = localStorage.getItem('user')
    return axios.delete(`${API_URL}/api/v1/messages/${idMess}`,
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
