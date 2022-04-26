import Product from '@/service/products/product'
// import updateUser from '@/service/user/updateUser'

export default {
  state: {
    listProduct: {},
    productBestSeller: {},
    newProducts: {},
  },
  getters: {
    listProduct: state => state.listProduct,
    productBestSeller: state => state.productBestSeller,
    newProducts: state => state.newProducts,
  },
  mutations: {
    GET_ALL_PRODUCT(state, product) {
      state.listProduct = product
      // console.log(product.products, 'listProduct')
    },
    // eslint-disable-next-line no-shadow
    GET_PRODUCTS(state, product) {
      state.listProduct = product
      console.log(product.products, 'listProduct')
    },
    GET_PRODUCTS_BEST_SELLER(state, product) {
      state.productBestSeller = product
      console.log(state.productBestSeller.products, 'bestSeller')
    },
    GET_NEW_PRODUCTS(state, product) {
      state.newProducts = product
      console.log(state.newProducts.products, 'bestSeller')
    },
  },
  actions: {
    async getAllProduct({ commit }) {
      try {
        const response = await Product.getAllProduct()
        commit('GET_ALL_PRODUCT', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async getProduct({ commit }, page) {
      try {
        const response = await Product.getProducts(page)
        commit('GET_PRODUCTS', response.data)
      } catch (error) {
        console.log(error)
      }
    },

    async getProductBestSeller({ commit }) {
      try {
        const response = await Product.getSellerProduct()
        commit('GET_PRODUCTS_BEST_SELLER', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async getNewProducts({ commit }) {
      try {
        const response = await Product.getNewProducts()
        commit('GET_NEW_PRODUCTS', response.data)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
