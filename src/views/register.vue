<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Register-->
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
            Sign Up
          </b-card-title>

          <!-- form -->
          <validation-observer
            ref="registerForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-register-form mt-2"
              @submit.prevent="registerUser"
            >
              <!-- username -->
              <b-form-group
                label="Username"
                label-for="register-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Username"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="register-username"
                    v-model="username"
                    name="register-username"
                    :state="errors.length > 0 ? false:null"
                    placeholder="johndoe"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group
                label="Email"
                label-for="register-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="register-password"
                label="Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                  I agree to
                  <b-link>privacy policy & terms</b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                Sign up
              </b-button>
            </b-form>
          </validation-observer>
          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <router-link to="/login">
              <span>&nbsp;Sign in instead</span>
            </router-link>
          </p>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">
              or
            </div>
          </div>

          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="facebook"
              href="javascript:void(0)"
            >
              <feather-icon icon="FacebookIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
    <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BCardTitle,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { mapGetters, mapActions } from 'vuex'
import store from '@/store/index'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      username: '',
      userEmail: '',
      password: '',
      sideImg: require('@/assets/images/pages/register-v2.svg'),
      // validation
      required,
      email,
    }
  },
  computed: {
    ...mapGetters(['registerStatus', 'userInfos']),
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    ...mapActions(['register']),
    registerUser() {
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          this.register({
            name: this.username,
            email: this.userEmail,
            password: this.password,
          })
            .then(() => {
              if (this.registerStatus.status) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Register Success',
                    icon: 'checkSquareIcon',
                    variant: 'success',
                  },
                })
                this.$router.push('/login')
              } else {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Register fail, Email already exists',
                    icon: 'XSquareIcon',
                    variant: 'danger',
                  },
                })
              }
            })
            // .catch(error => {
            //   this.$refs.registerForm.setErrors(error.response.data.error.message)
            // })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
