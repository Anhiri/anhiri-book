<template>
  <div class="chats">
    <div
      v-if="true"
    >
      <div
        v-for="(item, i) in currentGroup"
        :key="i"
        class="chat"
        :class="{'chat-left': !isMy(item.sender._id)}"
      >
        <div
          class="chat-event"
        >
          <div
            :class="!isMy(item.sender._id) ? 'event-right' : 'event-left'"
            class="event__icon"
          >
            <div class="dropdown">
              <b-dropdown
                variant="link"
                no-caret
                toggle-class="p-0"
                right
              >
                <!-- right -->
                <template #button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="17"
                    class="align-middle text-body"
                  />
                </template>
                <b-dropdown-item
                  class="p-0"
                  @click="editMessage(item._id)"
                >
                  Edit Message
                </b-dropdown-item>
                <b-dropdown-item
                  class="p-0"
                  @click="handleDeleteMess(item._id)"
                >
                  Delete Message
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
        <div
          :class="!isMy(item.sender._id) ? 'name-right' : 'name-left'"
        >
          {{ item.sender.name }}
        </div>
        <div class="chat-avatar">
          <b-avatar
            size="36"
            class="avatar-border-2 box-shadow-1"
            variant="transparent"
            :src="item.sender.avatar"
          />
        </div>
        <div class="chat-body">
          <b-form
            v-if="idMess === item._id"
            class="chat-app-form"
            @submit.prevent="updateMess(item.idMess, item.content)"
          >
            <div
              v-if="isEditMess"
              class="input-edit-mess"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  v-model="item.content"
                  autofocus
                  @keyup.enter="updateMess(item.idMess, item.content)"
                />
              </b-input-group>
              <div class="input-update">
                <b-button
                  class="mr-1"
                  variant="danger"
                  @click="cancelEditMessage(item.idMess, item.content)"
                >
                  Cancel
                </b-button>
                <b-button
                  variant="primary"
                  type="submit"
                >
                  Update
                </b-button>
              </div>
            </div>
          </b-form>
          <div
            v-else
            class="chat-content"
            style="max-width: 41%"
          >
            <p>
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import { computed } from '@vue/composition-api'
import {
  BAvatar, VBTooltip, BForm, BInputGroup, BFormInput, BButton, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BAvatar,
    FeatherIcon,
    BForm,
    BInputGroup,
    BFormInput,
    BButton,
    BDropdown,
    BDropdownItem,
  },

  directives: {
    'b-tooltip': VBTooltip,
  },

  props: {
    idGroup: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isEditMess: false,
      idMess: null,
      content: '',
    }
  },

  computed: {
    ...mapGetters(['listGroup']),

    isMy() {
      return id => localStorage.getItem('userId') === id
    },

    currentGroup() {
      let arr = []
      // eslint-disable-next-line no-underscore-dangle
      const obj = this.listGroup.data.find(item => item.group._id === this.idGroup)
      if (obj && obj.listMessages && obj.listMessages.data) {
        arr = obj.listMessages.data
      }
      // console.log(obj)
      return arr
    },
  },
  methods: {
    ...mapActions(['deleteMessage', 'updateMessage']),

    ...mapMutations(['GET_MESS_SOCKET']),

    handleDeleteMess(idMess) {
      this.deleteMessage(idMess)
    },

    editMessage(idMess) {
      this.idMess = idMess
      this.isEditMess = true
    },
    cancelEditMessage(idMess, content) {
      this.idMess = idMess
      this.content = content
      this.isEditMess = false
    },

    updateMess(idMess, content) {
      const payload = {
        idMess,
        content,
      }
      this.updateMessage(payload)
        .then(() => {
          this.isEditMess = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.chat{
  .chat-event{
    display: none;
    position: relative;

    .event-right{
      position: absolute;
      right: 50%;
    }

    .event-left{
      position: absolute;
      left: 50%;
    }

    .event__icon{
      border-radius: 3em;
      padding: 0.5em;
      opacity: 0.8;
      width: max-content;
      background-color: #fff;

      .icon{
        cursor: pointer;
        margin: 0 0.2em;
      }
    }
  }
    .name-right {
      position: absolute;
      display: block;
      margin-top: -20px;
      left: 63px;
    }
    .name-left {
      position: absolute;
      display: block;
      right: 63px;
      margin-top: -20px;
    }
 .chat-app-form{
    height: 100%;
    border-radius: 10px;

    .input-edit-mess{
      width: 100%;
      margin: 10px 0 5px;

      .input-update{
        text-align: end;
        margin: 5px 0;
      }
    }
  }

  .chat-time{
    text-align: left;
    font-size: 9px;
    opacity: 0.8;
  }

  &:hover > .chat-event{
    display: block
  }
}
</style>
