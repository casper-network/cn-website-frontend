<template>
  <div v-if="showNotice" id="cookieNotice" ref="cookieNotice">
    <div></div>
    <div>
      <template v-if="!showManage">
        <h2>{{ notice.title }}</h2>
        <div class="body" v-html="notice.body" />
        <div class="actions">
          <button @click="manageCookies">Manage Cookies</button>
          <button @click="confirmAll">Allow All</button>
        </div>
      </template>
      <template v-else>
        <h2>{{ manage.title }}</h2>
        <div class="body" v-html="manage.body" />
        <div class="items">
          <div class="item" v-for="(item, idx) in items" :key="`item-${idx}`">
            <div class="title-checkbox" :class="{ required: item.required }" @click="handleTitleClick($event, item.parameter)">
              <div class="title">{{ item.title }}</div>
              <div class="checkbox">
                <template v-if="item.required">
                  <input
                    :value="item.parameter"
                    v-model="selections"
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
                    v-model="selections"
                    :id="`item-cb-${idx}`"
                    type="checkbox"
                  >
                  <label :for="`item-cb-${idx}`"></label>
                </template>
              </div>
            </div>
            <div class="description" v-html="item.description" />
          </div>
        </div>
        <div class="actions">
          <button @click="confirmChoices">Confirm Choices</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ScriptLoader from '@/utils/ScriptLoader';
import i18n from '@/i18n';

const COOKIE_NAME = 'cookie-prefs';

