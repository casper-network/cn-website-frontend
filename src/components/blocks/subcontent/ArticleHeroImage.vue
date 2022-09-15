<template>
  <div class="img">
    <img v-if="postImage" loading="lazy" :src="postImage" :alt="imgAlt" class="img-fluid">
  </div>
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'ArticleHeroImage',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    imgSrc: {
      type: String,
      default: null,
    },
    imgAlt: {
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
    postImage() {
      const img = this.imgSrc;
      if (img) {
        return `${API_URL}/assets/${img}`;
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
@import '~scss/variables';

div.img {
  width: 100%;
  aspect-ratio: 16 / 8;
  margin-top: 80px;

  &:empty {
    aspect-ratio: initial;
  }

  .img-fluid {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @include breakpoint('sm') {
      object-fit: cover;
    }
  }

  @include breakpoint('sm') {
    aspect-ratio: 16 / 8;
    margin-top: 32px;
  }
}
</style>
