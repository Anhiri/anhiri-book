<template>
  <div
    class="chat-profile-sidebar"
    :class="{'show': shallShowUserProfileSidebar}"
  >
    <!-- Header -->
    <header
      v-for="userInfo in userInfos"
      :key="userInfo._id"
      class="chat-profile-header"
    >
      <span class="close-icon">
        <feather-icon
          icon="XIcon"
          @click="$emit('close-sidebar')"
        />
      </span>

      <div class="header-profile-sidebar">
        <div class="avatar box-shadow-1 avatar-xl avatar-border">
          <b-avatar
            size="70"
            :src="userInfo.avatar"
          />
          <span
            class="avatar-status-xl"
            :class="`avatar-status-${profileUserData.status}`"
          />
        </div>
        <h4 class="chat-user-name">
          {{ userInfo.name }}
          <feather-icon
            icon="EditIcon"
            size="16"
            class="mr-75"
            @click="$bvModal.show('bv-modal-example-user')"
          />
        </h4>
        <p class="user-post text-capitalize">
          {{ userInfo.phone }}
        </p>
        <p class="user-post text-capitalize">
          {{ userInfo.email }}
        </p>
      </div>
    </header>

    <!-- modal new group -->
    <div>
      <b-modal
        v-for="userInfo in userInfos"
        id="bv-modal-example-user"
        :key="userInfo._id"
        hide-footer
      >
        <template #modal-title>
          Update Information
        </template>
        <div class="d-block">
          <label>UserName:<span class="text-danger">*</span></label>
          <b-form-input
            v-model="userInfo.name"
            autofocus
            class="mt-1"
            :state="validate"
            @keyup.enter="updateInfos(userInfo.avatar, userInfo.email,userInfo.name,userInfo.phone)"
          />
          <label class="mt-2">Email:</label>
          <b-form-input
            v-model="userInfo.email"
            type="email"
            class="mt-1"
            @keyup.enter="updateInfos(userInfo.avatar, userInfo.email,userInfo.name,userInfo.phone)"
          />
          <label class="mt-2">Phone Number:</label>
          <b-form-input
            v-model="userInfo.phone"
            type="email"
            class="mt-1"
            @keyup.enter="updateInfos(userInfo.avatar, userInfo.email,userInfo.name,userInfo.phone)"
          />
          <!-- <label class="mt-2">Phone:</label>
          <vue-phone-number-input
            v-model="mobile"
            :default-country-code="national_number"
            required
            :state="errors[0] ? false : (valid ? true : null)"
            placeholder="Enter Mobile Number"
          /> -->
        </div>

        <div class="d-flex">
          <b-button
            class="mt-3 mr-2"
            variant="danger"
            block
            @click="closeModal"
          >
            Close
          </b-button>
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click.prevent="updateInfos(userInfo.avatar, userInfo.email,userInfo.name,userInfo.phone)"
          >
            Update Information
          </b-button>
        </div>
      </b-modal>
    </div>

    <!-- User Details -->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="profile-sidebar-area scroll-area"
    >

      <!-- About -->
      <h6 class="section-label mb-1">
        About
      </h6>
      <div class="about-user">
        <b-form-textarea
          v-model="profileUserData.about"
          placeholder="Something about yourself..."
          rows="5"
        />
      </div>

      <!-- Status -->
      <h6 class="section-label mb-1 mt-3">
        Status
      </h6>
      <b-form-radio-group
        id="user-status-options"
        v-model="profileUserData.status"
        stacked
      >
        <!-- :options="userStatusOptions" -->
        <b-form-radio
          v-for="option in userStatusOptions"
          :key="option.value"
          :value="option.value"
          :class="`custom-control-${option.radioVariant}`"
        >
          {{ option.text }}
        </b-form-radio>
      </b-form-radio-group>

      <!-- Settings -->
      <h6 class="section-label mb-1 mt-2">
        Settings
      </h6>
      <ul
        v-if="profileUserData.settings"
        class="list-unstyled"
      >

        <!-- Two Step Auth -->
        <li class="d-flex justify-content-between align-items-center mb-1">
          <div class="d-flex align-items-center">
            <feather-icon
              icon="CheckSquareIcon"
              size="18"
              class="mr-75"
            />
            <span class="align-middle">Two-step Verification</span>
          </div>
          <b-form-checkbox
            v-model="profileUserData.settings.isTwoStepAuthVerificationEnabled"
            switch
          />
        </li>

        <!-- Notifications -->
        <li class="d-flex justify-content-between align-items-center mb-1">
          <div class="d-flex align-items-center">
            <feather-icon
              icon="BellIcon"
              size="18"
              class="mr-75"
            />
            <span class="align-middle">Notification</span>
          </div>
          <b-form-checkbox
            v-model="profileUserData.settings.isNotificationsOn"
            switch
          />
        </li>

        <!-- Invite Friends -->
        <li class="mb-1 d-flex align-items-center cursor-pointer">
          <feather-icon
            icon="UserIcon"
            class="mr-75"
            size="18"
          />
          <span class="align-middle">Invite Friends</span>
        </li>

        <!-- Delete Account -->
        <li class="d-flex align-items-center cursor-pointer">
          <feather-icon
            icon="TrashIcon"
            class="mr-75"
            size="18"
          />
          <span class="align-middle">Delete Account</span>
        </li>
      </ul>

      <div class="mt-3">
        <b-button
          variant="primary"
          @click="logout"
        >
          <router-link
            to="/login"
            style="color: white"
          >
            Logout
          </router-link>
        </b-button>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import {
  BAvatar, BFormTextarea, BFormRadioGroup, BFormRadio, BFormCheckbox, BButton, BFormInput, BModal,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BAvatar,
    BFormTextarea,
    BFormRadioGroup,
    BFormRadio,
    BFormCheckbox,
    BButton,
    BFormInput,
    BModal,
    VuePerfectScrollbar,
  },
  props: {
    shallShowUserProfileSidebar: {
      type: Boolean,
      required: true,
    },
    profileUserData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      avatar: '',
      phone: '',
      name: '',
    }
  },
  computed: {
    ...mapGetters(['userInfos']),
    validate() {
      return this.name.length > 1
    },
  },
  methods: {
    ...mapActions(['logout', 'updateUserInfo']),
    logout() {
      this.$store.dispatch('logout')
    },
    async updateInfos(avatar, email, name, phone) {
      const user = {
        avatar,
        email,
        name,
        phone,
      }
      const userId = localStorage.getItem('userId')
      // eslint-disable-next-line no-underscore-dangle
      if (this.userInfos.result._id === userId) {
        await this.updateUserInfo(user)
      }
      this.$bvModal.hide('bv-modal-example-user')
    },
    closeModal() {
      this.$bvModal.hide('bv-modal-example-user')
      this.avatar = ''
      this.name = ''
      this.email = ''
      this.phone = ''
    },
    updateAvatar(_id, avatar, name, email, phone) {
      this.updateUserInfo({
        _id,
        avatar,
        email,
        name,
        phone,
      })
    },
    // onFileChange(e) {
    //   const files = e.target.files || e.dataTransfer.files
    //   if (!files.length) { return }
    //   this.createImage(files[0])
    // },
    // createImage(file) {
    //   const image = new Image()
    //   const reader = new FileReader()

    //   reader.onload = e => {
    //     this.image = e.target.result
    //   }
    //   reader.readAsDataURL(file)
    // },
  },
  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const userStatusOptions = [
      { text: 'Active', value: 'online', radioVariant: 'success' },
      { text: 'Do Not Disturb', value: 'busy', radioVariant: 'danger' },
      { text: 'Away', value: 'away', radioVariant: 'warning' },
      { text: 'Offline', value: 'offline', radioVariant: 'secondary' },
    ]

    return {
      perfectScrollbarSettings,
      userStatusOptions,
    }
  },
}
</script>

<style lang="scss" scoped>
#user-status-options ::v-deep {
  .custom-radio {
    margin-bottom: 1rem;
  }
}
</style>
