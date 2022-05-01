import axios from 'axios'

const API_URL = 'http://localhost:2020'
class Products {
  // eslint-disable-next-line class-methods-use-this
  getAllProduct(page = 1) {
    const token = localStorage.getItem('user')
    // console.log(token, 'token')
    return axios.get(`${API_URL}/api/products?page=${page}&limit=200`,
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  getProducts(page = 1, search = '') {
    const token = localStorage.getItem('user')
    return axios.get(`${API_URL}/api/products?page=${page}&limit=12&search=${search}`,
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  getSellerProduct() {
    const token = localStorage.getItem('user')
    return axios.get(`${API_URL}/api/products/best-sellers`,
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  getNewProducts() {
    const token = localStorage.getItem('user')
    return axios.get(`${API_URL}/api/products/new`,
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  deleteProduct(idProduct) {
    const token = localStorage.getItem('user')
    return axios.delete(`${API_URL}/api/products/${idProduct}`,
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  addProduct(product) {
    console.log('service', product)
    const token = localStorage.getItem('user')
    return axios.post(`${API_URL}/api/products`, {
      product_id: product.product_id,
      title: product.title,
      authorName: product.authorName,
      price: product.price,
      description: product.description,
      content: product.content,
      images: product.images,
      category: product.category,
      total: product.total,
    },
    { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  updateProduct(product) {
    console.log('service', product)
    const token = localStorage.getItem('user')
    return axios.put(`${API_URL}/api/products/${product.idProduct}`, {
      idProduct: product.idProduct,
      product_id: product.product_id,
      title: product.title,
      authorName: product.authorName,
      price: product.price,
      description: product.description,
      content: product.content,
      images: product.images,
      category: product.category,
      total: product.total,
    },
    { headers: { Authorization: token } })
  }
}

export default new Products()
