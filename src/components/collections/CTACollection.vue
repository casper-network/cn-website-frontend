<template>
  <div>
    <div class="container">
      <div class="grid" :class="`cols-${numCols}`">
        <Teaser
          :url="cta.url"
          :target="cta.type"
          :type="(cta.alignment === 'row') ? 'cta' : 'usp' "
          :icon="cta.icon"
          v-for="(cta, i) in ctaCollection" :key="`cta-${i}`">
          <template v-slot:title>{{cta.title}}</template>
          <template v-slot:content>{{ cta.content }}</template>
        </Teaser>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CTACollection',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    numCols: {
      type: Number,
      default: 3,
    },
    ctaCollection: {
      type: Array,
      default: () => [
        {
          type: 'usp',
          icon: 'rocket',
          title: 'Getting Started',
          content: 'Get started building your decentralized app or marketplace.',
        },
        {
          type: 'usp',
          icon: 'developMagic',
          title: 'Develop',
          content: 'Get started building your decentralized app or marketplace.',
        },
        {
          type: 'usp',
          icon: 'compcog',
          title: 'Operator',
          content: 'Get started building your decentralized app or marketplace.',
        },
        {
          type: 'usp',
          icon: 'magicWand',
          title: 'Design',
          content: 'Get started building your decentralized app or marketplace.',
        },
        {
          type: 'usp',
          icon: 'upChart',
          title: 'Economics',
          content: 'Get started building your decentralized app or marketplace.',
        },
        {
          type: 'usp',
          icon: 'coins',
          title: 'Staking',
          content: 'Get started building your decentralized app or marketplace.',
        },
        {
          type: 'usp',
          icon: 'glossary',
          title: 'Glossary',
          content: 'Get started building your decentralized app or marketplace.',
        },
        {
          type: 'usp',
          icon: 'faq',
          title: 'FAQ',
          content: 'Get started building your decentralized app or marketplace.',
        },
      ],
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

div.container.-long {

  @include breakpoint('sm') {
    padding-bottom: 80px;
  }
}

div.grid {
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(2, minmax(49%, 1fr));
  grid-gap: 32px;
  width: 100%;

  &.cols-3 {
    grid-template-columns: repeat(3, minmax(30%, 1fr));

    @include breakpoint('sm') {
      grid-template-columns: repeat(1, minmax(100%, 1fr));
      margin-top: 0px;
      grid-gap: 16px;
    }
  }

  @include breakpoint('sm') {
    grid-template-columns: repeat(1, minmax(100%, 1fr));
    margin-top: 80px;
    grid-gap: 16px;
  }
}
</style>
