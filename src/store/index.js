import Vue from 'vue';
import Vuex from 'vuex';
import { userStore } from './user.store';
import { stationStore } from './station.store';
import { socketStore } from './socket.store';


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    inProgress: false,
  },
  mutations: {
    setInProgress(state, {inProgress}){
      state.inProgress = inProgress
    },
  },
  getters: {
    inProgress(state) {
      return state.inProgress
    },
  },
  modules: {
    userStore,
    stationStore,
    socketStore
  }
})
