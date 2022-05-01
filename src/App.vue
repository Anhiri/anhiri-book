<template>
  <div
    id="app"
    class="h-100"
    :class="[skinClasses]"
  >
    <div
      v-if="userInfos.role===1"
    >
      <Admin />
      <router-view />
      <Footer />
    </div>
    <div v-else>
      <Navbar />
      <router-view />
      <Footer />
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { watch } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'
import { useWindowSize, useCssVar } from '@vueuse/core'
import Navbar from '@/layouts/components/Navbar.vue'
import Footer from '@/layouts/components/Footer.vue'
import Admin from '@/layouts/components/Admin.vue'

import store from '@/store'

export default {
  components: {
    Navbar,
    Footer,
    Admin,
  },
  data() {
    return {
      isAdmin: false,
    }
  },
  computed: {
    ...mapState(['userLoggedIn']),
    ...mapGetters(['userInfos']),
    layout() {
      if (this.$route.meta.layout === 'full') return 'layout-full'
      return `layout-${this.contentLayoutType}`
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type
    },
  },
  beforeCreate() {
    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
  },
  setup() {
    const { skin, skinClasses } = useAppConfig()
    if (skin.value === 'dark') document.body.classList.add('dark-layout')
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Toastification__fade',
    })
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, val => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })

    return {
      skinClasses,
    }
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
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #61492e;
  margin: 0 5%;
}
</style>
