import { createStore } from 'vuex'
import question from './model/question'
import users from './model/user'
import courses from './model/course';
import lessons from './model/lesson';
import game from './model/game';
import comment from './model/comment';
import groups from './model/group';
import chat from './model/chat';
import kahoot from './model/kahoot';
export default createStore({
  state: {
    url: 'http://localhost:4000',
    toggleProfile: false,
  },
  getters: {
    url(state) {
      return state.url
    },
    toggleProfile(state) {
      return state.toggleProfile
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    question,users, courses, lessons,game, comment, groups,chat, kahoot
  }
})
