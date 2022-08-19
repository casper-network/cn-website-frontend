<template>
  <div>
    <div class="container">
    <TextTeaser
      :has-button="false"
      box-title="<b>Get Started</b> as a develoepr on our Blockchain"
      box-content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit mattis fermentum, ut a in adipiscing eget. Fermentum est, bibendum nulla in. Arcu leo tellus enim in amet vitae tincidunt. Ac sit amet, condimentum vestibulum enim malesuada.">
    </TextTeaser>
    </div>
    <VideoCollection></VideoCollection>
    <CTACollection></CTACollection>
  </div>
</template>

<script>
import TextTeaser from '@/components/blocks/TextTeaser.vue';
import VideoCollection from '@/components/collections/VideoCollection.vue';
import CTACollection from '@/components/collections/CTACollection.vue';

export default {
  name: 'GetStartedDev',
  components: {
    TextTeaser,
    VideoCollection,
    CTACollection,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {},
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      glideData: [
        {
          image: 'https://picsum.photos/id/3/1920/1080',
          title: 'Green Blockchain',
          content: 'Teaser text why blockchains are not always polluters and how you can tell. It\'s worth taking a closer look, we\'re not evil and neither are our competitors always, just sometimes',
          link: {
            text: 'Learn more',
            url: '#',
          },
        },
        {
          image: 'https://picsum.photos/id/1/1920/1080',
          title: 'Usecases for Blockchains',
          content: 'Teaser text why blockchains are not always polluters and how you can tell. It\'s worth taking a closer look, we\'re not evil and neither are our competitors always, just sometimes',
          link: {
            text: 'Learn more',
            url: '#',
          },
        },
        {
          image: 'https://picsum.photos/id/2/1920/1080',
          title: 'Future of Blockchain',
          content: 'Teaser text why blockchains are not always polluters and how you can tell. It\'s worth taking a closer look, we\'re not evil and neither are our competitors always, just sometimes',
          link: {
            text: 'Learn more',
            url: '#',
          },
        },
        {
          image: 'https://picsum.photos/id/8/1920/1080',
          title: 'Blockchain ',
          content: 'Teaser text why blockchains are not always polluters and how you can tell. It\'s worth taking a closer look, we\'re not evil and neither are our competitors always, just sometimes',
          link: {
            text: 'Learn more',
            url: '#',
          },
        },
        {
          image: 'https://picsum.photos/id/2/1920/1080',
          title: 'Future of Blockchain',
          content: 'Teaser text why blockchains are not always polluters and how you can tell. It\'s worth taking a closer look, we\'re not evil and neither are our competitors always, just sometimes',
          link: {
            text: 'Learn more',
            url: '#',
          },
        },
        {
          image: 'https://picsum.photos/id/8/1920/1080',
          title: 'Blockchain ',
          content: 'Teaser text why blockchains are not always polluters and how you can tell. It\'s worth taking a closer look, we\'re not evil and neither are our competitors always, just sometimes',
          link: {
            text: 'Learn more',
            url: '#',
          },
        },
        {
          image: 'https://picsum.photos/id/2/1920/1080',
          title: 'Future of Blockchain',
          content: 'Teaser text why blockchains are not always polluters and how you can tell. It\'s worth taking a closer look, we\'re not evil and neither are our competitors always, just sometimes',
          link: {
            text: 'Learn more',
            url: '#',
          },
        },
        {
          image: 'https://picsum.photos/id/8/1920/1080',
          title: 'Blockchain ',
          content: 'Teaser text why blockchains are not always polluters and how you can tell. It\'s worth taking a closer look, we\'re not evil and neither are our competitors always, just sometimes',
          link: {
            text: 'Learn more',
            url: '#',
          },
        },
      ],
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {},
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
    // eslint-disable-next-line valid-typeof
    if (typeof this.$options.components.Hero === 'object') {
      this.$store.commit('changeNavigationTintState', 'light');
    } else {
      this.$store.commit('changeNavigationTintState', 'dark');
    }
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
@import "~scss/mixins";

div.container {
  padding-top: 270px;

  @include breakpoint('sm') {
    padding-top: 110px;
  }

  &.-long {
    padding-top: 0;
    margin-top: 0;
    margin-bottom: 80px;
  }
}
</style>
