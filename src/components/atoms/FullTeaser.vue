<template>
  <div class="teaser-full" :class="teaserType" :style="`${bgImage}`">
    <!-- <video src="/video/bgvideo.mp4" autoplay loop muted v-if="!teaserBlock.media"></video> -->
    <div class="container">
      <h2 class="h1" v-html="teaserTitle" :data-slug="slugged"></h2>
      <p v-html="teaserContent"></p>
      <Button class="secondary">
        <router-link :to="`/${$i18n.locale}${teaserTarget}`" v-if="teaserBlock.button.type === 'int'">
          {{ teaserLabel }}
        </router-link>
        <a :href="`/${$i18n.locale}${teaserTarget}`" v-if="teaserBlock.button.type === 'ext'">
          {{ teaserLabel }}
        </a>
      </Button>
    </div>
  </div>
</template>

<script>
import config from '@/directus/config';
import slugify from 'slugify';

const { API_URL } = config;

export default {
  name: 'FullTeaser',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    teaserBlock: Object,
    teaserTitle: {
      type: String,
      default: '',
    },
    teaserContent: {
      type: String,
      default: null,
    },
    teaserTarget: {
      type: String,
      default: '',
    },
    teaserLabel: {
      type: String,
      default: '',
    },
    teaserType: {
      type: String,
      default: '',
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
    bgImage() {
      const media = this.teaserBlock?.media;
      if (media) {
        return `background-image: url('${API_URL}/assets/${this.teaserBlock.media}');`;
      }
      return '';
    },
    slugged() {
      const title = (this.teaserTitle || '').replace(/<\/?[^>]+(>|$)/g, '');
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
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

.teaser-full {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  aspect-ratio: 16 / 8;
  text-align: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: var(--color-black);
  margin-top: 100px;
  position: relative;

  & > .container {
    display: block;
    width: 100%;
    text-align: left;

    & > * {
      max-width: 50%;
      @include breakpoint('sm') {
        max-width: 100%;
      }
    }

    p {
      padding: 0 0 45px 0;
    }
  }

  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    z-index: -1;
  }

  h2 {
    font-weight: 300;
    margin-bottom: 32px;

    ::v-deep strong {
      font-weight: 300 !important;
    }
    span {
      font-weight: 300;
    }
  }

  @include breakpoint('sm') {
    margin-top: 80px;
    padding-top: 120px;
    padding-bottom: 120px;
  }

  &.newsletter {
    margin-top: 0;
    background-color: var(--color-pelati);
  }
}
</style>
