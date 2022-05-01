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
      state.listProduct.products = [...state.listProduct.products]
    },
    GET_PRODUCTS_BEST_SELLER(state, product) {
      state.productBestSeller = product
      console.log(state.productBestSeller.products, 'bestSeller')
      state.listProduct.products = [...state.listProduct.products]
    },
    GET_NEW_PRODUCTS(state, product) {
      state.newProducts = product
      console.log(state.newProducts.products, 'bestSeller')
      state.listProduct.products = [...state.listProduct.products]
    },
    DELETE_PRODUCT(state, idProduct) {
      // eslint-disable-next-line no-underscore-dangle
      state.listProduct.products = state.listProduct.products.filter(item => item._id !== idProduct)
      state.listProduct.products = [...state.listProduct.products]
    },
    ADD_PRODUCT(state, product) {
      console.log('mutation', product.product)
      // state.listProduct.products.unshift(product.product)
      state.listProduct.products = [...state.listProduct.products]
    },
    UPDATE_PRODUCT(state, product) {
      // eslint-disable-next-line no-underscore-dangle
      state.listProduct.products._id = product.id
      state.listProduct.products = [...state.listProduct.products]
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
    async deleteProduct({ commit }, idProduct) {
      try {
        const response = await Product.deleteProduct(idProduct)
        commit('DELETE_PRODUCT', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async addProduct({ commit }, product) {
      console.log('action', product)
      try {
        const response = await Product.addProduct(product)
        commit('ADD_PRODUCT', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async updateProduct({ commit }, product) {
      console.log('action', product)
      try {
        const response = await Product.updateProduct(product)
        commit('UPDATE_PRODUCT', response.data)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
