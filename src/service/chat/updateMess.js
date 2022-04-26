import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  updateMess(data) {
    console.log({ data })
    const token = localStorage.getItem('user')
    return axios.patch(`${API_URL}/api/v1/messages/${data.idMess}`,
      { content: data.content },
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
