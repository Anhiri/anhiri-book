<template>
  <div id="admin_payment">
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
      <b-breadcrumb-item @click="$router.push('/historyPayment')">
        History Payment
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Detail Payment
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div class="detail-history">
      <table>
        <thead>
          <tr style="backgroundColor:#e6e6e6;">
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Tổng</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="detail in currentPayment.cart"
            :key="detail.index"
          >
            <td><img
              :src="detail.product.images[0].url"
              alt=""
              class="img_product"
            ></td>
            <th>{{ detail.product.title }}</th>
            <th>{{ new Intl.NumberFormat().format(detail.product.price) }}₫</th>
            <td>{{ detail.quantify }}</td>
            <th>{{ new Intl.NumberFormat().format(detail.product.price * detail.quantify) }}₫</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  BBreadcrumb,
  BBreadcrumbItem,
//   BTable,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default ({
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    // BTable,
    FeatherIcon,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      idPayment: null,
    }
  },
  computed: {
    ...mapGetters(['listPayment']),
    currentPayment() {
      console.log(this.listPayment)
      // eslint-disable-next-line no-underscore-dangle
      const payment = this.listPayment.find(item => item._id === this.idPayment)
      console.log(payment)
      return payment
    },
  },
  watch: {
    '$route.params.id': {
      handler(id) {
        this.idPayment = id
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // this.getPayment()
  },
  methods: {
    ...mapActions(['getPayment']),

  },
})
</script>
<style lang="scss" scoped>
#admin_payment {
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
  .breadcrumb {
    font-size: 17px;
  }
  .detail-history {
    width: 100%;
    margin-top: 10px;
    background-color:#fff;
    border-radius: 7px;
  }
}
.img_product{
    height: 200px;
}
table{
    margin: 3%;
    width: 94%;
}
table,th,tr,td{
    border: 1px solid #ddd;
    border-collapse: collapse;
}
tr, th, td {
  // text-align: center;
  padding: 10px;
  text-transform: capitalize;
}
</style>
