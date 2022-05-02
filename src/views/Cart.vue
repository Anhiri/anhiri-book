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
        <p
          class="text"
          style="width: 100%; text-align: center; font-size: 25px; margin-top: 20px;"
        >
          My Cart
        </p>
        <div
          v-for="product in userInfos.cart"
          :key="product.product._id"
          class="content_product"
        >
          <div style="display: flex;">
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
                  style="width:130px;"
                />
              </div>
              <p style="margin-top: 1rem;">
                {{ new Intl.NumberFormat().format(product.product.price*product.quantify) }}₫
              </p>
            </div>
          </div>
          <div
            class="delete"
            @click="removeProduct(product.product._id)"
          >
            X
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
          class="content_order"
          style="display: flex;
            background-color: #fff;
            border-radius: 7px;"
        >
          <div class="subtotal">
            <p>Subtotal</p>
            <p>{{ new Intl.NumberFormat().format(userInfos.cart.reduce((totalProduct, item) => totalProduct + (item.product.price * item.quantify), 0)) }}₫</p>
          </div>
          <div class="shipping">
            <p>Shipping</p>
            <p>FREE</p>
          </div>
        </div>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="width: 84%; margin: 30px;"
        >
          Submit
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BFormSpinbutton,
  BBreadcrumb,
  BButton,
  BBreadcrumbItem,
  // BAlert
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import Ripple from 'vue-ripple-directive'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  name: 'Cart',
  components: {
    BFormSpinbutton,
    BBreadcrumb,
    BButton,
    BBreadcrumbItem,
    FeatherIcon,
    // BAlert
  },
  directives: {
    Ripple,
  },

  data() {
    return {
      idProduct: null,
    }
  },
  computed: {
    ...mapGetters(['listProduct', 'userInfos']),
  },
  created() {
    this.getUserInfo()
    console.log(this.userInfos.cart)
    const total = this.userInfos.cart.reduce((totalProduct, item) => totalProduct + (item.product.price * item.quantify), 0)
    console.log('total', total)
  },
  methods: {
    ...mapActions(['getUserInfo', 'getProduct']),
    removeProduct(idProduct) {
      console.log(idProduct)
      this.userInfos.cart.forEach((item, index) => {
        // eslint-disable-next-line no-underscore-dangle
        if (item.product._id === idProduct) {
          console.log(index)
          this.userInfos.cart.splice(index, 1)
        }
      })
    },
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
  .cart-content{
    display: flex;
    .product_cart{
      margin-right: 30px;
      display: flex;
      flex-wrap: wrap;
      background-color:#fff;
      border-radius: 7px;
      flex: 2;
      .content_product{
        display: flex;
        justify-content: space-between;
        width: 97%;
        .img_product{
            height: 200px;
            margin: 20px;
        }
         .right-content{
             margin: 20px 20px 20px 0px;
        }
        .delete{
          // position: absolute;
          top:0;
          right: 5px;
          color: crimson;
          font-weight: 900;
          cursor: pointer;
        }
      }
    }
    .order_summary{
      background-color: #fff;
      border-radius: 7px;
      flex-wrap: wrap;
      flex: 1;
      .content_order{
        margin: 30px;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
.subtotal{
  display: flex;
  justify-content:space-between;
  width: 100%;
}
.shipping{
  display: flex;
  justify-content:space-between;
  width: 100%;
}

}
</style>
