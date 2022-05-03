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
  getProducts(params = { page: 1, search: '' }) {
    const token = localStorage.getItem('user')
    return axios.get(`${API_URL}/api/products?page=${params.page}&limit=12&search=${params.search}`,
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
    // console.log('service', idProduct)
    const token = localStorage.getItem('user')
    // eslint-disable-next-line no-underscore-dangle
    return axios.delete(`${API_URL}/api/products/${idProduct}`,
      { headers: { Authorization: token } })
  }

  // eslint-disable-next-line class-methods-use-this
  addProduct(product) {
    // console.log('service', product)
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
  async convertImageToBase64FromUrl(url) {
    const image = await axios.get(url, { responseType: 'arraybuffer' })
    const raw = Buffer.from(image.data).toString('base64')
    return `data:${image.headers['content-type']};base64,${raw}`
  }

  // eslint-disable-next-line class-methods-use-this
  async updateProduct(product) {
    const images = await Promise.all(product.images.map(async image => {
      if (typeof image === 'object') {
        return this.convertImageToBase64FromUrl(image.url)
      }

      return image
    }))
    const token = localStorage.getItem('user')
    return axios.put(`${API_URL}/api/products/${product.idProduct}`, {
      idProduct: product.idProduct,
      product_id: product.product_id,
      title: product.title,
      authorName: product.authorName,
      price: product.price,
      description: product.description,
      content: product.content,
      images,
      category: product.category,
      total: product.total,
    },
    { headers: { Authorization: token } })
  }
}

export default new Products()
