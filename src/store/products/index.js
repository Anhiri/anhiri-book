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
    DELETE_PRODUCT(state, product) {
      console.log('mutation', product)
      // eslint-disable-next-line no-underscore-dangle
      state.listProduct.products = state.listProduct.products.filter(item => item._id !== product.idProduct)
      state.listProduct.products = [...state.listProduct.products]
    },
    ADD_PRODUCT(state, product) {
      // console.log('mutation', product.product)
      state.listProduct.products.unshift(product.product)
      state.listProduct.products = [...state.listProduct.products]
    },
    UPDATE_PRODUCT(state, product) {
      console.log('mutation', product.idProduct)
      // eslint-disable-next-line no-underscore-dangle
      state.listProduct.products._id = product.idProduct
      // eslint-disable-next-line no-underscore-dangle
      console.log('mutation', state.listProduct.products._id)
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
    async getProduct({ commit }, params) {
      try {
        const response = await Product.getProducts(params)
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
      // console.log(idProduct)
      try {
        await Product.deleteProduct(idProduct)
          .then(response => {
            const deleteProduct = {
              idProduct,
              data: response.data,
            }
            commit('DELETE_PRODUCT', deleteProduct)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async addProduct({ commit }, product) {
      // console.log('action', product)
      try {
        await Product.addProduct(product)
          .then(response => {
            commit('ADD_PRODUCT', response.data)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async updateProduct({ commit }, product) {
      console.log('action', product)
      try {
        await Product.updateProduct(product)
          .then(response => {
            const updateProduct = {
              // eslint-disable-next-line no-underscore-dangle
              idProduct: product.idProduct,
              data: response.data,
            }
            commit('UPDATE_PRODUCT', updateProduct)
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
