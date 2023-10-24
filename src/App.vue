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
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {},
  //---------------------------------------------------
  //
  //  Meta
  //
  //---------------------------------------------------
  metaInfo: {
    title: '',
    titleTemplate: '%s | Casper Network',
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      hash: null,
      samePage: false,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {},
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
    $route: {
      handler(newval, oldval) {
        this.samePage = newval.path === oldval?.path;
        this.hash = newval.hash || null;
      },
    },
  },
  //---------------------------------------------------
  //
  //  Filter Properties
  //
  //---------------------------------------------------
  // filters: {},
  //---------------------------------------------------
  //
  //  Validation Properties
  //
  //---------------------------------------------------
  // validations: {},
  //---------------------------------------------------
  //
  //  Vue Lifecycle
  //
  //---------------------------------------------------
  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  // render(h) { return h(); },
  // mounted() {},
  // beforeUpdate() {},
  updated() {
    if (this.hash) {
      this.$nextTick(() => {
        const { samePage } = this;
        let { hash } = this;
        hash = hash.substr(1);
        const element = document.querySelector(`[data-slug='${hash}']`);
        if (element) {
          const options = { behavior: 'smooth', block: 'center', inline: 'center' };
          options.block = samePage ? 'start' : 'center';
          element.scrollIntoView(options);
        }
      });
    }
  },
  // beforeDestroy() {},
  // destroyed() {},
  //---------------------------------------------------
  //
  //  Methods
  //
  //---------------------------------------------------
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
