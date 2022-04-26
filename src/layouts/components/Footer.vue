<template>
  <div id="footer">
    <div class="about">
      <h5 style="color: #fff;">
        Anh Iri - Cửa Hàng Sách
      </h5>
      <br>
      <p>459, Tôn Đức Thắng, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng</p>
      <feather-icon
        icon="PhoneIcon"
        size="17"
        class="align-middle icon-shopping"
      /> 123-456-789
      <br>
      <feather-icon
        icon="MailIcon"
        size="17"
        class="align-middle icon-shopping"
        style="color: #fff;"
      /> AnhIri@gmail.com
    </div>
    <div class="about">
      <h5 style="color: #fff;">
        Cửa Hàng
      </h5>
      <br>
      <p @click="$router.push('/faq')">
        FAQ
      </p>
      <p @click="$router.push('/shipping')">
        Phương thức vận chuyển - Hoàn tiền
      </p>
      <p @click="$router.push('/policy')">
        Chính sách đổi / trả / hoàn tiền
      </p>
      <p @click="$router.push('payment')">
        Phương thức thanh toán
      </p>
    </div>
    <div class="about">
      <h5 style="color: #fff;">
        Kết Nối
      </h5>
      <br>
      <p>
        <!-- <feather-icon
          icon="FacebookIcon"
          size="17"
          class="align-middle icon-shopping"
          style="color: #fff;"
        /> -->
        <a href="https://www.facebook.com/anhiri07">Facebook</a>
      </p>
      <p><a href="https://www.twitter.com/anhiri07">Twitter</a></p>
      <p><a href="https://www.instagram.com/anhiri07">Instagram</a></p>
      <p><a href="https://www.skype.com/anhiri07">Skype</a></p>
    </div>
    <div class="about">
      <h5 style="color: #fff;">
        Hãy Là Người Sớm Nhất!
      </h5>
      <br>
      <p>Đăng Ký để nhận thư mời!</p>
      <b-button
        v-ripple.400="'rgba(0, 0, 0, 0.15)'"
        variant="outline-dark"
        style="border: 1px solid #fff !important; color: #fff; margin-left: 15px;"
        @click="registration"
      >
        Đăng ký ngay
      </b-button>
    </div>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
  },
  directives: {
    Ripple,
  },

  data() {
    return {

    }
  },

  methods: {
    registration() {
      this.$router.push('/register')
    },
  },
}
</script>
<style lang="scss" scoped>
#footer{
    display: flex;
    margin: 20px 7% !important;
    background-color: #61492e;
    color: #fff;
    border-radius: 15px 15px 0px 0px;
    .about {
        flex: 1;
        margin: 30px 40px;
        a {
          color: #fff;
        }
        p:hover {
            cursor: pointer;
        }
    }
}
</style>
