<template>
  <div class="text-component" :class="{ margined: setAsH1, reversed: variation === 'text-right' }" :style="computedStyles">
    <div class="container">
      <div>
        <h1 v-if="setAsH1" class="h1" v-html="boxTitle" />
        <h2 v-else class="h1" v-html="boxTitle" />
        <p v-html="boxContent"></p>
        <Button class="primary" v-if="buttonTarget">
          <router-link v-if="buttonType === 'int'" :to="`/${$i18n.locale}${buttonTarget}`">
            {{buttonLabel}}
          </router-link>
          <a v-if="buttonType === 'ext'" :href="`${buttonTarget}`" target="_blank">
            {{buttonLabel}}
          </a>
        </Button>
      </div>
      <div>
        <img v-if="image" :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'TextTeaser',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    boxTitle: {
      type: String,
      default: 'Titel',
    },
    boxContent: {
      type: String,
      default: '',
    },
    buttonLabel: {
      type: String,
      default: '',
    },
    buttonTarget: {
      type: String,
      default: '',
    },
    buttonType: {
      type: String,
      default: '',
    },
    hasButton: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: null,
    },
    titleColor: {
      type: String,
      default: null,
    },
    textColor: {
      type: String,
      default: null,
    },
    media: {
      type: Array,
      defualt: null,
    },
    variation: {
      type: String,
      default: 'text-left',
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      setAsH1: false,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    computedStyles() {
      const { bgColor, titleColor, textColor } = this;
      let out = '--hcolor:initial;';
      if (titleColor) {
        out += `--hcolor:${titleColor};`;
      }
      if (bgColor) {
        out += `background-color:${bgColor};`;
      }
      if (textColor) {
        out += `color:${textColor}`;
      }
      return out;
    },
    image() {
      const media = this.media || [];
      if (media.length > 0 && media[0]) {
        return `${API_URL}/assets/${media[0]}`;
      }
      return null;
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
  mounted() {
    const h1 = document.querySelector('h1');
    if (!h1 && window.h1Set !== true) {
      this.setAsH1 = true;
      window.h1Set = true;
    }
    console.log('Variation:', this.variation);
    console.log('BG Color:', this.bgColor);
    console.log('Title Color:', this.titleColor);
    console.log('Text Color:', this.textColor);
    console.log('Media:', this.media);
  },
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
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss">
@import '~scss/mixins';

.text-component {
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 32px;
    padding-top: 100px;
    padding-bottom: 100px;

    > div:first-child {
      width: 55%;
      min-width: 55%;
    }

    > div:last-child {
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;

      & > img {
        width: 100%;
        max-width: 400px;
        height: auto;
      }
    }

    @include breakpoint('sm') {
      flex-direction: column;
      padding-top: 45px;
      // padding-bottom: 45px;

      > div:first-child {
        width: 100%;
      }

      > div:last-child {
        width: 100%;

        & > img {
          max-width: 280px;
        }
      }
    }

    h1, h2, h3, h4, h5, h6 {
      color: var(--hcolor);
    }

    h1 {
      font-weight: 300;
      margin-bottom: 48px;

      span {
        font-weight: 300;
      }
    }

    p {
      font-weight: 300;

      a {
        font-family: inherit;
        font-size: inherit;
        color: var(--color-blue);
        text-decoration: underline;
      }
    }

    .btn.primary {
      margin-top: 32px;

      @include breakpoint('sm') {
        margin-top: 24px;
      }
    }
  }

  &.white {
    color: var(--color-white);
  }

  &.no-bottom {
    & > div {
      padding-bottom: 0;
    }
  }

  &.reversed {
    & > div {
      flex-direction: row-reverse;
      gap: 64px;

      > div:first-child {
        width: 55%;
        min-width: 55%;
      }

      > div:last-child {
        width: 35%;
        display: flex;
        justify-content: center;
        align-items: center;

        & > img {
          width: 100%;
          max-width: 400px;
          height: auto;
        }
      }

      @include breakpoint('sm') {
        flex-direction: column;
      }
    }
  }

  &.fullwidth {
    & > div {
      > div:first-child {
        width: 100%;
        min-width: 100%;
      }

      > div:last-child {
        width: 100%;
      }
    }
  }
}
</style>
