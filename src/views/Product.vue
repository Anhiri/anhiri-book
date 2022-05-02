<template>
  <div id="product">
    <h2 class="content-header-title float-left pr-1 mb-0">
      Anh Iri
    </h2>
    <b-breadcrumb class="breadcrumb-slash">
      <b-breadcrumb-item @click="$router.push('/')">
        <feather-icon
          icon="HomeIcon"
          size="20"
          class="align-middle icon-shopping"
        />
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Product
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div class="list-product">
      <div class="category">
        <h4
          class="text"
          style="font-size: 24px; width: 100%; margin-left: 20px; margin-top: 12px;"
        >
          Category
        </h4>
        <b-dropdown-divider style="width: 100%;" />
        <b-nav
          style="width: 100%;"
          vertical
        >
          <b-nav-item
            @click="allProduct"
          >
            All Product
          </b-nav-item>
          <b-nav-item
            v-for="category in listCategories"
            :key="category._id"
            @click="handleCategory(category._id)"
          >
            {{ category.name }}
          </b-nav-item>
        </b-nav>
      </div>
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
              class="content-p"
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
              class="add_cart"
              @click="addProductCart(product)"
            >
              Add to cart
            </button>
          </div>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="danger"
          >
            Load More
          </b-button>
        </div>
      </div>

      <!-- Phan trang -->
      <!-- <b-pagination-nav
          :link-gen="linkGen"
          :page-gen="listProduct.page"
          :number-of-pages="listProduct.totalPage"
          use-router
          class="mb-0"
        /> -->
    </div>
  </div>
</template>

<script>
import {
  BNav,
  BNavItem,
  BDropdownDivider,
  BInputGroup,
  BInputGroupPrepend,
  BFormInput,
  BBreadcrumb,
  BBreadcrumbItem,
  // BPaginationNav,
  // BInputGroupAppend,
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { required, email } from '@validations'
import { mapActions, mapGetters, mapState } from 'vuex'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
// import DetailProduct from './DetailProduct.vue'

export default {
  name: 'Product',
  components: {
    BNav,
    BNavItem,
    BDropdownDivider,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BBreadcrumb,
    BBreadcrumbItem,
    FeatherIcon,
    // BPaginationNav,
    // BInputGroupAppend,
    BButton,
    // DetailProduct,
  },
  directives: {
    Ripple,
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
    // const number = 1234567
    // console.log(new Intl.NumberFormat().format(number))
    this.getCategory()
    this.getProduct()
  },
  methods: {
    ...mapActions(['getCategory', 'getProduct', 'getAllProduct', 'addCart']),

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

    async pageGen(pageNum) {
      console.log(pageNum, 'p')
    },

    async linkGen(pageNum) {
      // await this.getProductPage(pageNum)
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    async getProductPage(pageNum) {
      await this.getProduct(pageNum)
      console.log(this.listProduct)
    },

    async handleCategory(idCategory) {
      await this.getAllProduct()
      this.listProduct.products = this.listProduct.products.filter(item => item.category === idCategory)
      console.log(this.listProduct.products)
      return this.listProduct.products
    },
    allProduct() {
      this.getProduct()
    },
    // handleCategory(idCategory) {
    //   this.getProduct().then(() => {
    //     this.listProduct.products = this.listProduct.products.filter(item => item.category === idCategory)
    //     console.log(this.listProduct.products)
    //     return this.listProduct.products
    //   })
    // },

    openProduct(idProduct) {
      console.log(idProduct)
      // eslint-disable-next-line no-underscore-dangle
      this.listProduct.products._id = idProduct
      this.$router.push(`/product/${idProduct}`)
    },

    async addProductCart(product) {
      console.log({ product })
      const productCart = {
        product,
        quantify: 1,
      }
      console.log({ productCart })
      await this.addCart(productCart)
    },
  },
}
</script>

<style lang="scss" scoped>

.text {
  color: #61492e;
}
li {
  list-style-type: none;
}
#product{
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
}
.list-product {
  display: flex;
  width: 100%;
  margin-top: 20px;
}
.category {
  width: 17%;
  height: auto;
  /* display: flex; */
  flex: 1.4;
    border-radius: 7px;
  flex-wrap: wrap;
  background-color: #fff;
  .nav{
    margin-left: 20px;
  }
}
.nav-item > a:hover{
    color:#c92127;
  }
.content{
  /* display: flex; */
  margin-left: 20px;
  flex: 5;
  .input-group-merge{
    margin: 0px 0px 10px 0px !important;
  }
  .list_product{
    /* position: absolute; */
    padding-bottom: 20px;
    display: flex;
    background-color: #fff;
    flex-basis: 100%;
    flex-wrap: wrap;
    border-radius: 7px;
    justify-content:center;
  }
}

.product{
  /* display: flex; */
  width: 21%;
  margin:20px 18px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.product:hover{
  cursor: pointer;
  border: 1px solid #c0c0c0;
  box-shadow: 0px 0px 2px 2px #c0c0c0;
}
.img_product{
  width: 100%;
  height: auto;
}
.name_product{
  font-size: 13px;
  margin:0px 8px !important;
}
.price_product{
  /* font-size: 12px; */
  color: #c92127;
  margin-left: 10px;
}
.add_cart{
  padding: 8px;
  border-radius: 8px;
  border: none;
  background-color: rgb(97, 73, 46);
  color: white;
  font-size: 12px;
}
.add_cart:hover{
  border: 1px solid white;
  padding: 7px;
}
.breadcrumb {
      font-size: 17px;
  }
</style>
