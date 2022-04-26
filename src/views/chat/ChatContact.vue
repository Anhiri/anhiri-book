<template>
  <component
    :is="tag"
    class="align-items-center"
    v-on="$listeners"
  >
    <b-avatar
      size="42"
      badge-variant="danger"
      :badge="thisGroup ? newMess = false : (newMess ? `${valueBadge}` : null)"
      :variant="thisGroup ? 'outline-primary' : 'light-primary'"
    >
      <feather-icon icon="MessageSquareIcon" />
    </b-avatar>

    <div
      class="chat-info flex-grow-1 "
    >
      <h5
        class="mb-0"
      >
        {{ groups.group.name }}
      </h5>
      <p
        class="card-text text-truncate"
      >
        <!-- {{ groups.group._id }} -->
        {{ groups && groups.listMessages && groups.listMessages.data && groups.listMessages.data.length && groups.listMessages.data.length > 0 ? groups.listMessages.data[groups.listMessages.data.length - 1].content : "No mess in this room" }}
      </p>
    </div>
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
        <b-dropdown-item
          class="p-0"
          @click.native="shallShowActiveChatContactSidebar=true"
        >
          Group Information
        </b-dropdown-item>
        <b-dropdown-item
          class="p-0"
        >
          Update Information
        </b-dropdown-item>
        <b-dropdown-item
          class="p-0"
          @click="eventDeleteGroup(groups.group._id)"
        >
          Delete Group
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- <div
        v-if="isChatContact"
        class="chat-meta text-nowrap"
      >
        <small class="float-right mb-25 chat-time">{{ formatDateToMonthShort(user.chat.lastMessage.time, { hour: 'numeric', minute: 'numeric' }) }}</small>
        <b-badge
          v-if="user.chat.unseenMsgs"
          pill
          variant="primary"
          class="float-right"
        >
          {{ user.chat.unseenMsgs }}
        </b-badge>
      </div> -->
  </component>
</template>

<script>
import {
  BAvatar, BBadge, BDropdownItem, BDropdown,
} from 'bootstrap-vue'
// import { formatDateToMonthShort } from '@core/utils/filter'
import { mapGetters, mapActions } from 'vuex'
// import useChat from '@/store/user/user'

export default {
  components: {
    BAvatar,
    BBadge,
    BDropdownItem,
    BDropdown,
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    groups: {
      type: Object,
      required: true,
    },
    isChatContact: {
      type: Boolean,
      default: false,
    },

    chatsContacts: {
      type: Array,
      required: true,
    },

    activeChatContactId: {
      type: String,
      default: null,
    },

  },
  data() {
    return {
      urlId: null,
      idGroup: null,
      newMess: false,
      valueBadge: 0,
      isOpen: true,
    }
  },
  // setup() {
  //   const { resolveAvatarBadgeVariant } = useChat()
  //   return {
  //     formatDateToMonthShort,
  //     resolveAvatarBadgeVariant,
  //   }
  // },

  computed: {
    ...mapGetters(['listMess', 'socketMess']),

    thisGroup() {
      // eslint-disable-next-line no-underscore-dangle
      return this.activeChatContactId === this.groups.group._id
    },
  },

  watch: {
  },

  methods: {
    ...mapActions(['getListMess', 'deleteGroup']),

    eventDeleteGroup(idGroup) {
      this.deleteGroup(idGroup)
      this.isOpen = false
      this.$emit('openChatHandle', this.isOpen)
    },

    isNewMess(val) {
      this.idGroup = val.message.group
      if (val.message.group !== this.urlId) {
        this.newMess = true
        this.valueBadge += 1
      }
    },

  },
}
</script>
<style>
.dropdown-item {
  width: 100% !important;
}
</style>
