<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title class="mb-1">
            Đăng nhập
          </b-card-title>
          <b-card-text class="mb-2">
            Hãy đăng nhập tài khoản của bạn!
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
              <!-- email -->
              <b-form-group
                label="Email"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- forgot password -->
              <b-form-group style="border: none; padding: 0px; margin: 0px">
                <div class="d-flex justify-content-between">
                  <label for="login-password">Mật khẩu</label>
                  <b-link :to="{ name: 'auth-forgot-password-v2' }">
                    <small>Quên mật khẩu?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Nhớ mật khẩu
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
              >
                Đăng nhập
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>Bạn chưa có tài khoản? </span>
            <b-link :to="{ name: 'page-auth-register-v2' }">
              <router-link to="/register">
                &nbsp;Tạo tài khoản
              </router-link>
            </b-link>
          </b-card-text>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BForm,
  BButton,
  BCardTitle,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import store from '@/store/index'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BCardTitle,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      required,
      email,
    }
  },

  computed: {
    ...mapGetters(['loginStatus', 'userInfos']),

    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },

  methods: {
    ...mapMutations(['UPDATE_USER']),
    ...mapActions(['getUserInfo', 'login']),

    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          console.log(this.userEmail, this.password)
          this.login({
            email: this.userEmail,
            password: this.password,
          }).then(() => {
            if (this.loginStatus.status) {
              this.getUserInfo()
              // console.log(this.loginStatus)
              console.log(this.userInfos)
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Đăng nhập thành công!',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
              if (this.userInfos.role === 1) {
                console.log(this.userInfos)
                this.$router.push('/admin')
              } else {
                console.log(this.userInfos)
                this.$router.push('/')
              }
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Đăng nhập thất bại!',
                  icon: 'EditIcon',
                  variant: 'warring',
                },
              })
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
.auth-inner{
  justify-content:center;
}
</style>
