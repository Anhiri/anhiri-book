<template>
  <div id="admin_payment">
    <h2 class="content-header-title float-left pr-1 mb-0">
      Anh Iri
    </h2>
    <b-breadcrumb class="breadcrumb-slash">
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
      <b-breadcrumb-item active>
        History Payment
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {
  BBreadcrumb,
  BBreadcrumbItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default ({
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    FeatherIcon,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      isEditCategory: false,
      idCategory: null,
      name: '',
      nameUpdate: '',
    }
  },
  computed: {
    ...mapGetters(['listCategories']),
  },
  created() {
    this.getCategory()
  },
  methods: {
    ...mapActions(['getCategory', 'addCategory', 'deleteCategory', 'updateCategory']),

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

}
</style>
