import Vue from 'vue';
import Vuex from 'vuex';
import { userStore } from './user.store';
import { stationStore } from './station.store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    stationStore
  }
})