export default {
  name: 'CookieNotice',
  components: {
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
      notice: {
        title: null,
        body: null,
      },
      manage: {
        title: null,
        body: null,
      },
      items: null,

      selections: [],
      showNotice: false,
      showManage: false,
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
    const [locale] = Intl.getCanonicalLocales(i18n.locale);
    const response = await this.$d.api.get(`/cookie_banner?filter[content][languages_code][_eq]=${locale}&fields=*.*.*.*`);
    this.notice = {
      title: ((response.data?.content || [])[0] || {}).noticeTitle || null,
      body: ((response.data?.content || [])[0] || {}).noticeBody || null,
    };
    this.manage = {
      title: ((response.data?.content || [])[0] || {}).manageTitle || null,
      body: ((response.data?.content || [])[0] || {}).manageBody || null,
    };

    let items = ((response.data?.content || [])[0] || {}).items || [];
    items = items.map((o) => ({ ...(o.item || {}) }));
    this.items = items;

    const value = this.$cookies.get(COOKIE_NAME);
    if (value && value !== '') {
      this.selections = JSON.parse(value);
      this.loadAnalytics();
    }
    if (!value) {
      this.selections = items.map((o) => o.parameter);
      this.show();
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
    async show() {
      this.showNotice = true;
      this.showManage = false;
      document.body.classList.add('no-scroll');
    },
    manageCookies() {
      this.showManage = true;
    },
    confirmChoices() {
      this.$cookies.set(COOKIE_NAME, JSON.stringify(this.selections), { expires: 365 });
      this.loadAnalytics();
      this.showManage = false;
      this.showNotice = false;
      document.body.classList.remove('no-scroll');
    },
    confirmAll() {
      this.selections = this.items.map((o) => o.parameter);
      this.$cookies.set(COOKIE_NAME, JSON.stringify(this.selections), { expires: 365 });
      this.loadAnalytics();
      this.showManage = false;
      this.showNotice = false;
      document.body.classList.remove('no-scroll');
    },
    loadAnalytics() {
      const { items, selections } = this;
      const layer = 'dataLayer';
      window[layer] = window[layer] || [];

      items.forEach((item) => {
        const { parameter } = item;
        const state = selections.includes(parameter) ? 'active' : 'inactive';
        const obj = { event: parameter };
        obj[parameter] = state;
        const index = window[layer].findIndex((o) => o.event === parameter);
        if (index !== -1) {
          window[layer].splice(index, 1);
        }
        window[layer].push(obj);
      });

      console.log(window[layer]);
      window[layer].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      ScriptLoader.load('https://www.googletagmanager.com/gtm.js?id=GTM-PHQC53L', 'gtag', true);
    },
    handleTitleClick(evt, value) {
      evt.preventDefault();
      evt.stopPropagation();
      const index = this.selections.findIndex((val) => val === value);
      if (index !== -1) {
        this.selections.splice(index, 1);
      } else {
        this.selections.push(value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

#cookieNotice {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
  z-index: 9999999;

  & > div:first-of-type {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    z-index: 1;
  }

  & > div:last-of-type {
    position: relative;
    background: var(--color-lighthouse);
    color: var(--color-black);
    width: 45vw;
    max-width: 568px;
    height: auto;
    max-height: calc(100vh - 160px);
    z-index: 2;
    outline: 1px solid var(--color-white);
    transition: all 0.65s ease-in-out;
    padding: 24px 32px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
    overflow-y: auto;

    @include breakpoint('sm') {
      width: 75vw;
    }

    & > .close {
      cursor: pointer;
      position: absolute;
      right: 24px;
      top: 16px;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 12px;
    }

    & > .body {
      font-size: 0.9rem;

      ::v-deep {
        p {
          font-size: 0.9rem;
          line-height: 1.4;
          font-weight: 300;
        }

        a {
          color: var(--color-blue);
          font-size: inherit;
          text-decoration: underline;
        }
      }
    }

    & > .items {
      border-top: 1px solid var(--color-grey-medium);
      padding-top: 24px;
      margin-top: 24px;

      & > .item {
        margin-bottom: 24px;
        font-weight: 300;
        border-top: 1px solid #DFDFDF;
        padding-top: 24px;

        &:first-of-type {
          padding-top: 0;
          border-top: 0;
        }
        &:last-of-type {
          margin-bottom: 48px;
        }

        & > .title-checkbox {
          pointer-events: all;
          cursor: pointer;
          &.required {
            pointer-events: none;
            cursor: default;
          }
        }

        & > div:first-of-type {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;

          & > .title {
            font-size: 1rem;
            font-weight: 400;
            letter-spacing: 1px;
          }

          & > .checkbox {
            position: relative;
            width: 34px;
            height: 18px;

            input[type=checkbox] {
              position: absolute;
              z-index: -1;
              opacity: 0;

              & + label:before {
                position: absolute;
                content: '';
                left: 8px;
                top: 2px;
                width: 16px;
                height: 16px;
                border: 2px solid var(--color-black);
                background-color: transparent;
                transition: box-shadow 0.3s ease;
              }

              & + label:after {
                position: absolute;
                content: "";
                left: 15px;
                top: 5px;
                opacity: 0;
                border-radius: 0;
                width: 3px;
                height: 8px;
                border: solid var(--color-black);
                border-width: 0 3px 3px 0;
                transform: rotate(45deg);
              }

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
                  background-color: var(--color-black);
                  border: 2px solid transparent !important;
                  opacity: 0.5;
                  cursor: default !important;
                }
                & + label:after {
                  opacity: 0.5 !important;
                  cursor: default !important;
                }
                pointer-events: none;
              }

              &:checked {
                & + label:before {
                  background-color: var(--color-atomic-lime);
                  border: 2px solid var(--color-black);
                }
                & + label:after {
                  opacity: 1;
                }
              }
            }
          }
        }

        & > div:last-of-type {
          width: calc(100% - 34px);
          ::v-deep {
            p {
              font-size: 0.8rem;
            }

            a {
              color: var(--color-blue);
              font-size: inherit;
              text-decoration: underline;
            }
          }
        }
      }
    }

    & > .actions {
      margin-top: 24px;
      display: flex;
      justify-content: flex-end;
      gap: 16px;

      button {
        background-color: var(--color-black);
        border: 2px solid var(--color-atomic-lime);
        color: var(--color-atomic-lime);
        padding: 8px 16px;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        font-size: 1rem;

        &:last-of-type {
          background-color: var(--color-atomic-lime);
          color: var(--color-black);
        }
      }
    }
  }
}
</style>
