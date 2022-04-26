<template>
  <div
    class="user-profile-sidebar"
    :class="{'show': shallShowActiveChatContactSidebar}"
  >
    <!-- Header -->
    <header
      v-if="contact"
      class="user-profile-header"
    >
      <span
        class="close-icon"
      >
        <feather-icon
          icon="XIcon"
          @click="$emit('update:shall-show-active-chat-contact-sidebar', false)"
        />
      </span>

      <div
        v-for="info in groupInfo"
        :key="info.index"
        class="header-profile-sidebar"
      >
        <div class="avatar box-shadow-1 avatar-xl avatar-border">
          <b-avatar
            size="70"
          >
            <feather-icon icon="MessageSquareIcon" />
          </b-avatar>
          <!-- <span
            class="avatar-status-xl"
            :class="`avatar-status-${info.status}`"
          /> -->
        </div>
        <h4 class="chat-user-name">
          {{ info.name }}
          <feather-icon
            icon="EditIcon"
            size="16"
            class="mr-75"
            @click="$bvModal.show('bv-modal-example-group')"
          />
        </h4>
        <!-- <span class="user-post text-capitalize">{{ info.description }}</span> -->
      </div>
    </header>

    <!-- User Details -->
    <vue-perfect-scrollbar
      v-for="info in groupInfo"
      :key="info.index"
      :settings="perfectScrollbarSettings"
      class="user-profile-sidebar-area scroll-area"
    >
      <!-- About -->
      <h6
        class="section-label mb-1"
      >
        Description
      </h6>
      <p>{{ info.description }}</p>

      <!-- Personal Info -->
      <div class="personal-info">
        <h6 class="section-label mb-1 mt-3">
          Personal Information
        </h6>
        <ul class="list-unstyled">
          <li class="mb-1">
            <feather-icon
              icon="MailIcon"
              size="16"
              class="mr-75"
            />
            <span class="align-middle">lucifer@email.com</span>
          </li>
          <li
            class="mb-1"
            @click="$bvModal.show('bv-modal-member')"
          >
            <!-- @click="$bvModal.show('bv-modal-member')" -->
            <feather-icon
              icon="UsersIcon"
              size="16"
              class="mr-75"
            />
            <span class="align-middle">{{ info.totalMembers }} Member</span>
          </li>
          <li>
            <feather-icon
              icon="ClockIcon"
              size="16"
              class="mr-75"
            />
            <span class="align-middle">{{ info.createdAt }}</span>
          </li>
        </ul>
      </div>

      <!-- modal member -->
      <div>
        <b-modal
          id="bv-modal-member"
          ok-only
          ok-title="Accept"
          centered
          size="xs"
          title="List Member"
          hide-footer
        >
          <template #modal-title>
            Members
          </template>
          <div
            v-for="member in listMember"
            :key="member.memberId"
            class="d-block"
          >
            <label>{{ member.user.name }}</label>
          </div>
        </b-modal>
      </div>

      <!-- More Options -->
      <div class="more-options">
        <h6 class="section-label mb-1 mt-3">
          Options
        </h6>
        <ul class="list-unstyled">
          <li class="cursor-pointer mb-1">
            <feather-icon
              icon="TagIcon"
              size="16"
              class="mr-75"
            />
            <span class="align-middle">Add Tag</span>
          </li>
          <li class="cursor-pointer mb-1">
            <feather-icon
              icon="StarIcon"
              size="16"
              class="mr-75"
            />
            <span class="align-middle">Important Contact</span>
          </li>
          <li class="cursor-pointer mb-1">
            <feather-icon
              icon="ImageIcon"
              size="16"
              class="mr-75"
            />
            <span class="align-middle">Shared Media</span>
          </li>
          <li class="cursor-pointer mb-1">
            <feather-icon
              icon="TrashIcon"
              size="16"
              class="mr-75"
            />
            <span class="align-middle">Delete Contact</span>
          </li>
          <li class="cursor-pointer">
            <feather-icon
              icon="SlashIcon"
              size="16"
              class="mr-75"
            />
            <span class="align-middle">Block Contact</span>
          </li>
        </ul>
      </div>
    </vue-perfect-scrollbar>
    <!-- modal update group -->
    <div>
      <b-modal
        v-for="info in groupInfo"
        id="bv-modal-example-group"
        :key="info.index"
        hide-footer
      >
        <template #modal-title>
          Update Group Information
        </template>
        <div class="d-block">
          <label>Name Group:<span class="text-danger">*</span></label>
          <b-form-input
            v-model="info.name"
            autofocus
            class="mt-1"
            :state="validate"
            @keyup.enter="handleUpdateGroup(info.name, info.description)"
          />
          <label class="mt-2">Description:</label>
          <b-form-input
            v-model="info.description"
            class="mt-1"
            @keyup.enter="handleUpdateGroup(info.name, info.description)"
          />
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
            @click.prevent="handleUpdateGroup(info.name, info.description)"
          >
            Update Information
          </b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  BAvatar, BButton, BFormInput, BModal,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    // BSV
    BAvatar,
    BButton,
    BFormInput,
    BModal,

    // 3rd Party
    VuePerfectScrollbar,
  },
  props: {
    shallShowActiveChatContactSidebar: {
      type: Boolean,
      required: true,
    },
    contact: {
      type: Object,
      required: true,
    },
    idGroup: {
      type: String,
      required: true,
    },
  },
  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    return {
      perfectScrollbarSettings,
    }
  },
  data() {
    return {
      name: '',
      description: '',
    }
  },
  computed: {
    ...mapGetters(['groupInfo', 'listGroup']),
    validate() {
      return this.name.length > 1
    },
    listMember() {
      let arr = []
      // eslint-disable-next-line no-underscore-dangle
      const newObj = this.listGroup.data.find(item => item.group._id === this.idGroup)
      if (newObj && newObj.members) {
        arr = newObj.members
      }
      return arr
    },
  },

  created() {
    this.getMembers(this.idGroup)
  },

  methods: {
    ...mapActions(['updateGroup', 'getMembers']),

    async handleUpdateGroup(name, description) {
      const group = {
        // eslint-disable-next-line no-underscore-dangle
        idGroup: this.idGroup,
        name,
        description,
      }
      await this.updateGroup(group)
      // console.log(group)
      this.$bvModal.hide('bv-modal-example-group')
    },
    closeModal() {
      this.$bvModal.hide('bv-modal-example-group')
      this.name = ''
      this.description = ''
    },
  },
}
</script>

<style>

</style>
