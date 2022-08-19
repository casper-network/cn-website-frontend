<template>
  <div class="icon">
    <SVGWorld class="icon" v-if="icon === 'world'"/>
    <SVGDoc class="icon" v-if="icon === 'doc'"/>
    <SVGGit class="icon" v-if="icon === 'github'"/>
    <SVGCircleDiscord class="icon" v-if="icon === 'discord'"/>
    <SVGCommunity class="icon" v-if="icon === 'community'"/>
    <SVGCircleTwitter class="icon" v-if="icon === 'twitter'"/>
    <SVGCircleTelegram class="icon" v-if="icon === 'telegram'"/>
    <SVGCircleLinkedin class="icon" v-if="icon === 'linkedin'"/>
    <SVGCircleYoutube class="icon" v-if="icon === 'youtube'"/>
    <SVGCode class="icon" v-if="icon === 'code'"/>
    <SVGRocket class="icon" v-if="icon === 'rocket'"/>
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
import SVGDoc from '@/assets/svg/documentaryGrad.svg?inline';
import SVGGit from '@/assets/svg/github.svg?inline';
import SVGCode from '@/assets/svg/code.svg?inline';
import SVGRocket from '@/assets/svg/rocket.svg?inline';
import SVGCog from '@/assets/svg/computerCog.svg?inline';
import SVGDev from '@/assets/svg/developMagic.svg?inline';
import SVGMagicWand from '@/assets/svg/magicWand.svg?inline';
import SVGUpChart from '@/assets/svg/upChart.svg?inline';
import SVGCoinstack from '@/assets/svg/coinStack.svg?inline';
import SVGGlossary from '@/assets/svg/glossary.svg?inline';
import SVGFaq from '@/assets/svg/faq.svg?inline';
import SVGCircleDiscord from '@/assets/svg/circleDiscord.svg?inline';
import SVGCircleTwitter from '@/assets/svg/circleTwitter.svg?inline';
import SVGCircleTelegram from '@/assets/svg/circleTelegram.svg?inline';
import SVGCircleLinkedin from '@/assets/svg/circleLinkedin.svg?inline';
import SVGCircleYoutube from '@/assets/svg/circleYoutube.svg?inline';
import SVGSmile from '@/assets/svg/smile.svg?inline';
import SVGCommunity from '@/assets/svg/community.svg?inline';

export default {
  name: 'Icon',
  components: {
    SVGWorld,
    SVGCog,
    SVGDev,
    SVGSmile,
    SVGDoc,
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
}

</style>
