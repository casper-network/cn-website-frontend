//----------------------------------
// Imports
//----------------------------------
import Vue from 'vue';
import api from './api';
import config from './config';

const { APP_ENV, LANGUAGES } = config;
const reactiveVm = new Vue({ data: { dData: null, clientWidth: window.innerWidth } });
const directus = {
  api,
  env: APP_ENV,
  languages: LANGUAGES,
  install: () => {
    Object.defineProperty(directus, 'data', {
      get() { return reactiveVm.dData; },
      set(value) { reactiveVm.dData = value; },
    });
    Object.defineProperty(Vue.prototype, '$d', {
      get() { return directus; },
    });
    Object.defineProperty(directus, 'clientWidth', {
      get() { return reactiveVm.clientWidth; },
    });
    window.onresize = () => {
      reactiveVm.clientWidth = window.innerWidth;
    };
    // remove method, so we don't expose it after it has been used
    delete directus.install;
  },
};

Vue.use(directus);
export default directus;
