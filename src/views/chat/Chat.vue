<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit">
    <div
      class="body-content-overlay"
      :class="{'show': shallShowUserProfileSidebar || shallShowActiveChatContactSidebar || mqShallShowLeftSidebar}"
      @click="mqShallShowLeftSidebar=shallShowActiveChatContactSidebar=shallShowUserProfileSidebar=false"
    />

    <!-- Main Area -->
    <section class="chat-app-window">

      <!-- Start Chat Logo -->
      <div
        v-if="!activeChat.contact"
        class="start-chat-area"
      >
        <div class="mb-1 start-chat-icon">
          <feather-icon
            icon="MessageSquareIcon"
            size="56"
          />
        </div>
        <h4
          class="sidebar-toggle start-chat-text"
          @click="startConversation"
        >
          Start Conversation
        </h4>
      </div>

      <!-- Chat Content -->
      <div
        v-else
        class="active-chat"
      >
        <!-- Chat Navbar -->
        <div class="chat-navbar">
          <header
            v-for="info in groupInfo"
            :key="info.index"
            class="chat-header"
          >

            <!-- Avatar & Name -->
            <div class="d-flex align-items-center">

              <!-- Toggle Icon -->
              <div class="sidebar-toggle d-block d-lg-none mr-1">
                <feather-icon
                  icon="MenuIcon"
                  class="cursor-pointer"
                  size="21"
                  @click="mqShallShowLeftSidebar = true"
                />
              </div>

              <b-avatar
                size="36"
                class="mr-1 cursor-pointer badge-minimal"
                badge
                :badge-variant="resolveAvatarBadgeVariant(activeChat.contact.status)"
                @click.native="shallShowActiveChatContactSidebar=true"
              >
                <feather-icon icon="MessageSquareIcon" />
              </b-avatar>
              <h5
                class="mb-0"
              >
                {{ info.name }}
              </h5>
            </div>

            <!-- Contact Actions -->
            <div class="d-flex align-items-center">
              <feather-icon
                icon="PhoneCallIcon"
                size="17"
                class="cursor-pointer d-sm-block d-none mr-1"
              />
              <feather-icon
                icon="VideoIcon"
                size="17"
                class="cursor-pointer d-sm-block d-none mr-1"
              />
              <feather-icon
                icon="SearchIcon"
                size="17"
                class="cursor-pointer d-sm-block d-none mr-50"
              />
              <div class="dropdown">
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
                  <b-dropdown-item>
                    View Contact
                  </b-dropdown-item>
                  <b-dropdown-item>
                    Mute Notifications
                  </b-dropdown-item>
                  <b-dropdown-item>
                    Block Contact
                  </b-dropdown-item>
                  <b-dropdown-item>
                    Clear Chat
                  </b-dropdown-item>
                  <b-dropdown-item>
                    Report
                  </b-dropdown-item>
                  <b-dropdown-item @click="$bvModal.show('bv-modal-example-member')">
                    Add Member
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </header>
          <!-- modal new group -->
          <div>
            <b-modal
              id="bv-modal-example-member"
              hide-footer
            >
              <template #modal-title>
                Add Member
              </template>
              <div class="d-block">
                <label>Id Member:<span class="text-danger">*</span></label>
                <b-form-input
                  v-model="memberId"
                  autofocus
                  class="mt-1"
                  @keyup.enter="addMemberGroup"
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
                  @click.prevent="addMemberGroup"
                >
                  Add Member
                </b-button>
              </div>
            </b-modal>
          </div>
        </div>

        <!-- User Chat Area -->
        <vue-perfect-scrollbar
          ref="refChatLogPS"
          :settings="perfectScrollbarSettings"
          class="user-chats scroll-area"
          reverse
          @ps-y-reach-start="scrollMess"
        >
          <chat-log
            :chat-data="activeChat"
            :profile-user-avatar="profileUserDataMinimal"
            :id-group="idGroup"
          />
        </vue-perfect-scrollbar>

        <!-- Active Chat Contact Details Sidebar -->
        <chat-active-chat-content-details-sidedbar
          :shall-show-active-chat-contact-sidebar.sync="shallShowActiveChatContactSidebar"
          :contact="activeChat.contact || {}"
          :id-group="idGroup"
        />

        <!-- Message Input -->
        <b-form
          class="chat-app-form"
          @submit.prevent="sendMess"
        >
          <b-input-group class="input-group-merge form-send-message mr-1">
            <b-form-input
              v-model="chatInputMessage"
              autofocus
              placeholder="Enter your message"
            />
          </b-input-group>
          <b-button
            variant="primary"
            type="submit"
          >
            Send
          </b-button>
        </b-form>
      </div>
    </section>

    <!-- Active Chat Contact Details Sidebar
    <chat-active-chat-content-details-sidedbar
      :shall-show-active-chat-contact-sidebar.sync="shallShowActiveChatContactSidebar"
      :contact="activeChat.contact || {}"
      :id-group="idGroup"
    /> -->
    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <chat-left-sidebar
        :chats-contacts="chatsContacts"
        :contacts="contacts"
        :active-chat-contact-id="activeChat.contact ? activeChat.contact.id : null"
        :shall-show-user-profile-sidebar.sync="shallShowUserProfileSidebar"
        :profile-user-data="profileUserData"
        :profile-user-minimal-data="profileUserDataMinimal"
        :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
        @show-user-profile="showUserProfileSidebar"
        @group-scroll="getGroupsScroll"
        @open-chat="openChatOfContact"
        @noOpenChat="noOpenChat"
      />
    </portal>
  </div>
