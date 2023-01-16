<template>
  <div>
    <div class="container">
    <TextTeaser
      box-title="Get <b>Started</b>"
      box-content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit mattis fermentum, ut a in adipiscing eget. Fermentum est, bibendum nulla in. Arcu leo tellus enim in amet vitae tincidunt. Ac sit amet, condimentum vestibulum enim malesuada."></TextTeaser>
    </div>
    <CountUpCollection></CountUpCollection>
    <VideoCollection></VideoCollection>
    <FullTeaser
      teaser-title="Check out our rich <b>Ecosystem</b><br/>of Apps <b>built on Casper</b>"
    teaser-label="Tell me more" teaser-target="ecosystem"></FullTeaser>
    <Carousel :glide-data="glideData" block-title="<b>Blockchain</b> Glossary"/>
    <Carousel :glide-data="glideData" block-title="<b>Proof</b> of <b>Stake</b>"/>
    <Carousel :glide-data="glideData" block-title="<b>Web</b> 3"/>
  </div>
</template>

<script>
import TextTeaser from '@/components/blocks/TextTeaser.vue';
import VideoCollection from '@/components/collections/VideoCollection.vue';
import FullTeaser from '@/components/atoms/FullTeaser.vue';
import Carousel from '@/components/blocks/Carousel.vue';
import CountUpCollection from '@/components/collections/CountUpCollection.vue';

export default {
  name: 'GetStartedReg',
  components: {
    TextTeaser,
    Carousel,
    FullTeaser,
    VideoCollection,
    CountUpCollection,
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

<style lang="scss" scoped>
div.container {
  padding-top: 270px;
}
</style>
