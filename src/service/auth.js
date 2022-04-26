import axios from 'axios'

const API_URL = 'http://localhost:2020'
class AuthService {
  // eslint-disable-next-line class-methods-use-this
  login(user) {
    console.log({ user })
    return axios.post(`${API_URL}/user/login`, user)
  }

  // eslint-disable-next-line class-methods-use-this
  register(user) {
    console.log({ user })
    return axios.post(`${API_URL}/user/register`, {
      name: user.name,
      email: user.email,
      password: user.password,
    })
  }
}

export default new AuthService()
