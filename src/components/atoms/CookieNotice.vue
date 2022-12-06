<template>
  <div v-if="showNotice" id="cookieNotice" ref="cookieNotice">
    <p>
      This website uses cookies.
      <router-link :to="`/${$i18n.locale}/privacy-policy`">Privacy&nbsp;Policy</router-link>
    </p>
    <div class="buttons">
      <Button class="primary">
        <a href="#" @click="showModal">Manage</a>
      </Button>
      <Button class="secondary">
        <a href="#" @click="allowAll">Allow All</a>
      </Button>
    </div>
    <div class="modal" :class="{ visible: modalVisible }">
      <div/>
      <div>
        <div class="close"><SVGIconClose @click="closeModal()" /></div>
        <div class="content">
          <div class="item" v-for="(item, idx) in items" :key="`item-${idx}`">
            <div class="description">
              <h4>{{ item.title }} <span v-if="item.required">(Required)</span></h4>
              <div v-html="item.description"></div>
            </div>
            <div class="checkbox">
              <template v-if="item.required">
                <input
                  :value="item.parameter"
                  v-model="parameters"
                  :checked="item.required"
                  :disabled="item.required"
                  :id="`item-cb-${idx}`"
                  type="checkbox"
                >
                <label :for="`item-cb-${idx}`"></label>
              </template>
              <template v-else>
                <input
                  :value="item.parameter"
                  v-model="parameters"
                  :id="`item-cb-${idx}`"
                  type="checkbox"
                >
                <label :for="`item-cb-${idx}`"></label>
              </template>
            </div>
          </div>
        </div>
        <div class="actions">
          <Button class="primary">
            <a href="#" @click="save">Save</a>
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
      parameters: [],
      items: null,
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
  watch: {
    parameters(val) {
      console.log(val);
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
  async created() {
    const value = this.$cookies.get(COOKIE_NAME);
    if (value && value === COOKIE_ACCEPTED) {
      this.loadAnalytics();
    }
    if (!value) {
      this.showNotice = true;
      const [locale] = Intl.getCanonicalLocales(i18n.locale);
      const response = await this.$d.api.get(`/cookie_banner?filter[content][languages_code][_eq]=${locale}&fields=*.*.*.*`);
      let items = ((response.data?.content || [])[0] || {}).items || [];
      items = items.map((o) => ({ ...(o.item || {}) }));
      this.items = items;
      this.parameters = items.map((o) => o.parameter);
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
    allowAll(e) {
      e.preventDefault();
      this.modalVisible = false;
      this.$cookies.set(COOKIE_NAME, COOKIE_ACCEPTED, {
        expires: 365,
      });

      this.loadAnalytics();
      this.$emit(COOKIE_ACCEPTED);
      this.$refs.cookieNotice.classList.add('hidden');
    },
    save() {
      console.log('saving');
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
        padding: 28px;
        transition: all 0.3s ease-in-out;

        .close {
          width: 100%;
          margin-bottom: 16px;
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
        }

        .content {
          width: 100%;
          max-height: calc(75vh - 80px);
          font-size: 0.85rem;
          color: black;
          overflow: hidden;
          overflow-y: auto;

          & > .item {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            width: 100%;
            padding: 12px 4px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.075);

            &:last-of-type {
              border-bottom: 1px solid transparent;
            }

            & > div {
              &.description {
                width: calc(100% - 48px);
              }
              &.checkbox {
                position: relative;
                width: 34px;
                height: 18px;

                input[type=checkbox] {
                  position: absolute;
                  z-index: -1;
                  opacity: 0;

                  /* Box */
                  & + label:before {
                    position: absolute;
                    content: '';
                    left: 8px;
                    top: 26px;
                    width: 16px;
                    height: 16px;
                    border: 1px solid #ccc;
                    background-color: transparent;
                    transition: box-shadow 0.3s ease;
                    border-radius: 4px;
                  }

                  /* Checkmark */
                  & + label:after {
                    position: absolute;
                    content: "";
                    left: 14px;
                    top: 28px;
                    opacity: 0;
                    border-radius: 0;
                    width: 3px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 3px 3px 0;
                    transform: rotate(45deg);
                  }

                  /* Label */
                  & + label {
                    user-select: none;
                    font-family: inherit;
                    -webkit-tap-highlight-color: transparent;
                    position: absolute;
                    padding-left: 0;
                    cursor: pointer;
                    display: inline-block;
                  }

                  &:focus, &:hover {
                    & + label:before {
                    }
                  }

                  &:disabled {
                    & + label:before {
                      background-color: #0024CF;
                      border: 1px solid #0024CF;
                      opacity: 0.5;
                      cursor: default !important;
                    }
                    & + label:after {
                      opacity: 0.5;
                      cursor: default !important;
                    }
                    pointer-events: none;
                  }

                  &:checked {
                    & + label:before {
                      background-color: #0024CF;
                      border: 1px solid #0024CF;
                    }
                    & + label:after {
                      opacity: 1;
                    }
                  }
                }
              }
            }
          }

          ::v-deep {
            h4 {
              font-size: inherit;
              font-weight: bold;
              margin-bottom: 8px;
            }
            p {
              font-size: inherit;
              line-height: 1.1;
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
          max-width: none;
          display: flex;
          gap: 24px;
          justify-content: flex-end;

          & .btn.primary {
            transform: scale(0.8);
            transform-origin: 100% 100%;
          }

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
