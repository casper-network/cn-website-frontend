import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navigationTintState: 'dark', // dark or light (inversion)
    isMobileNavigationOpen: false,
  },
  mutations: {
    changeNavigationTintState(state, payload) {
      state.navigationTintState = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
