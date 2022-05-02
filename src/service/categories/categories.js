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

  // eslint-disable-next-line class-methods-use-this
  addCategory(category) {
    console.log('service', category.name)
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/category`,
      { name: category.name },
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  updateCategory(category) {
    console.log('service', category)
    const token = localStorage.getItem('user')
    return axios.put(`${API_URL}/api/category/${category.idCategory}`,
      { name: category.nameUpdate },
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  deleteCategory(idCategory) {
    const token = localStorage.getItem('user')
    return axios.delete(`${API_URL}/api/category/${idCategory}`,
      { headers: { Authorization: token } })
  }
}

export default new Categories()
