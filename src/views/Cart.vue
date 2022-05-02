<template>
  <div id="cart">
    <h2 class="content-header-title float-left pr-1 mb-0">
      Anh Iri
    </h2>
    <b-breadcrumb class="breadcrumb-slash">
      <b-breadcrumb-item @click="$router.push('/')">
        Home
      </b-breadcrumb-item>
      <b-breadcrumb-item @click="$router.push('/')">
        <feather-icon
          icon="HomeIcon"
          size="20"
          class="align-middle icon-shopping"
        />
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Cart
      </b-breadcrumb-item>
    </b-breadcrumb>

    <div class="cart-content">
      <div class="product_cart">
        <div
          v-for="product in userInfos.cart"
          :key="product.idProduct"
          class="content_product"
        >
          <img
            :src="product.product.images[0].url"
            alt=""
            class="img_product"
          >
          <div class="right-content">
            <p
              class="name_product"
              style="font-size: 20px; font-weight: 400"
            >
              {{ product.product.title }}
            </p>
            <p class="price_product">
              {{ new Intl.NumberFormat().format(product.product.price) }}₫
            </p>
            <div>
              <p for="demo-sb">
                Số lượng:
              </p>
              <b-form-spinbutton
                id="demo-sb"
                v-model="product.quantify"
                min="1"
                max="100"
                style="width:50%;"
              />
              <!-- <p class="mt-1">
            Value: {{ product.quantity }}
          </p> -->
              <!-- <b-alert
            class="mb-0"
            show
            variant="success"
          >
            <div class="alert-body">
              <span> keys can be used to increment or decrement the value.</span>
            </div>
          </b-alert> -->
            </div>
          </div>
        </div>
      <!-- <p> {{ new Intl.NumberFormat().format(total) }}₫</p> -->
      </div>
      <div class="order_summary">
        <p
          class="text"
          style="width: 100%; text-align: center; font-size: 25px; margin-top: 20px;"
        >
          Order summary
        </p>
        <div
          v-for="product in userInfos.cart"
          :key="product.idProduct"
          class="content_order"
          style="display: flex;
            background-color: #fff;
            border-radius: 7px;"
        >
          <div class="subtotal">
            <p>Subtotal</p>
            <p>{{ new Intl.NumberFormat().format(product.quantity * product.product.price) }}₫</p>
          </div>
          <div class="shipping">
            <p>Shipping</p>
            <p>FREE</p>
          </div>
          <p>Shipping</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BFormSpinbutton,
  BBreadcrumb,
  BBreadcrumbItem,
  // BAlert
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  name: 'Cart',
  components: {
    BFormSpinbutton,
    BBreadcrumb,
    BBreadcrumbItem,
    FeatherIcon,
    // BAlert
  },

  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['listProduct', 'userInfos']),
  },
  created() {
    this.getUserInfo()
    console.log(this.userInfos.cart)
    const total = this.userInfos.cart.reduce((totalProduct, item) => totalProduct + (item.product.price * item.quantity), 0)
    console.log('total', total)
  },
  methods: {
    ...mapActions(['getUserInfo', 'getProduct']),
  },
}
</script>

<style lang="scss" scoped>
.text {
    width: 100%;
    color: #61492e;
}
#cart {
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
  .product_cart{
      display: flex;
      flex-wrap: wrap;
      flex: 2;
      .content_product{
        display: flex;
        background-color:#fff;
        border-radius: 7px;
        width: 97%;
        .img_product{
            height: 200px;
            margin: 20px;
        }
         .right-content{
             margin: 20px 20px 20px 0px;
        }
      }
    .order_summary{
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        .content_order{
            display: flex;
            background-color: #fff;
            border-radius: 7px;
        }
    }
  }

}
</style>
