<template>
  <div id="update_product">
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
        Admin
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        Sửa sản phẩm
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div class="list_input">
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Mã sản phẩm: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="currentProduct.product_id"
          class="input"
          size="lg"
          placeholder="Nhập mã sản phẩm"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Chọn hình ảnh"
        label-for="input-lg"
      >
        <input
          type="file"
          multiple
          @change="previewFiles"
        >
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Tên sản phẩm: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="currentProduct.title"
          class="input"
          size="lg"
          placeholder="Nhập tên sản phẩm"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Tác giả: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="currentProduct.authorName"
          class="input"
          size="lg"
          placeholder="Nhập tên sản phẩm"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Giá: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="currentProduct.price"
          class="input"
          size="lg"
          placeholder="Nhập giá sản phẩm"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Thông tin: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="currentProduct.description"
          class="input"
          size="lg"
          placeholder="Nhập thông tin sản phẩm"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Mô tả: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="currentProduct.content"
          class="input"
          size="lg"
          placeholder="Nhập mô tả sản phẩm"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Tổng số lượng: "
        label-for="input-lg"
      >
        <b-form-input
          id="input-lg"
          v-model="currentProduct.total"
          class="input"
          size="lg"
          placeholder="Nhập tổng số lượng sản phẩm"
        />
      </b-form-group>
      <b-form-group
        class="group"
        label-cols="4"
        label-cols-lg="2"
        label-size="lg"
        label="Danh mục: "
        label-for="input-lg"
      >
        <select
          id="cars"
          v-model="currentProduct.category"
        >
          <!-- <option value="">
            {{ currentProduct.category.name }}
          </option> -->
          <option
            v-for="category in listCategories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.name }}
          </option>
        </select>
      </b-form-group>
      <div
        class="btn"
        style="margin-left:73%;"
      >
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="danger"
          class="update_product"
          @click="$router.push('/admin')"
        >
          Trở lại
        </b-button>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="update_product"
          style="background-color: #61492e !important;"
          @click="handleUpdateProduct(currentProduct._id, currentProduct.product_id, currentProduct.title, currentProduct.authorName, currentProduct.price, currentProduct.description, currentProduct.content, currentProduct.images, currentProduct.category, currentProduct.total)"
        >
          Sửa sản phẩm
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BFormInput,
  BFormGroup,
  BBreadcrumb,
  BBreadcrumbItem,
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { mapActions, mapGetters } from 'vuex'
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BFormInput,
    BFormGroup,
    BBreadcrumb,
    BBreadcrumbItem,
    BButton,
    // FeatherIcon,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      idProduct: null,
      product_id: '',
      title: '',
      authorName: '',
      price: '',
      description: '',
      content: '',
      category: '',
      total: '',
      images: [],
    }
  },
  computed: {
    ...mapGetters(['listCategories', 'listProduct']),
    currentProduct() {
      console.log(this.listProduct.products)
      // eslint-disable-next-line no-underscore-dangle
      const product = this.listProduct.products.find(item => item._id === this.idProduct)
      console.log(product)
      return product
    },

  },
  watch: {
    '$route.params.id': {
      handler(id) {
        this.idProduct = id
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.getCategory()
    // this.getProduct()
  },
  methods: {
    ...mapActions(['getCategory', 'updateProduct', 'getProduct']),
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    // eslint-disable-next-line camelcase
    async handleUpdateProduct(idProduct, product_id, title, authorName, price, description, content, images, category, total) {
      const productUpdate = {
        idProduct,
        product_id,
        title,
        authorName,
        price,
        description,
        content,
        images,
        category,
        total,
      }
      console.log('vue', this.images, images)
      await this.updateProduct(productUpdate)
      this.$router.push('/admin')
    },

    async previewFiles(event) {
      const files = [...event.target.files]
      console.log(event.target.files)
      this.images = await Promise.all(files.map(file => this.toBase64(file)))
    },
  },
}
</script>
<style lang="scss" scoped>
#update_product{
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
  .list_input{
      margin-top: 10px;
      width:100%;
      background-color:#fff;
      border-radius: 7px;
      .group{
          margin: 30px 50px;
          color: #61492e;
          .input{
            border: 1px solid #61492e;
          }
      }
  }
  .breadcrumb {
      font-size: 17px;
  }
  .update_product {
    margin-left: 10px;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: rgb(97, 73, 46);
    color: white;
    font-size: 18px;
    margin-bottom: 30px;
  }
  .update_product:hover{
    border: 1px solid white;
    padding: 7px;
}
}
</style>
