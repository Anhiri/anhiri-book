<template>
  <div id="create_product">
    <h2
      class="content-header-title float-left pr-1 mb-0"
      style="margin: 15px 0px 0px 30px;"
    >
      Anh Iri
    </h2>
    <b-breadcrumb
      class="breadcrumb-slash"
      style="margin: 15px 0px 0px 0px;"
    >
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
    <div class="list_input">
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="ID Product: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="product_id"
          class="input"
          size="lg"
          placeholder="ID Product"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="File: "
        label-for="input-lg"
      >
        <input
          type="file"
          multiple
          @change="previewFiles"
        >
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Title: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="title"
          class="input"
          size="lg"
          placeholder="Title Product"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Author: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="authorName"
          class="input"
          size="lg"
          placeholder="Name Author"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Price: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="price"
          class="input"
          size="lg"
          placeholder="Price Product"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Description: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="description"
          class="input"
          size="lg"
          placeholder="Description"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Content: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="content"
          class="input"
          size="lg"
          placeholder="Content"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Total: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="total"
          class="input"
          size="lg"
          placeholder="Total"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Category: "
        label-for="input-lg"
      >
        <select
          id="cars"
          v-model="category"
        >
          <!-- <option value="">
            Please select a category
          </option> -->
          <option
            v-for="category in listCategories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.name }}
          </option>
        </select>
      </b-form-group>
      <div
        class="btn"
        style="margin-left:73%;"
      >
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="danger"
          class="add_product"
          @click="$router.push('/admin')"
        >
          Cancel
        </b-button>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="background-color: #61492e !important;"
          class="add_product"
          @click="createProduct"
        >
          Create Product
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BFormInput, BFormGroup,
  BBreadcrumb,
  BBreadcrumbItem,
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { mapActions, mapGetters } from 'vuex'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BFormInput,
    BFormGroup,
    BBreadcrumb,
    BBreadcrumbItem,
    FeatherIcon,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      product_id: '',
      title: '',
      authorName: '',
      price: '',
      description: '',
      content: '',
      category: '',
      total: '',
      images: [],
    }
  },
  computed: {
    ...mapGetters(['listCategories', 'listProduct']),

  },
  created() {
    this.getCategory()
    // this.getProduct()
  },
  methods: {
    ...mapActions(['getCategory', 'addProduct', 'getProduct', 'updateProduct']),
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    createProduct() {
      const newProduct = {
        product_id: this.product_id,
        title: this.title,
        authorName: this.authorName,
        price: this.price,
        description: this.description,
        content: this.content,
        images: this.images,
        category: this.category,
        total: this.total,
      }
      this.addProduct(newProduct)
      this.getProduct()
      this.$router.push('/admin')
    },

    async previewFiles(event) {
      const files = [...event.target.files]
      console.log(event.target.files)
      this.images = await Promise.all(files.map(file => this.toBase64(file)))
    },
  },
}
</script>
<style lang="scss" scoped>
#create_product{
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
  .list_input{
      margin-top: 10px;
      width:100%;
      background-color:#fff;
      border-radius: 7px;
      .group{
          margin: 30px 50px;
          color: #61492e;
          .input{
            border: 1px solid #61492e;
          }
      }
  }
  .breadcrumb {
      font-size: 17px;
  }
  .add_product {
    margin-left: 10px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    color: white;
    font-size: 18px;
    margin-bottom: 30px;
  }
  .add_product:hover{
    border: 1px solid white;
    padding: 7px;
}
}
</style>
