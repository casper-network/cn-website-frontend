import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    canonical: null,
    isMobileNavigationOpen: false,
    navigations: null,
  },
  getters: {
    canonical(state) {
      return state.canonical;
    },
    navigations(state) {
      return state.navigations;
    },
  },
  mutations: {
    canonical(state, payload) {
      state.canonical = payload;
    },
    navigations(state, payload) {
      state.navigations = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
