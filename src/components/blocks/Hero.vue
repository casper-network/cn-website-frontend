<template>
  <div class="hero" :class="type">
    <div>
      <div class="hero__content">
        <div class="intro-content">
          <h1 v-html="blockTitle"></h1>
          <p v-html="blockContent"></p>
        </div>
        <slot></slot>
        <div class="buttons" v-if="buttons">
          <Button v-for="(button, btnIndex) in buttons" :key="`hero-btn-${btnIndex}`" :class="button.style">
            <template v-if="button.type === 'ext'">
              <a :href="button.url" target="_blank" rel="noopener">{{ button.text }}</a>
            </template>
            <template v-else>
              <router-link :to="`/${$i18n.locale}${button.url}`">
                {{ button.text }}
              </router-link>
            </template>
          </Button>
        </div>
      </div>
      <Disturber
        v-if="cta.url"
        :cta-u-r-l="cta.url"
        cta-target="_blank"
      >
        <div v-html="cta.text"></div>
      </Disturber>
    </div>
  </div>
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'Hero',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    type: String,
    block: Object,
    blockTitle: {
      type: String,
      default: 'hero title',
    },
    blockContent: {
      type: String,
      default: 'hero content',
    },
    cta: {
      type: Object,
      default() {
        return {};
      },
    },
    buttons: {
      type: Array,
      default() {
        return [];
      },
    },
  },
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
    heroImage() {
      const media = this.block?.media || [];
      if (media.length === 0) {
        if (this.type === 'full' || this.type === '' || !this.type) {
          return '/img/bg.webp';
        }
        return `${API_URL}/assets/34dff585-16a1-4499-ac08-907f5c853e25`;
      }
      return `${API_URL}/assets/${media[0]}`;
    },
  },
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
  // created() {},
  // beforeMount() {},
  // render(h) { return h(); },
  mounted() {
    const root = document.querySelector(':root');
    root.style.setProperty('--heroBG', `url(${this.heroImage})`);
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

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

div.hero {
  display: block;
  width: 100%;
  position: relative;
  height: 100vh;

  &.reduced {
    min-height: 50vh;
    height: initial;

    > div {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%),
      linear-gradient(90.28deg, rgba(0, 0, 0, 0.2) 0.21%, rgba(0, 0, 0, 0) 72.89%),
      var(--heroBG);
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      padding: 120px 30px;

      > div.intro-content {
        display: flex;
        flex-direction: row;

        @include breakpoint('sm') {
          flex-direction: column;
        }
      }

      @include breakpoint('sm') {
        flex-direction: column;
      }
    }

    &.single {
      height: auto;

      .hero__content {
        padding: 210px 20px 120px 20px;
        @include breakpoint('sm') {
          padding-top: 120px;
        }
      }
    }
  }

  > div {
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%),
    linear-gradient(90.28deg, rgba(0, 0, 0, 0.2) 0.21%, rgba(0, 0, 0, 0) 72.89%),
    var(--heroBG);
    background-size: cover;
    background-position: center;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .cta {
    position: absolute;
    right: 10vw;
    top: 20vh;

    @include breakpoint('sm') {
      display: none;
    }
  }

  .hero__content {
    flex-direction: column;
    // padding-left: 10vw;
    max-width: 1248px;
    margin: 0 auto;
    width: 100%;
    margin-top: var(--headerHeight);
    padding: 0 30px;

    @include breakpoint('sm') {
    }

    h1 {
      width: 40%;
      color: white;
      font-weight: 300;
      flex: 1 0 40%;

      span {
        font-weight: 700;
      }

      @include breakpoint('sm') {
        width: 100%;
        max-width: 100%;
      }
    }

    p {
      max-width: 50%;
      color: white;
      flex: 1 auto;
      // margin-bottom: 36px;

      @include breakpoint('sm') {
        width: 100%;
        max-width: 100%;
      }
    }

    .buttons {
      display: flex;
      gap: 16px;
      margin-top: 32px;

      @include breakpoint('sm') {
        flex-direction: column;
      }
    }

    @include breakpoint('sm') {
      padding: 0 20px;
    }
  }
}

.break {
  flex-basis: 100%;
  height: 0;
}

</style>
