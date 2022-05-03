<template>
  <div id="detailProduct">
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
      <b-breadcrumb-item @click="$router.push('/')">
        Trang chủ
      </b-breadcrumb-item>
      <b-breadcrumb-item @click="$router.push('/product')">
        Sản phẩm
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Chi tiết sản phẩm
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div
      class="content"
    >
      <img
        :src="currentProduct.images[0].url"
        alt=""
        class="img_product"
      >
      <div class="right-content">
        <p
          class="name_product"
          style="font-size: 20px; font-weight: 400"
        >
          {{ currentProduct.title }}
        </p>
        <p class="author_product">
          Tác giả: {{ currentProduct.authorName }}
        </p>
        <h3 class="price_product">
          {{ new Intl.NumberFormat().format(currentProduct.price) }}₫
        </h3>
        <p>Số lượng: {{ currentProduct.total }}</p>
        <p>Đã bán: {{ currentProduct.sold }}</p>

        <b-button
          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
          variant="outline-danger"
        >
          Thêm vào giỏ hàng
        </b-button>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="danger"
          @click="$router.push('/cart')"
        >
          Mua ngay
        </b-button>
      </div>
    </div>
    <div class="description">
      <div>
        <p>THÔNG TIN SẢN PHẨM</p>
        <p>{{ currentProduct.description }}</p>
      </div>
      <b-dropdown-divider style="width: 90%; list-style: none; margin-left: 5%; color: #ccc;" />
      <div>
        <p>{{ currentProduct.title }}</p>
        <p>{{ currentProduct.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BButton,
  BDropdownDivider,
  BBreadcrumb,
  BBreadcrumbItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { required, email } from '@validations'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Detailproduct',
  components: {
    BButton,
    BDropdownDivider,
    BBreadcrumb,
    BBreadcrumbItem,
  },
  directives: {
    Ripple,
  },
  //   props: {
  //     idProduct: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  data() {
    return {
      required,
      email,
      activeItem: '',
      idProduct: null,

    }
  },
  computed: {
    ...mapGetters(['listProduct']),
    currentProduct() {
      console.log(this.listProduct.products)
      // eslint-disable-next-line no-underscore-dangle
      const product = this.listProduct.products.find(item => item._id === this.idProduct)
      return product
    },
  },
  watch: {
    '$route.params.id': {
      handler(id) {
        this.idProduct = id
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // this.getProduct()
  },
  methods: {
    ...mapActions(['getProduct']),

  },
}
</script>

<style lang="scss" scoped>
#detailProduct {
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
}
.breadcrumb {
    font-size: 17px;
  }
.text {
  color: #61492e;
  width: 100%;
}
.content{
    margin: 10px 7% !important;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0px;
    background-color:#fff;
    width: 100%;
    border-radius: 7px;
}
.img_product{
    margin-right: 30px;
    flex: 1;
    height: 350px;
    width: auto;
}
.right-content {
    flex: 2;
}
.price_product {
    color: #c92127;
    font-weight: bold;
    font-size: 30px;
}

.description {
  margin: 10px 10% !important;
  background-color: #fff;
  border-radius: 7px;
  div{
    margin: 30px 68px;
    p{
    }
  }
}
</style>
