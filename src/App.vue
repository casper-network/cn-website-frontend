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
