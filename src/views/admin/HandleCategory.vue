<template>
  <div id="admin_category">
    <b-form
      novalidate
      class="needs-validation"
      @submit.prevent
    >
      <b-form-row>

        <!-- valid input  -->
        <b-col
          md="4"
          class="mb-3"
        >
          <label for="input-valid1">Name Category:</label>
          <b-form-input
            id="input-valid1"
            v-model="name"
            :state="name.length > 0"
            placeholder="Valid input"
          />
          <b-form-valid-feedback
            tooltip
          >
            Looks good!
          </b-form-valid-feedback>
          <b-form-invalid-feedback
            tooltip
          >
            Please provide a valid input.
          </b-form-invalid-feedback>
        </b-col>

        <!-- submit button -->
        <b-col
          cols="12"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            @click="createCategory"
          >
            Create
          </b-button>
        </b-col>
      </b-form-row>
    </b-form>
    <!-- <form>
      <label>Category</label>
      <input
        v-model="name"
        type="text"
        name="category"
        required
      >
      <button
        class="add_category"
        @click="createCategory"
      >
        Create Category
      </button>
    </form> -->

    <div class="col">
      <div
        v-for="category in listCategories"
        :key="category._id"
        class="row"
      >
        <p>{{ category.name }}</p>
        <div>
          <button>
            Edit
          </button>
          <!-- @click="editCategory(category._id, category.name)" -->
          <button>
            Delete
          </button>
          <!-- @click="deleteCategory(category._id)" -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  BFormInput, BCol, BForm, BFormRow, BFormValidFeedback, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default ({
  components: {
    BFormInput,
    BForm,
    BButton,
    BFormRow,
    BFormValidFeedback,
    BFormInvalidFeedback,
    BCol,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      name: '',
    }
  },
  computed: {
    ...mapGetters(['listCategories']),
  },
  created() {
    this.getCategory()
  },
  methods: {
    ...mapActions(['getCategory', 'addCategory']),
    createCategory() {
      const newCategory = {
        name: this.name,
      }
      console.log(newCategory)
      this.addCategory({ newCategory })
    },
  },
})
</script>
<style scoped>
#admin_category {
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
}
</style>
