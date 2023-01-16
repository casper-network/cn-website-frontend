<template>
  <div class="icon" :class="{ black }">
    <SVGWorld class="icon" v-if="icon === 'world'"/>
    <SVGGit class="icon" v-if="icon === 'github'"/>
    <SVGCircleDiscord class="icon" v-if="icon === 'discord'"/>
    <SVGCommunity class="icon" v-if="icon === 'community'"/>
    <SVGCircleTwitter class="icon" v-if="icon === 'twitter'"/>
    <SVGCircleTelegram class="icon" v-if="icon === 'telegram'"/>
    <SVGCircleLinkedin class="icon" v-if="icon === 'linkedin'"/>
    <SVGCircleYoutube class="icon" v-if="icon === 'youtube'"/>
    <SVGCode class="icon" v-if="icon === 'code'"/>
    <SVGRocket class="icon" v-if="icon === 'doc' || icon === 'rocket'"/>
    <SVGCog class="icon" v-if="icon === 'computercog'"/>
    <SVGDev class="icon" v-if="icon === 'developMagic'"/>
    <SVGMagicWand class="icon" v-if="icon === 'magicwand'"/>
    <SVGUpChart class="icon" v-if="icon === 'upchart'"/>
    <SVGCoinstack class="icon" v-if="icon === 'coinstack'"/>
    <SVGGlossary class="icon" v-if="icon === 'glossary'"/>
    <SVGFaq class="icon" v-if="icon === 'faq'"/>
    <SVGSmile class="icon" v-if="icon === 'smile'"/>
  </div>
</template>

<script>
import SVGWorld from '@/assets/svg/worldGrad.svg?inline';
import SVGGit from '@/assets/svg/icon-social-github.svg?inline';
import SVGCode from '@/assets/svg/icon-code.svg?inline';
import SVGRocket from '@/assets/svg/icon-rocket.svg?inline';
import SVGCog from '@/assets/svg/icon-computercog.svg?inline';
import SVGDev from '@/assets/svg/developMagic.svg?inline';
import SVGMagicWand from '@/assets/svg/icon-magicwand.svg?inline';
import SVGUpChart from '@/assets/svg/icon-upchart.svg?inline';
import SVGCoinstack from '@/assets/svg/icon-coinstack.svg?inline';
import SVGGlossary from '@/assets/svg/icon-glossary.svg?inline';
import SVGFaq from '@/assets/svg/icon-faq.svg?inline';
import SVGCircleDiscord from '@/assets/svg/icon-social-discord.svg?inline';
import SVGCircleTwitter from '@/assets/svg/icon-social-twitter.svg?inline';
import SVGCircleTelegram from '@/assets/svg/icon-social-telegram.svg?inline';
import SVGCircleLinkedin from '@/assets/svg/icon-social-linkedin.svg?inline';
import SVGCircleYoutube from '@/assets/svg/icon-social-youtube.svg?inline';
import SVGSmile from '@/assets/svg/icon-smile.svg?inline';
import SVGCommunity from '@/assets/svg/icon-community.svg?inline';

export default {
  name: 'Icon',
  components: {
    SVGWorld,
    SVGCog,
    SVGDev,
    SVGSmile,
    SVGGit,
    SVGCode,
    SVGRocket,
    SVGMagicWand,
    SVGUpChart,
    SVGCoinstack,
    SVGGlossary,
    SVGFaq,
    SVGCommunity,
    SVGCircleDiscord,
    SVGCircleTwitter,
    SVGCircleTelegram,
    SVGCircleLinkedin,
    SVGCircleYoutube,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    icon: {
      type: String,
      default: 'world',
    },
    black: {
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
@import '~scss/mixins';

.icon {
  width: 64px;
  height: 64px;
  margin-right: 32px;

  &.black {
    & > svg path {
      fill: var(--color-black);
      stroke: var(--color-black);
    }
  }
}

</style>