</template>

<script>
import {
  onUnmounted, nextTick,
} from '@vue/composition-api'
import {
  BAvatar, BDropdown, BDropdownItem, BForm, BInputGroup, BFormInput, BButton, BModal,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
// import { formatDate } from '@core/utils/filter'
import { $themeBreakpoints } from '@themeConfig'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'
import ChatLeftSidebar from './ChatLeftSidebar.vue'
// import getGroup from '@/store/group/index'
import ChatActiveChatContentDetailsSidedbar from './ChatActiveChatContentDetailsSidedbar.vue'
import ChatLog from './ChatLog.vue'
import useChat from './useChat'

export default {
  components: {

    // BSV
    BAvatar,
    BDropdown,
    BDropdownItem,
    BForm,
    BInputGroup,
    BFormInput,
    BButton,
    BModal,

    // 3rd Party
    VuePerfectScrollbar,

    // SFC
    ChatLeftSidebar,
    ChatActiveChatContentDetailsSidedbar,
    ChatLog,
  },
  data() {
    return {
      memberId: null,
      idGroup: null,
      urlId: null,
      chatInputMessage: '',
      activeChat: {},
      chatsContacts: [],
      contacts: {},
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      profileUserData: {},
      shallShowUserProfileSidebar: false,
      profileUserDataMinimal: {},
      shallShowActiveChatContactSidebar: false,
      get_current_url: null,
      currentPageGroup: 0,
      isActiveChat: {},
      mailMember: '',
      nameState: null,
      submittedNames: [],
      isOpen: true,
    }
  },
  setup() {
    const CHAT_APP_STORE_MODULE_NAME = 'app-chat'

    // Register module
    // if (!store.hasModule(CHAT_APP_STORE_MODULE_NAME)) store.registerModule(CHAT_APP_STORE_MODULE_NAME, getGroup)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CHAT_APP_STORE_MODULE_NAME)) store.unregisterModule(CHAT_APP_STORE_MODULE_NAME)
    })

    const { resolveAvatarBadgeVariant } = useChat()

    // Scroll to Bottom ChatLog
    // const refChatLogPS = ref(null)
    // const scrollToBottomInChatLog = () => {
    //   const scrollEl = refChatLogPS.value.$el || refChatLogPS.value
    //   scrollEl.scrollTop = scrollEl.scrollHeight
    // }

    // ------------------------------------------------
    // Chats & Contacts
    // ------------------------------------------------
    // const chatsContacts = ref([])
    // const contacts = ref([])

    // const fetchChatAndContacts = () => {
    //   store.dispatch('app-chat/fetchChatsAndContacts')
    //     .then(response => {
    //       chatsContacts.value = response.data.chatsContacts
    //       contacts.value = response.data.contacts
    //       // eslint-disable-next-line no-use-before-define
    //       profileUserDataMinimal.value = response.data.profileUser
    //     })
    // }

    // fetchChatAndContacts()

    // ------------------------------------------------
    // Single Chat
    // ------------------------------------------------
    // const activeChat = ref({})
    // const chatInputMessage = ref('')
    // const openChatOfContact = userId => {
    //   // Reset send message input value
    //   chatInputMessage.value = ''

    //   store.dispatch('app-chat/getChat', { userId })
    //     .then(response => {
    //       activeChat.value = response.data

    //       // Set unseenMsgs to 0
    //       const contact = chatsContacts.value.find(c => c.id === userId)
    //       if (contact) contact.chat.unseenMsgs = 0

    //       // Scroll to bottom
    // nextTick(() => { scrollToBottomInChatLog() })
    //     })

    //   // if SM device =>  Close Chat & Contacts left sidebar
    //   // eslint-disable-next-line no-use-before-define
    //   mqShallShowLeftSidebar.value = false
    // }
    // const sendMessage = () => {
    //   if (!chatInputMessage.value) return
    //   const payload = {
    //     contactId: activeChat.value.contact.id,
    //     // eslint-disable-next-line no-use-before-define
    //     // senderId: profileUserDataMinimal.value.id,
    //     message: chatInputMessage.value,
    //   }
    //   store.dispatch('app-chat/sendMessage', payload)
    //     .then(response => {
    //       const { newMessageData, chat } = response.data

    //       // ? If it's not undefined => New chat is created (Contact is not in list of chats)
    //       if (chat !== undefined) {
    //         activeChat.value = { chat, contact: activeChat.value.contact }
    //         chatsContacts.value.push({
    //           ...activeChat.value.contact,
    //           chat: {
    //             id: chat.id,
    //             lastMessage: newMessageData,
    //             unseenMsgs: 0,
    //           },
    //         })
    //       } else {
    //         // Add message to log
    //         activeChat.value.chat.chat.push(newMessageData)
    //       }

    //       // Reset send message input value
    //       chatInputMessage.value = ''

    //       // Set Last Message for active contact
    //       const contact = chatsContacts.value.find(c => c.id === activeChat.value.contact.id)
    //       contact.chat.lastMessage = newMessageData

    //       // Scroll to bottom
    //       nextTick(() => { scrollToBottomInChatLog() })
    //     })
    // }

    // const perfectScrollbarSettings = {
    //   maxScrollbarLength: 150,
    // }

    // Active Chat Contact Details

    // UI + SM Devices
    // Left Sidebar Responsiveness
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()
    // const startConversation = () => {
    //   if (store.state.app.windowWidth < $themeBreakpoints.lg) {
    //     mqShallShowLeftSidebar.value = true
    //   }
    // }

    return {
      // Filters
      // formatDate,

      // useChat
      resolveAvatarBadgeVariant,

      // Chat & Contacts
      // chatsContacts,
      // contacts,

      // Single Chat
      // refChatLogPS,
      // activeChat,
      // chatInputMessage,
      // openChatOfContact,
      // sendMessage,

      // // Profile User Minimal Data
      // profileUserDataMinimal,

      // // User Profile Sidebar
      // profileUserData,
      // shallShowUserProfileSidebar,
      // showUserProfileSidebar,

      // Active Chat Contact Details

      // UI
      // perfectScrollbarSettings,

      // UI + SM Devices
      // startConversation,
      mqShallShowLeftSidebar,
    }
  },
  computed: {
    ...mapGetters(['userInfos', 'listGroup', 'listMessages', 'groupInfo']),
  },

  created() {
    this.getListGroupChat()
  },

  mounted() {
    this.urlId = new URLSearchParams(window.location.search).get('groupId')
  },
  methods: {
    ...mapActions([
      'getListGroup',
      'getListMess',
      'sendMessage',
      'getUserInfo',
      'getMembers',
      'addMember',
      'infoGroup',
      'getMessScroll',
      'getGroupScroll']),

    startConversation() {
      if (store.state.app.windowWidth < $themeBreakpoints.lg) {
        this.mqShallShowLeftSidebar = true
      }
    },

    getListGroupChat() {
      this.getListGroup(this.currentPageGroup += 1)
        .then(() => {
          this.getChatAllGroups()
          if (this.urlId) {
            this.openChatOfContact(this.urlId)
          }
        })
    },

    getChatAllGroups() {
      this.listGroup.data.forEach(item => {
        // eslint-disable-next-line no-underscore-dangle
        const idGroup = item.group._id
        const chat = {
          idGroup,
          currentPage: 1,
        }
        this.getListMess(chat)
        this.getMembers(idGroup)
        // .then(() => {
        //   this.getMembers(idGroup)
        // })
        // console.log(item.listMessages)
      })
      this.listGroup.data.sort(
        (a, b) => new Date(a.listMessages.data[a.listMessages.data.length - 1].updatedAt).getTime() - new Date(b.listMessages.data[b.listMessages.data.length - 1].updatedAt).getTime(),
      )
    },

    getGroupsScroll() {
      const { data, total } = this.listGroup
      if (this.currentPageGroup > 0) {
        if (data && data.length < total) {
          this.currentPageGroup += 1
          this.getGroupScroll(this.currentPageGroup).then(() => {
            this.getChatAllGroups()
          })
        }
      }
    },

    scrollMess() {
      this.listGroup.data.map(room => {
        // eslint-disable-next-line no-underscore-dangle
        if (room.group._id === this.idGroup) {
          if (room.listMessages.data.length < room.listMessages.total) {
            const params = {
              idGroup: this.idGroup,
              currentPage: room.listMessages.currentPage + 1,
            }
            this.getMessScroll(params)
              .then(() => {
                const scrollLoad = this.$refs.refChatLogPS.$el || this.$refs.refChatLogPS
                scrollLoad.scrollTop += 50
                // console.log(room.listMessages.data)
              })
            console.log(params)
          }
        }
        return this.listGroup
      })
    },

    async openChatOfContact(groupId) {
      if (this.isOpen) {
        console.log(this.isOpen)
        this.idGroup = groupId
        this.chatInputMessage = ''
        this.urlId = new URLSearchParams(window.location.search).get('groupId')
        this.infoGroup(groupId)
        const chat = {
          idGroup: this.idGroup,
          currentPage: 1,
        }
        const userId = localStorage.getItem('userId')
        this.listGroup.data.map(room => {
        // eslint-disable-next-line no-underscore-dangle
          if (room.group._id === this.idGroup) {
            if (room.listMessages) {
              this.activeChat.contact = room.group
              // eslint-disable-next-line no-underscore-dangle
              if (room.group._id === this.idGroup) {
                this.profileUserDataMinimal = room.listMessages.data
                // eslint-disable-next-line no-underscore-dangle
                  .find(user => user.sender._id === userId)
              }
              this.$forceUpdate()

              if (this.urlId === null || this.urlId !== this.idGroup) {
                this.$router.push({ name: 'apps-chat', query: { groupId } })
              }
              console.log(room.listMessages)

              // // Scroll to bottom
              nextTick(() => this.scrollToBottomInChatLog())
            } else {
              this.getListMess(chat)
                .then(() => {
                  this.getMembers(groupId)
                  if (room.listMessages.data.length === 0) {
                    this.activeChat.contact = room.group
                    if (this.urlId === null || this.urlId !== this.idGroup) {
                      this.$router.push({ name: 'apps-chat', query: { groupId } })
                    }
                  } else {
                    this.activeChat.contact = room.group
                    // eslint-disable-next-line no-underscore-dangle
                    if (room.group._id === groupId) {
                      this.profileUserDataMinimal = room.listMessages.data
                      // eslint-disable-next-line no-underscore-dangle
                        .find(user => user.sender._id === userId)
                    }
                    this.$forceUpdate()

                    if (this.urlId === null || this.urlId !== this.idGroup) {
                      this.$router.push({ name: 'apps-chat', query: { groupId } })
                    }
                    console.log(room.listMessages)
                    // // Scroll to bottom
                    nextTick(() => this.scrollToBottomInChatLog())
                  }
                })
            }
          }
          return this.listGroup
        })
        // if SM device =>  Close Chat & Contacts left sidebar
        // eslint-disable-next-line no-use-before-define
        this.mqShallShowLeftSidebar = false
      }
      return this.listGroup
      // this.isOpen = true
    },

    noOpenChat(val) {
      this.isOpen = val
      console.log(val)
    },

    scrollToBottomInChatLog() {
      const scrollEl = this.$refs.refChatLogPS.$el || this.$refs.refChatLogPS
      scrollEl.scrollTop = scrollEl.scrollHeight
    },

    sendMess() {
      const userId = localStorage.getItem('userId')
      if (!this.chatInputMessage) return
      const payload = {
        // eslint-disable-next-line no-use-before-define
        idGroup: this.idGroup,
        senderId: userId,
        content: this.chatInputMessage,
        currentPage: this.currentPage,
      }
      this.sendMessage(payload)
    },

    // User Profile Sidebar
    showUserProfileSidebar() {
      this.getUserInfo()
        .then(() => {
          // console.log(this.userInfos)
          this.profileUserData = this.userInfos
          this.shallShowUserProfileSidebar = true
        })
    },

    async addMemberGroup() {
      const member = {
        idGroup: this.idGroup,
        memberId: this.memberId,
      }
      // console.log({ member })
      await this.addMember(member)
      this.$bvModal.hide('bv-modal-example-member')
    },
    closeModal() {
      this.$bvModal.hide('bv-modal-example-member')
      this.memberId = ''
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";
</style>
