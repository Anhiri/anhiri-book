/* eslint-disable no-underscore-dangle */
import GetGroups from '@/service/group/getGroup'
import getMess from '@/service/chat/getMess'
import sendMessages from '@/service/chat/sendMess'
import updateMessage from '@/service/chat/updateMess'
import deleteMessage from '@/service/chat/deleteMess'
import addGroups from '@/service/group/addGroup'
import deleteGroups from '@/service/group/deleteGroup'
import infoGroups from '@/service/group/infoGroup'
import updateInfoGroup from '@/service/group/updateInfoGroup'
// import leaveGroup from '@/service/group/leaveGroup'
import getMembersGroup from '@/service/group/member/getMember'
import addMembers from '@/service/group/member/addMember'

export default {
  state: {
    listGroup: {},
    groupInfo: {},
  },

  getters: {
    listGroup: state => state.listGroup,
    groupInfo: state => state.groupInfo,
  },

  mutations: {
    GET_GROUP(state, getGroup) {
      state.listGroup = getGroup.result
      // state.listGroup.data.sort(
      //   (a, b) => new Date(a.listMessages.data[a.listMessages.data.length - 1].updatedAt).getTime() - new Date(b.listMessages.data[b.listMessages.data.length - 1].updatedAt).getTime(),
      // )
      state.listGroup.data = [...state.listGroup.data]
      // console.log(state.listGroup.data)
    },
    GET_GROUP_SCROLL(state, data) {
      state.listGroup.data = state.listGroup.data.concat(data.result.data)
      state.listGroup.currentPage = data?.result?.currentPage
      state.listGroup.total = data.result.total
      state.listGroup.data = [...state.listGroup.data]
      return state.listGroup.data
    },

    GET_MESS(state, chat) {
      const currentGroup = state.listGroup.data
        .find(room => room.group._id === chat.idGroup)
      /* eslint-disable no-param-reassign */
      currentGroup.listMessages = chat.data.result
      currentGroup.listMessages.data.reverse() // đảo ngược mảng và ghi đè lên mảng cũ
      state.listGroup.data = [...state.listGroup.data]
      return state.listGroup
    },

    GET_MESS_SCROLL(state, group) {
      // console.log({ group })
      const currentRoom = state.listGroup.data
        .find(item => item.group._id === group.idGroup)
        /* eslint-disable no-param-reassign */
      currentRoom.listMessages.currentPage = group.data.result.currentPage
      currentRoom.listMessages.data = group.data.result.data.reverse().concat(currentRoom.listMessages.data)
      state.listGroup.data = [...state.listGroup.data]
      return state.listGroup
    },

    SEND_MESSAGE(state, data) {
      // console.log({ data })
      const currentRoom = state.listGroup.data
        .find(room => room.group._id === data.payload.idGroup)
      // const infoUser = currentRoom.members
      //   .find(item => item.user._id === data.result.sender)
      // data.result.sender = infoUser.user
      state.listGroup.data = [...state.listGroup.data]
      return currentRoom
    },

    UPDATE_MESSAGE(state, data) {
      const messUpdate = state.listGroup.data.listMessages.data.find(item => item._id === data.idMess)
      messUpdate.content = data.content
      console.log(data.idMess)
    },

    DELETE_MESSAGE(state, idMess) {
      state.listGroup.data.listMessages.data = state.listGroup.data.listMessages.data.filter(item => item._id !== idMess)
    },

    GET_MESS_SOCKET(state, payload) {
      const currentRoom = state.listGroup.data
        .find(room => room.group._id === payload.message.group)
      if (currentRoom) {
        const memberObj = currentRoom.members
          .find(member => member.user._id === payload.message.sender)
        if (memberObj) {
          payload.message.sender = memberObj.user
        }
        currentRoom.listMessages.data.push(payload.message)
      }
      const indexOfRoom = state.listGroup.data
        .findIndex(room => room.group._id === currentRoom.group._id)
      if (indexOfRoom) {
        state.listGroup.data.splice(indexOfRoom, 1)
        state.listGroup.data.unshift(currentRoom)
      }
      state.listGroup.data = [...state.listGroup.data]
      return state.listGroup
    },

    ADD_GROUP(state, group) {
      state.listGroup.data.unshift({
        group: {
          name: group.result[0].name,
          _id: group.result[0]._id,
        },
      })
      state.listGroup.total += 1
      state.listGroup.data = [...state.listGroup.data]
    },

    DELETE_GROUP(state, data) {
      state.listGroup.data = state.listGroup.data.filter(item => item.group._id !== data.idGroup)
      // const list = state.listGroup.data.findIndex(item => item.group._id === data.idGroup)
      // state.listGroup.data.splice(list, 1)
    },

    GET_INFO_GROUP(state, group) {
      state.groupInfo = group
    },

    UPDATE_INFO_GROUP(state, group) {
      // console.log(group.result)
      state.groupInfo.result._id = group.id
      state.listGroup.data.group._id = group.id
    },

    LEAVE_GROUP(state, group) {
      state.groupInfo.result._id = group.id
    },

    GET_MEMBERS(state, group) {
      state.listGroup.data.filter(item => {
        // eslint-disable-next-line no-underscore-dangle
        if (item.group._id === group.idGroup) {
          item.members = group?.data?.result?.data
          // console.log(item.members)
        }
        return state.listGroup
      })
    },

    ADD_MEMBER(state, params) {
      // console.log({ params })
      const currentRoom = state.listGroup.data
        .find(room => room.group._id === params.member.idGroup)
      // console.log({ currentRoom })
      currentRoom.members.unshift(params.member.memberId)
      state.listGroup.data = [...state.listGroup.data]
    },
  },

  actions: {
    async getListGroup({ commit }, page) {
      try {
        await GetGroups.getGroup(page).then(response => {
          commit('GET_GROUP', response.data)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getGroupScroll({ commit }, page) {
      try {
        await GetGroups.getGroup(page).then(response => {
          commit('GET_GROUP_SCROLL', response.data)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getListMess({ commit }, chat) {
      try {
        await getMess.getMess(chat.idGroup, chat.currentPage)
          .then(response => {
            const chatMess = {
              idGroup: chat.idGroup,
              data: response.data,
            }
            commit('GET_MESS', chatMess)
            // console.log(chatMess)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async getMessScroll({ commit }, chat) {
      // console.log({ chat })
      try {
        await getMess.getMess(chat.idGroup, chat.currentPage)
          .then(response => {
            const chatMess = {
              idGroup: chat.idGroup,
              data: response.data,
            }
            commit('GET_MESS_SCROLL', chatMess)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async sendMessage({ commit }, payload) {
      try {
        await sendMessages.sentMess(payload.idGroup, payload.content)
          .then(response => {
            const send = {
              payload,
              data: response.data,
            }
            commit('SEND_MESSAGE', send)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async updateMessage({ commit }, chat) {
      try {
        console.log({ chat })
        await updateMessage.updateMess(chat)
          .then(response => {
            const update = {
              idMess: chat.idMess,
              data: response.data,
            }
            console.log(chat.idMess)
            commit('UPDATE_MESSAGE', update)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteMessage({ commit }, idMess) {
      try {
        await deleteMessage.deleteMess(idMess)
          .then(response => {
            commit('DELETE_MESSAGE', response.data)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async getMessSocket({ commit }, data) {
      commit('GET_MESS_SOCKET', data)
    },

    async addGroup({ commit }, group) {
      try {
        await addGroups.addGroup(group)
          .then(response => {
            commit('ADD_GROUP', response.data)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteGroup({ commit }, idGroup) {
      try {
        await deleteGroups.deleteGroup(idGroup)
          .then(response => {
            const deleteGroup = {
              idGroup,
              data: response.data,
            }
            commit('DELETE_GROUP', deleteGroup)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async infoGroup({ commit }, idGroup) {
      try {
        await infoGroups.infoGroup(idGroup).then(response => {
          commit('GET_INFO_GROUP', response.data)
        })
      } catch (error) {
        console.log(error)
      }
    },

    async updateGroup({ commit }, group) {
      try {
        // console.log({ group })
        await updateInfoGroup.updateInfoGroup(group)
          .then(response => {
            const update = {
              idGroup: group.idGroup,
              data: response.data,
            }
            // console.log(group.idGroup)
            commit('UPDATE_INFO_GROUP', update)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async getMembers({ commit }, idGroup) {
      try {
        await getMembersGroup.getMember(idGroup)
          .then(response => {
            const idMember = {
              idGroup,
              data: response.data,
            }
            commit('GET_MEMBERS', idMember)
          })
      } catch (error) {
        console.log(error)
      }
    },

    async addMember({ commit }, member) {
      // console.log({ member })
      try {
        await addMembers.addMember(member).then(response => {
          // console.log({ response })
          const members = {
            member,
            data: response.data,

          }
          commit('ADD_MEMBER', members)
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
