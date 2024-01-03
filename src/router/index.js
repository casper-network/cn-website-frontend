/* eslint-disable */

import Vue from 'vue';
import Meta from 'vue-meta';
import Router from 'vue-router';
import i18n from '@/i18n';
import directus from '@/directus/directus';
import config from '@/directus/config';

Vue.use(Meta);

// import Home from '@/views/Home.vue';
import PageFactory from '@/views/PageFactory.vue';
import NewsDetail from '@/views/news/detail.vue';
import CaseStudiesDetail from '@/views/casestudies/detail.vue';
import EcoSystem from '@/views/ecosystem/index.vue';
// import EcoSystemDetail from '@/views/ecosystem/_detail.vue';
import Newsletter from '@/views/Newsletter.vue';
import Contact from '@/views/Contact.vue';
import SingleJob from '@/views/SingleJob.vue';
import NewsIndex from '@/views/news/index.vue';
import EcoSystemFiltered from '@/views/ecosystem/filtered.vue';
import NewsFiltered from '@/views/news/filtered.vue';
import PodcastDetail from '@/views/PodcastDetail.vue';
import CountryPageFactory from '@/views/CountryPageFactory.vue';

const { api } = directus;
const { LANGUAGES, API_URL } = config;

const VIEW_MAPPING = {
  lp_news: NewsIndex,
  lp_ecosystem: EcoSystem,
  lp_newsletter: Newsletter,
  lp_contact: Contact,
  casestudies: CaseStudiesDetail,
  // applications: EcoSystemDetail,
  news: NewsDetail,
  jobs: SingleJob,
  lp_ecosystem_filtered: EcoSystemFiltered,
  lp_news_filtered: NewsFiltered,
  articles: NewsDetail,
};

// eslint-disable-next-line import/prefer-default-export
export function getRouter() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/cce/vue-router`);
    if (response.ok) {
      let routes = await response.json() || [];
      routes = routes.map(r => ({
        ...r,
        component: VIEW_MAPPING[r.meta.page || r.meta.details || r.meta.filtered] || PageFactory,
      }));
      routes = routes.concat([
        {
          name: 'country-landingpage',
          path: '/',
          component: CountryPageFactory,
        },
        {
          name: 'podcast-detail',
          path: '/:lang/lp/podcast/:slug',
          component: PodcastDetail,
          props: route => ({ slug: route.params.slug }),
        },
      ]);
      Vue.use(Router);
      const router = new Router({
        mode: 'history',
        routes,
        scrollBehavior(to, from, savedPosition) {
          if (savedPosition) {
            return savedPosition;
          }
          if(to.name !== 'lp-news-paginated') {
            return { x: 0, y: 0 };
          }
        },
      });

      router.beforeResolve(async (to, from, next) => {
        window.h1Set = false;
        let ignoreLanguage = to.meta.ignoreLanguage || false;
        let language = (to.params.lang) ? to.params.lang : to.query.lang || '';
        const urlQueryString = window.location.search || '';

        let isCountryLP = false;
        let countryCode = null;
        const { hostname } = window.location;

        const prodDomainTest = /^[a-zA-Z]{2}.casper.network/.test(hostname);
        const stagingDomainTest = /^[a-zA-Z]{2}.staging.casper.network/.test(hostname);
        if (prodDomainTest || stagingDomainTest) {
          isCountryLP = true;
          countryCode = hostname.replace('.casper.network', '');
          if (countryCode.includes('.')) {
            countryCode = hostname.replace('.staging.casper.network', '');
          }
          console.log(countryCode);
          ignoreLanguage = true;
          language = 'en-us';
        }

        if (!ignoreLanguage && LANGUAGES.length >= 1 && !LANGUAGES.includes(language)) {
          const detected = (navigator.languages.find((lang => LANGUAGES.includes(lang.toLowerCase()))) || '').toLowerCase();
          const final = LANGUAGES.includes(detected) ? detected : LANGUAGES[0];
          const url = `/${final}/${urlQueryString}`;
          window.canonical = window.location.origin + url;
          return next({ path: url, replace: true });
        }

        if (i18n.locale !== language) {
          const requestedLanguage = LANGUAGES.includes(language) ? language : LANGUAGES[0];
          // eslint-disable-next-line
          const messages = await import(/* webpackChunkName: "i18n-[request]" */ '@/locales/' + requestedLanguage);
          i18n.setLocaleMessage(requestedLanguage, messages.default);
          document.documentElement.lang = requestedLanguage;
          i18n.locale = requestedLanguage;
          Vue.nextTick(() => {
            i18n.silentTranslationWarn = false;
          });
        }

        if (to.path === '/' && !isCountryLP) {
          return next({ path: `/${i18n.locale}/${urlQueryString}`, replace: true });
        }

        if (isCountryLP && countryCode) {
          const { data } = await api.get(`/lp_country_${countryCode}`);
          if (data) {
            directus.data = data;
          }
          next();
          return null;
        }

        const [locale] = Intl.getCanonicalLocales(i18n.locale);
        if (to.meta.page) {
          const { data } = await api.get(`/${to.meta.page}?filter[content][languages_code][_eq]=${locale}&fields=*.*`);
          if (data && data?.content && data.content.length >= 1) {
            directus.data = data.content[0];
          }
          next();
          // document.dispatchEvent(RENDERED_EVENT);
          return null;
        }
        if (to.meta.details) {
          let { data } = await api.get(`/${to.meta.details}?filter[content][slug][_eq]=${to.params.slug}&fields=*.*`);
          if (data && data.length >= 1) {
            data = data[0];
            if (data?.content && data.content.length >= 1) {
              if(['applications', 'news', 'jobs', 'articles'].includes(to.meta.details)) {
                directus.data = {categories: data.categories, data: data.content[0]};
              } else {
                directus.data = data.content[0];
              }
            }
            next();
            // document.dispatchEvent(RENDERED_EVENT);
            return null;
          }
        }

        if (to.meta.filtered) {
          let { data } = await api.get(`/${to.meta.collection}?filter[content][languages_code][_eq]=${locale}&filter[categories][categories_${to.meta.collection}_key][_eq]=${to.params.category}&fields=*.*&limit=-1&filter[status][_eq]=published`);
          if (data && data.length >= 1) {
            directus.data = data;
            next();
            // document.dispatchEvent(RENDERED_EVENT);
            return null;
          }
        }

        next();
        // document.dispatchEvent(RENDERED_EVENT);
        return null;
      });
      resolve(router);
    }
  });
}
