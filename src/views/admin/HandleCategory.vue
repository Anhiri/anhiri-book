<template>
  <div id="admin_category">
    <h2 class="content-header-title float-left pr-1 mb-0">
      Anh Iri
    </h2>
    <b-breadcrumb class="breadcrumb-slash">
      <b-breadcrumb-item @click="$router.push('/admin')">
        <feather-icon
          icon="HomeIcon"
          size="15"
          class="align-middle icon-shopping"
        />
      </b-breadcrumb-item>
      <b-breadcrumb-item @click="$router.push('/admin')">
        Admin
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Create Product
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div class="handleCategoty">
      <b-form
        novalidate
        class="needs-validation"
        @submit.prevent
      >
        <b-form-row style="margin: 30px;">
          <!-- valid input  -->
          <b-col
            class="mb-3"
          >
            <label for="input-valid1">Name Category:</label>
            <b-form-input
              id="input-valid1"
              v-model="name"
              :state="name.length > 0"
              placeholder="Name Category"
            />
            <b-form-valid-feedback
              tooltip
            >
              Looks good!
            </b-form-valid-feedback>
            <b-form-invalid-feedback
              tooltip
            >
              Please provide category name.
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
      <div class="list">
        <b-list-group
          v-for="category in listCategories"
          :key="category._id"
          style="flex-direction: row !important;"
        >
          <b-list-group-item
            style="margin-left: 30px; width: 100%; display: flex;"
          >
            <div
              class="chat-body"
              style="width: 100%"
            >
              <b-form
                v-if="idCategory === category._id"
                class="chat-app-form"
                @submit.prevent="handleUpdateCategory(category._id, category.name)"
              >
                <div
                  v-if="isEditCategory===true"
                  class="input-edit-mess"
                >
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      v-model="category.name"
                      autofocus
                      @keyup.enter="handleUpdateCategory(category._id, category.name)"
                    />
                  </b-input-group>
                  <div class="input-update">
                    <b-button
                      class="mr-1"
                      variant="danger"
                      @click="cancelEditCategory(category._id, category.name)"
                    >
                      Cancel
                    </b-button>
                    <b-button
                      variant="primary"
                      type="submit"
                    >
                      Update
                    </b-button>
                  </div>
                </div>
                <div v-else>
                  <p>
                    {{ category.name }}
                  </p>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    style="margin:0px 10px;"
                    @click="editCategory(category._id)"
                  >
                    Edit
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="danger"
                    @click="handleDeleteCategory(category._id)"
                  >
                    Delete
                  </b-button>
                </div>
              </b-form>

              <div v-else>
                <p>
                  {{ category.name }}
                </p>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  style="margin:0px 10px;"
                  @click="editCategory(category._id)"
                >
                  Edit
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="danger"
                  @click="handleDeleteCategory(category._id)"
                >
                  Delete
                </b-button>
              </div>
            </div>
          </b-list-group-item>
        <!-- @click="editCategory(category._id, category.name)" -->
          <!-- @click="handleDeleteCategory(category._id)" -->
        </b-list-group>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  BFormInput,
  BCol,
  BForm,
  BFormRow,
  BFormValidFeedback,
  BFormInvalidFeedback,
  BButton,
  BListGroup,
  BListGroupItem,
  BBreadcrumb,
  BBreadcrumbItem,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default ({
  components: {
    BFormInput,
    BForm,
    BButton,
    BFormRow,
    BFormValidFeedback,
    BFormInvalidFeedback,
    BCol,
    BListGroup,
    BListGroupItem,
    BBreadcrumb,
    BBreadcrumbItem,
    BInputGroup,
    FeatherIcon,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      isEditCategory: false,
      idCategory: null,
      name: '',
      nameUpdate: '',
    }
  },
  computed: {
    ...mapGetters(['listCategories']),
  },
  created() {
    this.getCategory()
  },
  methods: {
    ...mapActions(['getCategory', 'addCategory', 'deleteCategory', 'updateCategory']),
    createCategory() {
      const newCategory = {
        name: this.name,
      }
      // console.log(newCategory)
      this.addCategory(newCategory)
    },
    editCategory(idCategory) {
      this.idCategory = idCategory
      this.isEditCategory = true
    },
    cancelEditCategory(idCategory, nameUpdate) {
      this.idCategory = idCategory
      this.nameUpdate = nameUpdate
      this.isEditCategory = false
      console.log(idCategory, nameUpdate)
    },

    handleUpdateCategory(idCategory, nameUpdate) {
      const categoryUpdate = {
        idCategory,
        nameUpdate,
      }
      console.log(categoryUpdate)
      this.updateCategory(categoryUpdate)
        .then(() => {
          this.isEditCategory = false
        })
    },
    handleDeleteCategory(idCategory) {
      this.deleteCategory(idCategory)
      // console.log(idCategory)
    },
  },
})
</script>
<style lang="scss" scoped>
#admin_category {
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
  .breadcrumb {
    font-size: 17px;
  }
  .handleCategoty{
    margin-top: 10px;
    width:100%;
    background-color:#fff;
    border-radius: 7px;
    display: flex;
    .needs-validation{
    flex: 1;
    // width: 90%;
    }
    .list{
      flex: 2;
      width: 100%;
      margin: 30px;
    }
  }
}
</style>
