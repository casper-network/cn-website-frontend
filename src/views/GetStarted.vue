<template>
  <div>
    <Hero type="reduced" block-title="Get <b>Started</b>"
          block-content="Activated charcoal chartreuse pabst snackwave, fugiat shabby chic la croix retro non est church-key gastropub.Sartorial schlitz letterpress pariatur. Scenester veniam 3 wolf moon flexitarian fingerstache blue bottle cardigan snackwave."/>
    <StartNow block-title=""/>
    <Carousel :glide-data="glideData" block-title="Find out more about the <b>blockchain</b>"/>
  </div>
</template>

<script>
import Hero from '@/components/blocks/Hero.vue';
import StartNow from '@/components/collections/StartNow.vue';
import Carousel from '@/components/blocks/Carousel.vue';

export default {
  name: 'GetStarted',
  components: {
    Hero,
    StartNow,
    Carousel,
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

<style lang="scss">
</style>
