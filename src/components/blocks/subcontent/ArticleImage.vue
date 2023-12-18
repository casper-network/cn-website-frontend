<template>
  <div class="container">
    <div class="img" :class="{reduced: isReduced}">
      <MediaImage
        :asset="imgSrc"
        :alt="imgAlt"
        class="img-fluid"
      />
      <p>{{imgAlt}}</p>
    </div>
  </div>
</template>

<script>
import MediaImage from '@/components/MediaImage.vue';

export default {
  name: 'ArticleImage',
  components: { MediaImage },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    imgAlt: {
      type: String,
      default: null,
    },
    isReduced: {
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
    return {};
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
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

div.container {
  padding: 0 30px;

  div.img {
    width: 100%;
    aspect-ratio: 16 / 8;
    margin-top: 80px;

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

    &.reduced {
      width: 57%;
      margin-left: auto;

      @include breakpoint('sm') {
        width: 100%;
      }
    }

    p {
      @include style-body('')
    }
  }
}
</style>
