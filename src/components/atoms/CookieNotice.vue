<template>
  <div id="cookieNotice" ref="cookieNotice">
    <p>This website uses cookies. <router-link :to="`/${$i18n.locale}/privacy-policy`">Privacy&nbsp;Policy</router-link></p>
    <div class="buttons">
      <Button class="primary">
        <a href="#" @click="declineCookies">Disable All</a>
      </Button>
      <Button class="secondary">
        <a href="#" @click="allowCookies">Allow All</a>
      </Button>
    </div>
  </div>
</template>

<script>
// import ScriptLoader from '@/utils/ScriptLoader';

export default {
  name: 'CookieNotice',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {},
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {};
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
  watch: {},
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
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  //---------------------------------------------------
  //
  //  Methods
  //
  //---------------------------------------------------
  methods: {
    allowCookies(e) {
      e.preventDefault();
      this.$cookies.set('cookie-notice', 'accepted', {
        expires: 365,
      });

      /*
      const layer = 'dataLayer';
      window[layer] = window[layer] || [];
      window[layer].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      ScriptLoader.load('https://www.googletagmanager.com/gtm.js?id=GTM-PHQC53L', 'gtag', true);
      */

      this.$emit('accepted');
      this.$refs.cookieNotice.classList.add('hidden');
    },
    declineCookies(e) {
      e.preventDefault();
      this.$cookies.set('cookie-notice', 'declined', {
        expires: 365,
      });
      this.$emit('declined');
      this.$refs.cookieNotice.classList.add('hidden');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

#cookieNotice {
  background: var(--color-blue);
  color: var(--color-white);
  padding: 16px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50vw;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999999;
  outline: 1px solid var(--color-white);
  transition: all 0.65s ease-in-out;

  @include breakpoint('sm') {
    width: calc(100% - 24px);
    left: 0;
    right: 0;
    flex-direction: column;
    padding: 25px 12px;
  }

  &.hidden {
    transform: translateY(100%);
  }

  p {
    font-size: 18px;
    line-height: 1.4;
    text-align: center;
  }

  a {
    border-bottom: 1px solid white;
  }

  .buttons {
    display: flex;
    gap: 24px;

    @include breakpoint('sm') {
      margin-top: 24px;
    }

    a {
      border-bottom: 0;
    }
  }
}
</style>
