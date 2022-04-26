import axios from 'axios'

const API_URL = 'https://ecomdy-chat.herokuapp.com'
export default {
  updateUser(user) {
    // console.log({ user })
    const token = localStorage.getItem('user')
    // console.log(token)
    return axios.put(`${API_URL}/api/v1/users`,
      {
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      { headers: { Authorization: `Bearer ${token}` } })
  },
}
