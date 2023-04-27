<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer @cookies="handleManageCookies"></Footer>
    <CookieNotice ref="cookieNotice"/>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import CookieNotice from '@/components/atoms/CookieNotice.vue';

export default {
  components: {
    Header,
    Footer,
    CookieNotice,
  },
  metaInfo: {
    title: '',
    titleTemplate: '%s | Casper Network',
  },
  watch: {
    $route: {
      handler(value) {
        this.hash = value.hash || null;
      },
    },
  },
  data() {
    return {
      hash: null,
    };
  },
  updated() {
    if (this.hash) {
      this.$nextTick(() => {
        const hash = this.hash.substr(1);
        const element = document.querySelector(`[data-slug='${hash}']`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
      });
    }
  },
  methods: {
    handleManageCookies() {
      this.$refs.cookieNotice.show();
    },
  },
};
</script>

<style lang="scss">
@import "./src/assets/scss/app.scss";
</style>
