<template>
  <div class="sidebar-left">
    <div class="sidebar">

      <!-- Logged In User Profile Sidebar -->
      <user-profile-sidebar
        :shall-show-user-profile-sidebar="shallShowUserProfileSidebar"
        :profile-user-data="profileUserData"
        @close-sidebar="$emit('update:shall-show-user-profile-sidebar', false)"
      />

      <!-- Sidebar Content -->
      <div
        class="sidebar-content"
        :class="{'show': mqShallShowLeftSidebar}"
      >

        <!-- Sidebar close icon -->
        <span class="sidebar-close-icon">
          <feather-icon
            icon="XIcon"
            size="16"
            @click="$emit('update:mq-shall-show-left-sidebar', false)"
          />
        </span>

        <!-- Header -->
        <div class="chat-fixed-search">
          <div
            v-for="userInfo in userInfos"
            :key="userInfo.index"
            class="d-flex align-items-center w-100"
          >
            <div class="sidebar-profile-toggle">
              <b-avatar
                size="42"
                class="cursor-pointer badge-minimal avatar-border-2"
                :src="userInfo.avatar"
                variant="transparent"
                badge
                badge-variant="success"
                @click.native="$emit('show-user-profile')"
              />
            </div>
            <!-- Search -->
            <b-input-group class="input-group-merge ml-1 w-100 round">
              <b-input-group-prepend is-text>
                <feather-icon
                  icon="SearchIcon"
                  class="text-muted"
                />
              </b-input-group-prepend>
              <b-form-input
                v-model="searchQuery"
                placeholder="Search..."
                @keyup="filteredChatsContacts"
              />
            </b-input-group>
          </div>
        </div>

        <!-- ScrollArea: Chat & Contacts -->
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="chat-user-list-wrapper list-group scroll-area"
          @ps-y-reach-end="groupScroll"
        >
          <!-- @ps-y-reach-end="getGroupsScroll" -->
          <!-- Chats Title -->
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="chat-list-title">
              Chats
            </h4>
            <div
              class="dropdown"
              style="margin-right: 18px"
            >
              <b-dropdown
                variant="link"
                no-caret
                toggle-class="p-0"
                right
              >
                <template #button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="17"
                    class="align-middle text-body"
                  />
                </template>
                <b-dropdown-item
                  class="p-0"
                  @click="$bvModal.show('bv-modal-example')"
                >
                  New Group
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>

          <!-- modal new group -->
          <div>
            <b-modal
              id="bv-modal-example"
              hide-footer
            >
              <template #modal-title>
                New Group
              </template>
              <div class="d-block">
                <label>Name group:<span class="text-danger">*</span></label>
                <b-form-input
                  v-model="name"
                  autofocus
                  class="mt-1"
                  placeholder="Enter name group"
                  :state="validate"
                  @keyup.enter="createGroup"
                />
                <label class="mt-2">Description:</label>
                <b-form-input
                  v-model="description"
                  class="mt-1"
                  placeholder="Description Group"
                  @keyup.enter="createGroup"
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
                  @click.prevent="createGroup"
                >
                  Create Group
                </b-button>
              </div>
            </b-modal>
          </div>

          <!-- Chats -->
          <ul class="chat-users-list chat-list media-list">
            <chat-contact
              v-for="group in listGroup.data"
              :key="group.group._id"
              :groups="group"
              :active-chat-contact-id="activeChatContactId"
              tag="li"
              :class="{'active': activeChatContactId === group.group._id}"
              is-chat-contact
              :chats-contacts="chatsContacts"
              @click="$emit('open-chat', group.group._id)"
              @openChatHandle="openChatHandle"
            />
            <!-- @click="$emit('open-chat', group.group._id)" -->
          </ul>

          <!-- Contacts Title -->
          <!-- <h4 class="chat-list-title">
            Contacts
          </h4> -->

          <!-- Contacts -->
          <!-- <ul class="chat-users-list contact-list media-list">
            <chat-contact
              v-for="contact in filteredContacts"
              :key="contact.id"
              :user="contact"
              tag="li"
              @click="$emit('open-chat', contact.id)"
            />
          </ul> -->
        </vue-perfect-scrollbar>
      </div>

    </div>
  </div>
</template>

