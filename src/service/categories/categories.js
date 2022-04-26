import axios from 'axios'

const API_URL = 'http://localhost:2020'
class Categories {
  // eslint-disable-next-line class-methods-use-this
  getCategories() {
    const token = localStorage.getItem('user')
    // console.log(token, 'token')
    return axios.get(`${API_URL}/api/category`,
      { headers: { Authorization: token } })
  }
}

export default new Categories()
