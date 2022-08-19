<template>
  <div class="lang-switcher">
    <SVGIconGlobe @click="openLanguageSelectionModal()"/>
    <p class="current-language" @click="openLanguageSelectionModal()">
      {{ getHumanReadableLanguage }}
    </p>
    <div class="modal-bg"></div>
    <div id="modal" class="modal-box">
      <div>
        <h4>Language switch</h4>
        <SVGIconClose @click="closeModal()" />
      </div>
      <ul>
        <li>
          <a href="#">English</a>
          <SVGIconArrowRight />
        </li>
        <li>
          <a href="#">中文</a>
          <SVGIconArrowRight />
        </li>
        <li>
          <a href="#">한국어</a>
          <SVGIconArrowRight />
        </li>
        <li>
          <a href="#">日本語</a>
          <SVGIconArrowRight />
        </li>
        <li>
          <a href="#">Türkçe</a>
          <SVGIconArrowRight />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SVGIconGlobe from '@/assets/svg/globe.svg?inline';
import SVGIconClose from '@/assets/svg/close.svg?inline';
import SVGIconArrowRight from '@/assets/svg/arrowRight.svg?inline';

export default {
  name: 'LanguageSwitcher',
  components: {
    SVGIconGlobe,
    SVGIconClose,
    SVGIconArrowRight,
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
    return {};
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    getHumanReadableLanguage() {
      switch (this.$i18n.locale) {
        case 'de':
          return 'Deutsch';
        case 'en':
        default:
          return 'English';
      }
    },
  },
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
    openLanguageSelectionModal() {
      document.querySelector('#modal').classList.add('open');
      document.querySelector('.modal-bg').classList.add('open');
      document.body.classList.add('no-scroll');
    },
    closeModal() {
      document.querySelector('#modal').classList.remove('open');
      document.querySelector('.modal-bg').classList.remove('open');
      document.body.classList.remove('no-scroll');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.lang-switcher {
  display: flex;
  align-items: center;
}

svg {
  margin-right: 8px;
  cursor: pointer;
  width: 24px;
}

p {
  font-size: 14px;
  cursor: pointer;
}

.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 998;
  pointer-events: none;
  opacity: 0;

  &.open {
    pointer-events: all;
    opacity: 1;
  }
}

#modal {
  &.modal-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 150%);
    max-width: 500px;
    width: 45vw;
    background: white;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: var(--border-radius-teaser);
    padding: 48px;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease-in-out;

    @include breakpoint('sm') {
      width: 80vw;
      padding: 23px;
    }

    &.open {
      opacity: 1;
      pointer-events: all;
      transform: translate(-50%, -50%);
    }

    h2 {
      margin: 0;
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 48px;
      width: 100%;

      h4 {
        font-weight: 400;
      }
    }

    > ul {
      list-style: none;
      padding: 0;
      width: 100%;

      li {
        padding: 18px 18px;
        display: flex;
        cursor: pointer;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--color-grey-dark);

        svg {
          transform: translateX(-9px);
          transition: all 0.15s ease-in-out;
          width: 32px;
        }

        &:last-child {
          border-bottom: 1px solid var(--color-grey-dark);
        }

        &:hover {
          color: var(--color-blue);
          background: var(--color-grey-light);

          svg {
            transform: translateX(9px);
          }
        }
      }
    }
  }
}
</style>
