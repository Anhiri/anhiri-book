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
      style="margin-top: 15px;"
    >
      <b-breadcrumb-item @click="$router.push('/admin')">
        Admin
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Lịch sử đặt hàng
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div class="content-history">
      <table>
        <thead>
          <tr style="backgroundColor:#e6e6e6;">
            <th>Payment ID</th>
            <th>Tên</th>
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Thời gian</th>
            <th>Tổng tiền</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody
          v-for="payment in listPayment"
          :key="payment._id"
        >
          <tr>
            <td>{{ payment._id }}</td>
            <td>{{ payment.name }}</td>
            <td>{{ payment.phoneNumber }}</td>
            <td>{{ payment.address }}</td>
            <td>{{ new Date(payment.createdAt).toLocaleDateString() }}</td>
            <td>{{ new Intl.NumberFormat().format(payment.cart.reduce((totalProduct, item) => totalProduct + (item.product.price * item.quantify), 0)) }}₫</td>
            <td
              style="color: blue;"
              @click="openDetailPayment(payment._id)"
            >
              Xem
            </td>
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
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default ({
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    // BTable,
    // FeatherIcon,
  },
  directives: {
    Ripple,
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['listPayment']),
    currentPayment() {
      console.log(this.listPayment.cart)
      // eslint-disable-next-line no-underscore-dangle
      const payment = this.listPayment.cart.foreach(item => item._id === this.idProduct)
      return payment
    },
    // totalOrder() {
    //   console.log(this.listPayment.cart)
    //   const total = this.listPayment.cart.reduce((totalProduct, item) => totalProduct + (item.product.price * item.quantify), 0)
    //   console.log(total)
    //   return total
    // },
  },
  created() {
    this.getPayment()
  },
  methods: {
    ...mapActions(['getPayment']),
    openDetailPayment(idPayment) {
      console.log(idPayment)
      // eslint-disable-next-line no-underscore-dangle
      this.listPayment._id = idPayment
      this.$router.push(`/historyPayment/${idPayment}`)
    },
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
  .content-history {
    margin-top: 10px;
    width: 100%;
    background-color:#fff;
    border-radius: 7px;
  }
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
