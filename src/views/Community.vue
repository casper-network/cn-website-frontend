<template>
  <div>
    <div class="container">
      <TextTeaser
        :has-button="false"
        box-title="<b>Team</b> up with Casper and enrich <b>our community.</b>"
        box-content="Activated charcoal chartreuse pabst snackwave, fugiat shabby chic la croix retro non est church-key gastropub.<br/><br/>Sartorial schlitz letterpress pariatur. Scenester veniam 3 wolf moon flexitarian fingerstache blue bottle cardigan snackwave.">
      </TextTeaser>
      <VideoPlayer provider="youtube" video-id="M7lc1UVf-VE" caption=""></VideoPlayer>
      <TextTeaser
        :has-button="false"
        box-title="<b>Join the community</b> and be a part of an awesome future"
        box-content="">
      </TextTeaser>
      <CTACollection :num-cols="3" :cta-collection="ctaCollection"></CTACollection>
    </div>
    <FullTeaser teaser-type="newsletter"
      teaser-title="Don’t miss anything <b>subscribe</b> to our <b>newsletter</b>"
      teaser-label="Newsletter subscription" teaser-target="newsletter"></FullTeaser>
  </div>
</template>

<script>
import TextTeaser from '@/components/blocks/TextTeaser.vue';
import VideoPlayer from '@/components/blocks/VideoPlayer.vue';
import CTACollection from '@/components/collections/CTACollection.vue';
import FullTeaser from '@/components/atoms/FullTeaser.vue';

export default {
  name: 'Community',
  components: {
    TextTeaser,
    FullTeaser,
    VideoPlayer,
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
      ctaCollection: [
        {
          type: '',
          icon: 'rocket',
          title: 'Discord',
          content: '> 2000',
        },
        {
          type: '',
          icon: 'developMagic',
          title: 'Twitter',
          content: '> 2000 fans',
        },
        {
          type: '',
          icon: 'compcog',
          title: 'Telegram',
          content: '> 2000 Fans',
        },
        {
          type: '',
          icon: 'magicWand',
          title: 'LinkedIn',
          content: '> 2000 Fans',
        },
        {
          type: '',
          icon: 'upChart',
          title: 'Github',
          content: '> 2000 Fans',
        },
        {
          type: '',
          icon: 'coins',
          title: 'Youtube',
          content: '> 2000 Fans',
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
  created() {
    const scripts = [
      'https://www.youtube.com/iframe_api',
      'https://player.vimeo.com/api/player.js',
    ];

    scripts.forEach((script) => {
      const tag = document.createElement('script');
      tag.setAttribute('src', script);
      if (script.includes('youtube')) {
        tag.setAttribute('id', 'youtube-api');
      } else {
        tag.setAttribute('id', 'vimeo-api');
      }
      document.head.appendChild(tag);
    });
  },
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
  beforeDestroy() {
    document.head.removeChild('script#youtube-api');
    document.head.removeChild('script#vimeo-api');
  },
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

div.container {
  flex-direction: column;
  padding-top: 270px;

  @include breakpoint('sm') {
    padding-top: 80px;
  }
}
</style>
