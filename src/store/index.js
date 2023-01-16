import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    canonical: null,
    navigationTintState: 'dark', // dark or light (inversion)
    heroHasBgColor: false,
    isMobileNavigationOpen: false,
  },
  getters: {
    canonical(state) {
      return state.canonical;
    },
    navigationTintState(state) {
      return state.navigationTintState;
    },
    heroHasBgColor(state) {
      return state.heroHasBgColor;
    },
  },
  mutations: {
    changeNavigationTintState(state, payload) {
      state.navigationTintState = payload;
    },
    canonical(state, payload) {
      state.canonical = payload;
    },
    heroHasBgColor(state, payload) {
      state.heroHasBgColor = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
