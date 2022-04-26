import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/Admin',
      name: 'home-admin',
      component: () => import('@/views/admin/HomeAdmin.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/Product.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/DetailProduct.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
      meta: {
        layout: 'full',
      },
    },

    // footer
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/layouts/components/footer/FAQ.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/shipping',
      name: 'shipping',
      component: () => import('@/layouts/components/footer/Shipping.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/policy',
      name: 'policy',
      component: () => import('@/layouts/components/footer/Policy.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/layouts/components/footer/Payment.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})
// const loggedIn = localStorage.getItem('user');
// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router