<template>
  <div v-if="showNotice" id="cookieNotice" ref="cookieNotice">
    <p>
      This website uses cookies.
      <template v-if="content">
        <span class="readmore" @click="showModal()">Read more</span>
      </template>
      <template v-else>
        <router-link :to="`/${$i18n.locale}/privacy-policy`">Privacy&nbsp;Policy</router-link>
      </template>
    </p>
    <div class="buttons">
      <Button class="primary">
        <a href="#" @click="declineCookies">Disable All</a>
      </Button>
      <Button class="secondary">
        <a href="#" @click="allowCookies">Allow All</a>
      </Button>
    </div>
    <div class="modal" :class="{ visible: modalVisible }">
      <div/>
      <div>
        <div class="close"><SVGIconClose @click="closeModal()" /></div>
        <div class="content" v-html="content" />
        <div class="actions">
          <Button class="secondary">
            <a href="#" @click="declineCookies">Disable All</a>
          </Button>
          <Button class="primary">
            <a href="#" @click="allowCookies">Allow All</a>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SVGIconClose from '@/assets/svg/close.svg?inline';
import ScriptLoader from '@/utils/ScriptLoader';
import i18n from '@/i18n';

const COOKIE_NAME = 'cookie-notice';
const COOKIE_ACCEPTED = 'accepted';
const COOKIE_DECLINED = 'declined';

export default {
  name: 'CookieNotice',
  components: {
    SVGIconClose,
  },
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
    return {
      content: null,
      showNotice: false,
      modalVisible: false,
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
  async created() {
    const value = this.$cookies.get(COOKIE_NAME);
    if (value && value === COOKIE_ACCEPTED) {
      this.loadAnalytics();
    }
    if (!value) {
      this.showNotice = true;
      const [locale] = Intl.getCanonicalLocales(i18n.locale);
      const response = await this.$d.api.get(`/cookie_banner?filter[content][languages_code][_eq]=${locale}&fields=*.*`);
      this.content = response.data?.content[0]?.content || null;
    }
  },
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
    showModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    allowCookies(e) {
      e.preventDefault();
      this.modalVisible = false;
      this.$cookies.set(COOKIE_NAME, COOKIE_ACCEPTED, {
        expires: 365,
      });

      this.loadAnalytics();
      this.$emit(COOKIE_ACCEPTED);
      this.$refs.cookieNotice.classList.add('hidden');
    },
    declineCookies(e) {
      e.preventDefault();
      this.modalVisible = false;
      this.$cookies.set(COOKIE_NAME, COOKIE_DECLINED, {
        expires: 365,
      });
      this.$emit(COOKIE_DECLINED);
      this.$refs.cookieNotice.classList.add('hidden');
    },
    loadAnalytics() {
      const layer = 'dataLayer';
      window[layer] = window[layer] || [];
      window[layer].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      ScriptLoader.load('https://www.googletagmanager.com/gtm.js?id=GTM-PHQC53L', 'gtag', true);
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
    transform: translateY(calc(100% + 1px));
  }

  .readmore {
    white-space: nowrap;
    text-decoration: underline;
    cursor: pointer;
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

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    & > div {
      &:first-of-type {
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
      }

      &:last-of-type {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 500px;
        max-height: 80vh;
        width: 45vw;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        border-radius: var(--border-radius-teaser);
        padding: 48px;
        transition: all 0.3s ease-in-out;

        .close {
          width: 100%;
          margin-bottom: 16px;
          display: flex;
          justify-content: flex-end;
        }

        .content {
          max-height: calc(75vh - 80px);
          font-size: 16px;
          color: black;
          overflow: hidden;
          overflow-y: auto;

          ::v-deep {
            p {
              font-size: inherit;
              line-height: 25px;
            }
            ul li {
              margin-bottom: 4px;
            }

            a {
              color: var(--color-blue);
              font-size: inherit;
              text-decoration: underline;
            }
          }
        }

        .actions {
          margin-top: 24px;
          width: 100%;
          display: flex;
          gap: 24px;
          transform: scale(0.8, 0.8);
          transform-origin: 50% 50%;
          justify-content: center;

          @include breakpoint('sm') {
            margin-top: 24px;
            justify-content: space-between;
          }

          a {
            border-bottom: 0;
          }
        }

        @include breakpoint('sm') {
          width: 80vw;
          padding: 23px;
        }
      }
    }

    &.visible {
      position: fixed;
      display: block;
    }
  }
}
</style>
