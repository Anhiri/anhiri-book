<template>
  <div id="cart">
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
      <b-breadcrumb-item active>
        Giỏ hàng
      </b-breadcrumb-item>
    </b-breadcrumb>

    <div class="cart-content">
      <div class="product_cart">
        <p
          class="text"
          style="width: 100%; text-align: center; font-size: 25px; margin-top: 20px;"
        >
          Giỏ hàng của tôi
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
                  @change="editCart(product.product._id, product.quantify)"
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
          Mua sản phẩm
        </p>
        <div
          class="content_order"
          style="display: flex;
            background-color: #fff;
            border-radius: 7px;"
        >
          <div class="subtotal">
            <p>Tổng tiền</p>
            <p>{{ new Intl.NumberFormat().format(userInfos.cart.reduce((totalProduct, item) => totalProduct + (item.product.price * item.quantify), 0)) }}₫</p>
          </div>
          <div class="shipping">
            <p>Vận chuyển</p>
            <p>Miễn phí</p>
          </div>
        </div>

        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label-size="sm"
          label="Tên"
          label-for="input-sm"
        >
          <b-form-input
            id="input-sm"
            v-model="name"
            size="sm"
            placeholder="Nhập tên"
          />
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label-size="sm"
          label="Số điện thoại"
          label-for="input-sm"
        >
          <b-form-input
            id="input-sm"
            v-model="phoneNumber"
            size="sm"
            placeholder="Nhập số điện thoại"
          />
        </b-form-group>
        <b-form-group
          label-cols="4"
          label-cols-lg="2"
          label-size="sm"
          label="Địa chỉ"
          label-for="input-sm"
        >
          <b-form-input
            id="input-sm"
            v-model="address"
            size="sm"
            placeholder="Nhập địa chỉ giao hàng"
          />
        </b-form-group>

        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          style="width: 84%; margin: 30px;"
          @click="addPayment(userInfos.cart)"
        >
          Đặt Hàng
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
  BFormGroup,
  BFormInput,
  // BAlert
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import Ripple from 'vue-ripple-directive'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  name: 'Cart',
  components: {
    BFormSpinbutton,
    BBreadcrumb,
    BButton,
    BBreadcrumbItem,
    BFormGroup,
    BFormInput,
    // BAlert
  },
  directives: {
    Ripple,
  },

  data() {
    return {
      idProduct: null,
      quantify: null,
      cart: [],
      phoneNumber: null,
      address: '',
      name: '',
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
    ...mapActions(['getUserInfo', 'getProduct', 'deleteCart', 'updateCart', 'createPayment']),
    removeProduct(idProduct) {
      console.log(idProduct)
      this.deleteCart(idProduct)
    },
    editCart(idProduct, quantify) {
      const product = {
        idProduct,
        quantify,
      }
      this.updateCart(product)
    },
    addPayment(cart) {
      console.log(cart)
      const newPayment = {
        cart,
        phoneNumber: this.phoneNumber,
        address: this.address,
        name: this.name,
      }
      this.createPayment(newPayment)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.text {
    width: 100%;
    color: #61492e;
}
p{
  font-size: 13px;
}
#cart {
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
  .breadcrumb {
    font-size: 17px;
  }
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
        margin: 30px 30px 0px 30px;
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
  .form-group{
    margin: 7px 30px;
    .col-form-label {
      color: #61492e !important;
    }
  }
}
</style>
