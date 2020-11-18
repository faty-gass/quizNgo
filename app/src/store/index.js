import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null,
    status: localStorage.getItem('status') || null,
  },

  mutations: {
    setToken(state, data) {
      state.access_token = data;
    },
    setStatus(state, data) {
      state.status = data;
    },
    setUser(state, data) {
      state.user = data
    }
  },

  getters: {
    loggedIn(state) {
      return state.access_token !== null
    },
    isAdmin(state) {
      /*       if (state.status === "admin") {
              return true;
            } else if (state.status === "user") {
              return false
            } */
      return state.status !== null
    },
  },

  actions: {
  },
  modules: {
  }
})
