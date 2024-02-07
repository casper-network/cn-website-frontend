<template>
  <div class="hero" :class="type" :style="`background-color: ${bgColor};`">
    <div class="outer-center">
      <div class="inner-left">
        <div class="hero__content">
          <div class="intro-content">
            <h1 v-html="blockTitle" :data-slug="slugged"></h1>
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
      </div>
      <div class="inner-right" :class="placement">
        <MediaImage
          :asset="heroImage"
          :class="{ more: moreImagePadding}"
          width="400"
          height="400"
        />
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
import slugify from 'slugify';
import MediaImage from '@/components/MediaImage.vue';

export default {
  name: 'Hero',
  components: { MediaImage },
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
    return {
      moreImagePadding: false,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    bgColor() {
      return this.block?.bgcolor || 'transparent';
    },
    placement() {
      return this.block?.imagepos || 'center';
    },
    heroImage() {
      const media = this.block?.media || [];
      if (media.length > 0 && media[0]) {
        return media[0];
      }
      return null;
    },
    slugged() {
      const title = (this.blockTitle || '').replace(/<\/?[^>]+(>|$)/g, '');
      return slugify(title, { lower: true, strict: true });
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
    this.checkContainerHeight();
  },
  // beforeUpdate() {},
  updated() {
    this.checkContainerHeight();
  },
  // beforeDestroy() {},
  // destroyed() {},
  //---------------------------------------------------
  //
  //  Methods
  //
  //---------------------------------------------------
  methods: {
    checkContainerHeight() {
      this.$nextTick(() => {
        const container = document.querySelector('.hero.reduced > .outer-center');
        if (container) {
          const rect = container.getBoundingClientRect();
          this.moreImagePadding = rect.height < 500;
        }
      });
    },
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
  overflow: hidden;

  @include breakpoint('sm') {
    height: auto;
    min-height: unset;
  }

  & > div.outer-center {
    margin: 0 auto;
    height: 100%;
    max-width: 1248px;
    display: flex;
    padding-left: 30px;
    padding-right: 30px;
    justify-content: flex-start;
    align-items: center;

    @include breakpoint('sm') {
      flex-direction: column;
      padding-left: 0;
      padding-right: 0;
    }

    & > div.inner-left {
      display: flex;
      align-items: center;
      height: 100%;
      max-width: 60%;
      min-width: 600px;

      @include breakpoint('sm') {
        padding-top: 60px;
        min-width: 100%;
        max-width: 100%;
        padding-bottom: 60px;
      }
    }
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
    margin: 0 auto;
    width: 100%;
    margin-top: var(--headerHeight);
    padding: 0;

    @include breakpoint('sm') {
      min-height: auto;
    }

    h1 {
      color: var(--color-black);
      font-weight: 300;
      flex: 1 0 40%;

      span {
        font-weight: 300;
      }

      @include breakpoint('sm') {
        width: 100%;
        max-width: 100%;
      }
    }

    ::v-deep h1 > strong {
      color: var(--color-white);
    }

    p {
      color: var(--color-black);
      font-weight: 300;
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

  .inner-right {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
      max-width: 400px;
      max-height: 400px;
    }

    &.center {
      align-items: center;
    }
    &.bottom {
      align-items: flex-end;

      @include breakpoint('sm') {
        align-items: flex-end;
        justify-content: flex-end;
        width: 100%;
        img {
          margin-right: 30px;
          max-width: 200px;
          max-height: 200px;
        }
      }
    }
  }

  &.reduced {
    height: auto;
    padding-top: 140px;
    padding-bottom: 100px;

    @include breakpoint('sm') {
      padding-top: 0;
    }

    & > div.outer-center {
      & > div.inner-right img {
        position: relative;

        &.more {
          top: 90px;
        }
      }
    }

    &.single {
      height: auto;
      padding-bottom: 0;

      & > div.outer-center {
        align-items: flex-start;
        & > div.inner-right img {
          position: relative;
        }
      }
    }
  }
}

.break {
  flex-basis: 100%;
  height: 0;
}

</style>
