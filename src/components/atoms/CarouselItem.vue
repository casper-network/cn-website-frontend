<template>
  <div class="carousel-item">
    <router-link :to="cardData.link.url" v-if="cardData.link.type === 'int'">
      <MediaImage
        :asset="postImage"
        width="378"
        height="213"
        loading="lazy"
      />
    </router-link>
    <a :href="cardData.link.url" v-if="cardData.link.type === 'ext'"  target="_blank">
      <MediaImage
        :asset="postImage"
        width="378"
        height="213"
        loading="lazy"
      />
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
import MediaImage from '@/components/MediaImage.vue';

export default {
  name: 'CarouselItem',
  components: { MediaImage },
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
      return this.cardData.image;
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
      // animation: flash 0.45s;
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

  p {
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  div ::v-deep p {
    @include style-body('medium');
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  p.h4 {
    margin-bottom: 16px;
    line-height: 1.2;
    letter-spacing: 2px;
    font-weight: 400;
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
