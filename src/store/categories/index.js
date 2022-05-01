import Categories from '@/service/categories/categories'
// import updateUser from '@/service/user/updateUser'

export default {
  state: {
    listCategories: [],
  },
  getters: {
    listCategories: state => state.listCategories,
  },
  mutations: {
    // eslint-disable-next-line no-shadow
    GET_CATEGORIES(state, categories) {
      state.listCategories = categories
      console.log(categories, 'categories')
    },
    ADD_CATEGORY(state, category) {
      console.log(category)
      // state.listCategories.unshift(category)
    },
  },
  actions: {
    async getCategory({ commit }) {
      try {
        // const token = localStorage.getItem('user')
        // if (token) {
        await Categories.getCategories().then(response => {
          commit('GET_CATEGORIES', response.data)
          // console.log(response.data)
        })
        // }
      } catch (error) {
        console.log(error)
      }
    },
    async addCategory({ commit }, category) {
      console.log('action', category)
      try {
        const response = await Categories.addCategory(category)
        commit('ADD_CATEGORY', response.data)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
