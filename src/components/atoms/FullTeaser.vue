<template>
  <div class="teaser-full" :class="teaserType" :style="`background-image: url(${bgImage});`">
    <video src="/video/bgvideo.mp4" autoplay loop muted v-if="!teaserBlock.media"></video>
    <div class="container">
      <h2 v-html="teaserTitle"></h2>
    </div>
    <Button class="secondary">
      <router-link :to="`/${$i18n.locale}${teaserTarget}`" v-if="teaserBlock.button.type === 'int'">
        {{ teaserLabel }}
      </router-link>
      <a :href="`/${$i18n.locale}${teaserTarget}`" v-if="teaserBlock.button.type === 'ext'">
        {{ teaserLabel }}
      </a>
    </Button>
  </div>
</template>

<script>
import config from '@/directus/config';

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
      return `${API_URL}/assets/${this.teaserBlock.media}`;
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
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 8;
  text-align: center;
  background: var(--color-gradient-diagonal);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: var(--color-white);
  margin-top: 160px;
  position: relative;

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
    font-weight: 400;
    font-size: 42px;
    margin-bottom: 32px;

    span {
      font-weight: 700;
    }
  }

  @include breakpoint('sm') {
    margin-top: 80px;
    padding-top: 120px;
    padding-bottom: 120px;

    h2 {
      font-size: 28px;
    }
  }
}
</style>
