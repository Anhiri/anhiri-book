<template>
  <div id="navbar">
    <img
      class="logo_img"
      src="../../image/logo2.png"
      alt="logo"
    >
    <b-nav-item
      v-if="userInfos.length==0"
      @click="logoutUser"
    >
      Login
    </b-nav-item>
    <b-nav
      v-else
      fill
      class="navbar-link"
    >
      <!-- :class="{ active: isActive('/product') }"
        @click="setActive('/product')" -->
      <b-nav-item
        @click="$router.push('/')"
      >
        Home
      </b-nav-item>
      <b-nav-item
        @click="$router.push('/product')"
      >
        Product
      </b-nav-item>
      <b-nav-item
        @click="$router.push('/about')"
      >
        About
      </b-nav-item>
      <b-nav-item
        @click="logoutUser()"
      >
        Logout
      </b-nav-item>
      <b-nav-item
        class="navbar-cart"
        @click="$router.push('/cart')"
      >
        <feather-icon
          icon="ShoppingCartIcon"
          size="20"
          class="align-middle text-body icon-shopping"
        />
        <p class="quantity-cart">
          {{ userInfos.cart.length }}
        </p>
      </b-nav-item>
    </b-nav>
  </div>

</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BNav,
    BNavItem,
    FeatherIcon,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      activeItem: '/',
    }
  },
  computed: {
    ...mapState(['userLoggedIn']),
    ...mapGetters(['userInfos']),
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['logout', 'getUserInfo']),
    isActive(menuItem) {
      return this.activeItem === menuItem
    },
    setActive(menuItem) {
      this.activeItem = menuItem
      this.$router.push(menuItem)
    },
    logoutUser() {
      this.logout()
        .then(() => {
          this.$router.push('/login')
        })
    },
  },
}
</script>
<style scoped>
#navbar {
  margin: -68px 95px 20px 95px !important;
  position: fixed;
  z-index: 2;
  padding:0 3%;
  background-color:#fff;
  display: flex;
  width: 1176px;
  justify-content: space-between;
  border-radius: 7px 7px 0px 0px;
}
.logo_img {
  width: auto;
  height: 68px;
}
.nav-item {
  padding: 0 21px;
  font-size: 18px;
  list-style: none;
  color: #61492e;
}
.nav-item > a {
  height: auto;
  padding-top: 20px;
  color: #61492e;
}
.nav-item > a:hover {
  color: #c92127;
}
.navbar-cart {
  display: flex;
}
.quantity-cart {
  background-color: #c92127;
    color: #fff;
    font-size: 12px;
    border-radius: 10px;
    margin-top: -32px;
    margin-left: 15px;
    margin-right: -15px;
}
</style>
