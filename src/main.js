import Vue from 'vue';
import VueCookies from 'vue-cookies';
import { ComponentFactory } from '@/factories/ComponentFactory';
import Vuelidate from 'vuelidate';
import vSelect from 'vue-select';
import App from './App.vue';
import { getRouter } from './router';
import store from './store';
import i18n from './i18n';
import directus from './directus/directus';
import VueUtil from './utils/VueUtil';

(async () => {
  const router = await getRouter();

  Vue.use(VueCookies);
  Vue.component('v-select', vSelect);
  Vue.use(Vuelidate);
  Vue.use(ComponentFactory, {
    context: require.context('./components', true, /\w+\.vue$/),
  });

  Vue.config.productionTip = false;
  VueUtil.plugins = {
    router,
    store,
    directus,
    i18n,
  };

  new Vue({ ...VueUtil.plugins, render: (h) => h(App) }).$mount('#app');
})();
