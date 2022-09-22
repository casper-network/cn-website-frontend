import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    canonical: null,
    navigationTintState: 'dark', // dark or light (inversion)
    isMobileNavigationOpen: false,
  },
  getters: {
    canonical(state) {
      return state.canonical;
    },
  },
  mutations: {
    changeNavigationTintState(state, payload) {
      state.navigationTintState = payload;
    },
    canonical(state, payload) {
      state.canonical = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
