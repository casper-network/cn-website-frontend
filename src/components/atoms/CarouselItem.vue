<template>
  <div class="carousel-item">
    <router-link :to="cardData.link.url" v-if="cardData.link.type === 'int'">
      <img loading="lazy" :src="postImage" alt="">
    </router-link>
    <a :href="cardData.link.url" v-if="cardData.link.type === 'ext'"  target="_blank">
      <img loading="lazy" :src="postImage" alt="">
    </a>
    <router-link :to="cardData.link.url" v-if="cardData.link.type === 'int'">
    <p class="h4" v-html="cardData.title"></p>
    <div v-html="cardData.content"></div>
    </router-link>
    <a :href="cardData.link.url" v-if="cardData.link.type === 'ext'"  target="_blank">
      <p class="h4" v-html="cardData.title"></p>
      <p v-html="cardData.content"></p>
    </a>
    <router-link class="read-more" :to="cardData.link.url" v-if="cardData.link.type === 'int'">
      {{cardData.link.text}}
    </router-link>
    <a class="read-more" :to="cardData.link.url" v-if="cardData.link.type === 'ext'" target="_blank">
      {{cardData.link.text}}
    </a>
  </div>
</template>

<script>
export default {
  name: 'CarouselItem',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    cardData: Object,
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
      return process.env.VUE_APP_ASSET_URL + this.cardData.image;
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

@keyframes flash {
  25% { opacity: .3; }
  100% { opacity: 1;  }
}

.carousel-item {

  &:hover {
    img {
      transform: translateY(16px);
      animation: flash 0.45s;
    }
  }

  img {
    aspect-ratio: 16 / 9;
    max-width: 100%;
    width: 100%;
    height: auto;
    margin: 0 0 32px;
    object-fit: cover;
    border-radius: var(--border-radius-input);
    transition: transform 0.35s ease-in-out;

    @include breakpoint('sm') {
      display: none;
    }
  }

  div ::v-deep p {
    @include style-body('medium');
  }

  p.h4 {
    margin-bottom: 16px;
    font-weight: 700;
  }

  a.read-more {
    margin-top: 16px;
    display: inline-block;
    color: var(--color-blue);
    border-bottom: 1px solid var(--color-blue);
  }

  @include breakpoint('sm') {
    padding-top: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--color-grey-light);
  }
}
</style>
