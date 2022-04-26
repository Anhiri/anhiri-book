<template>
  <div id="home">
    <div class="banner">
      <img
        class="banner_img"
        src="https://thientonphatquang.com/wp-content/uploads/2018/06/banner-201806-1.jpg"
        alt="banner"
      >
      <button
        class="banner_btn"
        style="  background-color: #3f7652;
                  border-radius: 30px;
                  border: none;"
        @click="buyNow"
      >MUA NGAY
        <feather-icon
          style="color: #fff"
          icon="ArrowRightIcon"
          size="17"
          class="align-middle"
        />
      </button>
    </div>
    <div class="body_home">
      <div class="bestseller">
        <h1 class="title">
          Bán chạy
        </h1>
        <div class="list_product">
          <div
            v-for="seller in productBestSeller.products"
            :key="seller._id"
            class="product"
          >
            <div class="content">
              <img
                :src="seller.images[0].url"
                alt=""
                class="img_product"
              >
              <p class="name_product">
                {{ seller.title }}
              </p>
              <p class="price_product">
                {{ new Intl.NumberFormat().format(seller.price) }}₫
              </p>
            </div>
            <button class="add_cart">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div class="sell_month">
        <h3 class="title">
          Sách được đề xuất
        </h3>
        <h1 class="title">
          THÁNG NÀY
        </h1>
        <div class="list_product">
          <div
            v-for="product in newProducts.products"
            :key="product._id"
            class="product"
          >
            <div class="content">
              <img
                :src="product.images[0].url"
                alt=""
                class="img_product"
              >
              <p class="name_product">
                {{ product.title }}
              </p>
              <p class="price_product">
                {{ new Intl.NumberFormat().format(product.price) }}₫
              </p>
            </div>
            <button class="add_cart">
              Add to cart
            </button>
          </div>
        </div>
        <div class="read">
          <b-dropdown-divider style="width: 100%; list-style: none; text-align: center;" />
          <h1
            class="title"
            style="margin-top: 30px"
          >
            Chẳng có điều gì là muộn
          </h1>
          <b-button
            v-ripple.400="'rgba(0, 0, 0, 0.15)'"
            class="btn"
            variant="outline-dark"
          >
            Đọc thêm
          </b-button>
          <b-dropdown-divider style="width: 100%; list-style: none" />
        </div>
      </div>
      <div class="comming_soon">
        <h3 class="title">
          Chuẩn bị ra mắt
        </h3>
        <h1 class="title">
          Sách chuẩn bị lên sàn
        </h1>
        <div class="details_product">
          <div class="details">
            <p class="name_product"><b>Những Điều Từng Là Quý Giá</b></p>
            <p class="price_product">
              Giá: 86.000₫
            </p>
            <p class="author_product">
              Tác giả: Ki Ju Lee
            </p>
            <p class="author_product">
              Người dịch: Sun Tzô
            </p>
            <p class="time_comming">
              When: 30/08/2022
            </p>
            <p class="location_comming">
              Where: 459, Tôn Đức Thắng
            </p>
          </div>
          <img
            class="img_product"
            src="https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nhung_dieu_tung_la_quy_gia/2021_02_25_16_44_49_1-390x510.jpg"
            alt=""
          >
          <img
            class="img_product"
            src="https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nhung_dieu_tung_la_quy_gia/2021_02_25_16_44_49_2-390x510.jpg"
            alt=""
          >
          <img
            class="img_product"
            src="https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nhung_dieu_tung_la_quy_gia/2021_02_25_16_44_49_3-390x510.jpg"
            alt=""
          >
          <img
            class="img_product"
            style="margin-right: 40px"
            src="https://cdn0.fahasa.com/media/flashmagazine/images/page_images/nhung_dieu_tung_la_quy_gia/2021_02_25_16_44_49_7-390x510.jpg"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  BDropdownDivider,
  // BInputGroupAppend,
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  name: 'Home',
  components: {
    FeatherIcon,
    BDropdownDivider,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['productBestSeller', 'newProducts']),
  },
  created() {
    this.getProductBestSeller()
    this.getNewProducts()
  },
  methods: {
    ...mapActions(['getProductBestSeller', 'getNewProducts']),
    buyNow() {
      this.$router.push('/product')
    },
  },
}
</script>
<style lang="scss" scoped>
#home {
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
}
.title {
  font-weight: 700;
}
.banner {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.banner .banner_img{
  width: 100%;
  border-radius: 0px 0px 15px 15px ;
}
.banner .banner_btn{
  z-index: 1;
  position: absolute;
  background-color: #3f7652;
  border-radius: 30px;
  color: #fff;
  width: 150px;
  height: 50px;
  border: none;
}

.bestseller{
  position: relative;
  margin-top: 30px;
  background-color:#fff;
  display: flex;
  flex-wrap: wrap;
  border-radius: 15px;
  .title{
    // justify-content: center;
    color: #61492e;
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
  .list_product{
    /* position: absolute; */
    display: flex;
    background-color: #fff;
    flex-basis: 100%;
    flex-wrap: wrap;
    border-radius: 15px;
    .product{
      /* display: flex; */
      width: 21%;
      justify-content: space-around;
      margin:20px 23px;
      .content {
        margin-left: 0px !important;
        .img_product{
          width: 100%;
          height: auto;
        }
        .name_product{
          font-size: 18px;
          margin:0px 8px !important;
        }
        .price_product{
          font-size: 20px;
          color: red;
          margin-left: 10px;
        }
      }
      .add_cart{
        margin-left: 10px;
        padding: 8px;
        border-radius: 8px;
        border: none;
        background-color: rgb(97, 73, 46);
        color: white;
        font-size: 15px;
      }
      .add_cart:hover{
        border: 1px solid white;
        padding: 7px;
      }
    }
    .product:hover{
      cursor: pointer;
      border: 1px solid #c0c0c0;
      box-shadow: 0px 0px 2px 2px #c0c0c0;
    }
  }
}

.sell_month{
  position: relative;
  margin-top: 30px;
  background-color:#fff;
  display: flex;
  flex-wrap: wrap;
  border-radius: 15px;
  .title{
    text-align: center;
    color: #61492e;
    margin-top: 20px;
    width: 100%;
  }
  .list_product{
    /* position: absolute; */
    display: flex;
    background-color: #fff;
    flex-basis: 100%;
    flex-wrap: wrap;
    border-radius: 15px;
    .product{
      /* display: flex; */
      justify-content: space-around;
      width: 21%;
      margin:20px 23px;
      .content {
        margin-left: 0px !important;
        .img_product{
          width: 100%;
          height: auto;
        }
        .name_product{
          font-size: 18px;
          margin:0px 10px !important;
        }
        .price_product{
          font-size: 20px;
          color: red;
          margin-left: 10px;
        }
      }
      .add_cart{
        margin-left: 10px;
        padding: 8px;
        border-radius: 8px;
        border: none;
        background-color: rgb(97, 73, 46);
        color: white;
        font-size: 15px;
      }
      .add_cart:hover{
        border: 1px solid white;
        padding: 7px;
      }
    }
    .product:hover{
      cursor: pointer;
      border: 1px solid #c0c0c0;
      box-shadow: 0px 0px 2px 2px #c0c0c0;
    }
  }
  .read {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    margin: 30px 0px 10px 0px;
    .title {
      margin-top: 10px !important;
    }
    .dropdown-divider {
      width: 4%;
      margin-left: 46%;
      border-top: 1px solid rgba(97,73,46, 0.38)
    }
    .btn{
      border: 1px solid #61492e !important;
      color: #61492e;
      margin-left: 43.5%;
      margin-bottom: 13px;
    }
  }
}

.comming_soon{
  position: relative;
  margin-top: 30px;
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  .title{
    width: 100%;
    margin-top: 20px;
    color: #61492e;
    text-align: center;
  }
  .details_product{
    display: flex;
    margin: 20px 0px;
    .details{
      margin: 30px 40px;
      flex: 1;
    }
    .img_product{
      height: 285px;
      margin-right: 20px;
    }
  }
}
</style>