<script>
import {
  BAvatar, BInputGroup, BInputGroupPrepend, BFormInput, BDropdownItem, BDropdown, BButton, BModal,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import ChatContact from './ChatContact.vue'
import UserProfileSidebar from './UserProfileSidebar.vue'

export default {
  components: {
    // BSV
    BAvatar,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BDropdownItem,
    BDropdown,
    BButton,
    BModal,

    // 3rd party
    VuePerfectScrollbar,

    // SFC
    ChatContact,
    UserProfileSidebar,
  },
  props: {
    chatsContacts: {
      type: Array,
      required: true,
    },
    // contacts: {
    //   type: Array,
    //   required: true,
    // },
    shallShowUserProfileSidebar: {
      type: Boolean,
      required: true,
    },
    profileUserData: {
      type: Object,
      required: true,
    },
    // profileUserMinimalData: {
    //   type: Object,
    //   required: true,
    // },
    activeChatContactId: {
      type: Number,
      default: null,
    },
    mqShallShowLeftSidebar: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    }

    const resolveChatContact = userId => props.contacts.find(contact => contact.id === userId)

    // Search Query
    const searchQuery = ref('')

    // const searchFilterFunction = contact => contact.fullName.toLowerCase().includes(searchQuery.value.toLowerCase())
    // const filteredChatsContacts = computed(() => props.chatsContacts.filter(searchFilterFunction))
    // const filteredContacts = computed(() => props.contacts.filter(searchFilterFunction))

    return {
      // Search Query
      searchQuery,
      // filteredChatsContacts,
      // filteredContacts,

      // UI
      resolveChatContact,
      perfectScrollbarSettings,
    }
  },
  data() {
    return {
      name: '',
      description: '',
      currentPage: 1,
      searchQuery: '',
      // currentPageGroup: 0,
    }
  },
  // created() {
  //   this.getListGroup(this.currentPageGroup += 1)
  // },
  computed: {
    ...mapGetters(['userInfos', 'listGroup', 'listMess']),
    validate() {
      // console.log(this.listGroup.data)
      return this.name.length > 1
    },
    sortedGroup() {
      // let arr = []
      console.log(this.listGroup.data)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      const newObj = this.listGroup.data.sort(
        (a, b) => new Date(a.listMessages.data[a.listMessages.data.length - 1].updatedAt).getTime() - new Date(b.listMessages.data[b.listMessages.data.length - 1].updatedAt).getTime(),
      )
      // console.log(arr)
      // return arr
      // eslint-disable-next-line no-restricted-syntax
      // for (obj of this.listGroup.data) {
      // if (obj && obj.listMessages && obj.listMessages.data) {
      //   arr = obj.sort((a, b) => new Date(a.listMessages.data[a.listMessages.data.length - 1].updatedAt).getTime() - new Date(b.listMessages.data[b.listMessages.data.length - 1].updatedAt).getTime())
      //   console.log(arr)
      // }ty8
      // .sort((a, b) => new Date(a.listMessages.data[a.listMessages.data.length - 1].updatedAt).getTime() - new Date(b.listMessages.data[b.listMessages.data.length - 1]).getTime())
      //   console.log(obj)
      // }
      return newObj
    },
  },
  methods: {
    ...mapMutations(['SEARCH_GROUP']),
    ...mapActions(['getMembers', 'getListGroup', 'addGroup']),

    // sortedGroup() {
    //   let arr = []
    //   const newObj = this.listGroup.data
    //   console.log(newObj)
    //   // eslint-disable-next-line no-plusplus
    //   for (let i; i < newObj.length; i++) {
    //     if (newObj && newObj.listMessages && newObj.listMessages.data) {
    //       console.log(newObj.listMessages.data)
    //       arr = newObj.sort((a, b) => new Date(a.listMessages.data[a.listMessages.data.length - 1].updatedAt).getTime() - new Date(b.listMessages.data[b.listMessages.data.length - 1].updatedAt).getTime())
    //       console.log(arr)
    //     }
    //     // .sort((a, b) => new Date(a.listMessages.data[a.listMessages.data.length - 1].updatedAt).getTime() - new Date(b.listMessages.data[b.listMessages.data.length - 1]).getTime())
    //     return arr
    //   }
    //   return arr
    // },

    searchFilterFunction(contact) {
      console.log(contact.group.name)
      const search = contact.group.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      // console.log(search)
      return search
    },
    filteredChatsContacts() {
      if (this.searchQuery.length > 0) {
        this.listGroup.data = this.listGroup.data.filter(this.searchFilterFunction)
        console.log(this.listGroup.data)
      } else if (this.searchQuery.length === 0) {
        this.getListGroup(this.currentPage)
      }
    },
    // filteredContacts(props) {
    //   props.contacts.filter(this.searchFilterFunction)
    //   return props.contacts
    // },

    // filteredChatsContacts() {
    //   if (this.searchQuery.length > 0) {
    //     this.listGroup.data = this.listGroup.data
    //       .filter(item => item.group.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase()))
    //   } else if (this.searchQuery.length === 0) {
    //     this.getListGroup(this.currentPage)
    //   }
    // },

    createGroup() {
      const newGroup = {
        name: this.name,
        description: this.description,
      }
      this.addGroup(newGroup)
      this.$bvModal.hide('bv-modal-example')
    },
    closeModal() {
      this.$bvModal.hide('bv-modal-example')
      this.name = ''
      this.description = ''
    },

    openChatHandle(isOpen) {
      this.$emit('noOpenChat', isOpen)
    },
    groupScroll() {
      this.$emit('group-scroll')
    },
  },

}
</script>
<style>
.modal .modal-header .close {
  padding: 0.8rem 1.4rem !important;
  background: transparent !important;
  border-radius: 0px !important;
  box-shadow: 0 0 0 0 transparent !important;
}
</style>
