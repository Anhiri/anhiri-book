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
      // console.log('mutation', category.category.name)
      state.listCategories.unshift(category.category)
    },
    UPDATE_CATEGORY(state, category) {
      console.log('mutation', category)
      // eslint-disable-next-line no-underscore-dangle
      state.listCategories._id = category.idCategory
      state.listCategories = [...state.listCategories]
    },
    DELETE_CATEGORY(state, category) {
      // console.log('mutation', category)
      // eslint-disable-next-line no-underscore-dangle
      state.listCategories = state.listCategories.filter(item => item._id !== category.idCategory)
      state.listCategories = [...state.listCategories]
    },
  },
  actions: {
    async getCategory({ commit }) {
      try {
        await Categories.getCategories().then(response => {
          commit('GET_CATEGORIES', response.data)
        })
      } catch (error) {
        console.log(error)
      }
    },
    async addCategory({ commit }, category) {
      // console.log('action', category)
      try {
        await Categories.addCategory(category)
          .then(response => {
            const newCategory = {
              category,
              data: response.data,
            }
            commit('ADD_CATEGORY', newCategory)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteCategory({ commit }, idCategory) {
      // console.log(idCategory)
      try {
        await Categories.deleteCategory(idCategory)
          .then(response => {
            const category = {
              idCategory,
              data: response.data,
            }
            commit('DELETE_CATEGORY', category)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async updateCategory({ commit }, category) {
      console.log('action', category)
      try {
        await Categories.updateCategory(category)
          .then(response => {
            const updateCategory = {
              idCategory: category.idCategory,
              data: response.data,
            }
            commit('UPDATE_CATEGORY', updateCategory)
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
