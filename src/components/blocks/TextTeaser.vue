<template>
  <div
    class="text-component"
    :class="{ margined: setAsH1, reversed: variation === 'text-right', 'is-first': isFirst }"
    :style="computedStyles">
    <div class="container">
      <div>
        <h1 v-if="setAsH1" class="h1" v-html="boxTitle" :data-slug="slugged" />
        <h2 v-else class="h1" v-html="boxTitle" :data-slug="slugged" />
        <p v-html="boxContent"></p>
        <Button class="primary" v-if="hasButton">
          <router-link v-if="button.type === 'int'" :to="`/${$i18n.locale}${button.url}`">
            {{ button.text }}
          </router-link>
          <a v-if="button.type === 'ext'" :href="`${button.url}`" target="_blank">
            {{ button.text }}
          </a>
        </Button>
        <template v-if="hasButton && hasFile">
          &nbsp;
        </template>
        <Button class="primary" v-if="hasFile">
          <a :href="downloadLink(file.id)" target="_blank">{{file.text}}</a>
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
import slugify from 'slugify';

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
    button: {
      type: Object,
      default: null,
    },
    file: {
      type: Object,
      default: null,
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
    linkColor: {
      type: String,
      default: null,
    },
    media: {
      type: Array,
      default: null,
    },
    variation: {
      type: String,
      default: 'text-left',
    },
    isFirst: {
      type: Boolean,
      default: false,
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
      imageDescription: null,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    computedStyles() {
      const {
        bgColor,
        titleColor,
        textColor,
        linkColor,
      } = this;

      let out = '--hcolor:initial;';
      if (titleColor) {
        out += `--hcolor:${titleColor};`;
      }
      if (bgColor) {
        out += `background-color:${bgColor};`;
      }
      if (textColor) {
        out += `color:${textColor};`;
      }
      if (linkColor) {
        out += `--lcolor:${linkColor};`;
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
    hasFile() {
      const { file } = this;
      return file && file.id && file.text;
    },
    hasButton() {
      const { button } = this;
      return button && button.url && button.text;
    },
    slugged() {
      const title = (this.boxTitle || '').replace(/<\/?[^>]+(>|$)/g, '');
      return slugify(title, { lower: true, strict: true });
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
  async mounted() {
    const h1 = document.querySelector('h1');
    if (!h1 && window.h1Set !== true) {
      this.setAsH1 = true;
      window.h1Set = true;
    }
    /*
    const media = this.media || [];
    if (media.length > 0 && media[0]) {
      const resp = await fetch(`${API_URL}/files/${media[0]}?fields=description`);
      const data = await resp.json();
      console.log(data);
    }
    */
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
    downloadLink(linkID) {
      return `${API_URL}/assets/${linkID}?download`;
    },
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
        color: var(--lcolor, var(--color-blue));
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

  &.is-first {
    & > div {
      padding-top: 200px;

      @include breakpoint('s') {
        padding-top: 150px;
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
        padding-top: 45px;

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
