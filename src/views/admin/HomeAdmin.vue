<template>
  <div id="home_admin">
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
      <b-breadcrumb-item>
        Admin
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Home
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div class="list-product">
      <div
        class="content"
      >
        <!-- Search -->
        <b-input-group class="input-group-merge ml-1 w-100 round">
          <b-input-group-prepend is-text>
            <feather-icon
              icon="SearchIcon"
              class="text-muted"
            />
          </b-input-group-prepend>
          <b-form-input
            v-model="searchQuery"
            placeholder="Search..."
            @keyup="filteredChatsContacts"
          />
        </b-input-group>

        <div
          class="list_product"
        >
          <div
            v-for="product in listProduct.products"
            :key="product._id"
            class="product"
          >
            <div
              class="content"
              @click="openProduct(product._id)"
            >
              <img
                :src="product.images[0].url"
                alt=""
                class="img_product"
              >
              <p
                class="name_product"
              >
                {{ product.title }}
              </p>
              <h3 class="price_product">
                {{ new Intl.NumberFormat().format(product.price) }}₫
              </h3>
            </div>
            <button
              class="btn_product"
              @click="getProductUpate(product._id)"
            >
              Update
            </button>
            <button
              class="btn_product"
              @click="deleteProducts(product._id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import {
  BInputGroup,
  BInputGroupPrepend,
  BFormInput,
  BBreadcrumb,
  BBreadcrumbItem,
  // BPaginationNav,
  // BInputGroupAppend,
  // BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { mapActions, mapGetters, mapState } from 'vuex'
// import DetailProduct from './DetailProduct.vue'

export default {
  name: 'Product',
  components: {
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BBreadcrumb,
    BBreadcrumbItem,
    // BPaginationNav,
    // BInputGroupAppend,
    // BButton,
    // DetailProduct,
  },
  data() {
    return {
      idProduct: null,
      required,
      email,
      activeItem: '',
      searchQuery: '',
      category: '',
      page: 1,
    }
  },
  computed: {
    ...mapState(['productCategory']),
    ...mapGetters(['listCategories', 'listProduct']),
    handelPrice() {
      console.log(this.listProduct.products)
      let arr = []
      arr = this.listProduct.products.map(item => {
        // eslint-disable-next-line no-param-reassign
        item.price = new Intl.NumberFormat().format(item.price)
        return item.price
      })
      return arr
    },
  },
  created() {
    this.getProduct()
  },
  methods: {
    ...mapActions(['getProduct', 'getAllProduct', 'deleteProduct']),

    searchFilterFunction(contact) {
      console.log(contact.title)
      const search = contact.title.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      return search
    },
    filteredChatsContacts() {
      if (this.searchQuery.length > 0) {
        this.listProduct.products = this.listProduct.products.filter(this.searchFilterFunction)
        console.log(this.listProduct)
      } else if (this.searchQuery.length === 0) {
        this.getProduct()
      }
    },
    deleteProducts(idProduct) {
      console.log(idProduct)
      this.deleteProduct(idProduct)
    },
    getProductUpate(idProduct) {
      this.$router.push(`/update/product/${idProduct}`)
    },
    openProduct(idProduct) {
      console.log(idProduct)
      // eslint-disable-next-line no-underscore-dangle
      this.listProduct.products._id = idProduct
      this.$router.push(`/product/${idProduct}`)
    },
  },
}
</script>
<style lang="scss" scoped>
#home_admin{
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
}
.content{
  /* display: flex; */
  flex: 5;
  .input-group-merge{
    width: 50% !important;
    margin: 0px 0px 10px 50% !important;
  }
  .list_product{
    /* position: absolute; */
    display: flex;
    background-color: #fff;
    flex-basis: 100%;
    flex-wrap: wrap;
    border-radius: 7px;
  }
}

.product{
  /* display: flex; */
  width: 21%;
  justify-content: space-around;
  margin:20px 19px;
}
.product:hover{
  cursor: pointer;
  border: 1px solid #c0c0c0;
  box-shadow: 0px 0px 2px 2px #c0c0c0;
}
.content {
  margin: 0px !important;
}
.img_product{
  width: 100%;
  height: auto;
}
.name_product{
  font-size: 15px;
  margin:0px 8px !important;
}
.price_product{
  /* font-size: 12px; */
  color: #c92127;
  margin-left: 10px;
}
.btn_product{
  margin-left: 10px;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background-color: rgb(97, 73, 46);
  color: white;
  font-size: 12px;
  width: 42%;
}
.btn_product:hover{
  border: 1px solid white;
  padding: 7px;
}

</style>
