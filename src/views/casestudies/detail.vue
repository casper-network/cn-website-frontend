<template>
  <main>
    <div class="container">
      <ArticleLead
        :title="pageData.page_blocks[0].title"
        :content="pageData.page_blocks[0].content">
      </ArticleLead>
    </div>
    <ArticleHeroImage
      :img-src="pageData.page_blocks[1].media"
      :img-alt="pageData.page_blocks[1].media.caption">
    </ArticleHeroImage>
    <ArticleDeepLinkBar></ArticleDeepLinkBar>
    <section v-for="(block, blockIndex) in computedPageBlocks" :key="blockIndex">
      <ArticleTextBlock
        v-if="block.blocktype === 'section'"
        :title="block.title"
        :content="block.content">
      </ArticleTextBlock>
      <div class="container -long" v-if="block.blocktype === 'highlight'">
        <div class="container">
          <SingleQuote
            :quote="block.content"/>
        </div>
      </div>
      <div class="container block" v-if="block.blocktype === 'carousel'">
        <Glider :glide-data="glideData"></Glider>
      </div>
    </section>
    <RelatedItems type="casestudies" :related-items="relatedCasesstudies"></RelatedItems>
  </main>
</template>

<script>

export default {
  name: 'detail.vue',
  components: {},
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
      relatedCasesstudies: [],
    };
  },
  metaInfo() {
    const metaPageData = this.$d.data;
    console.log(metaPageData);
    return {
      title: `${metaPageData.title}`,
      meta: [
        { name: 'description', content: metaPageData.description },
        { property: 'og:title', content: `${metaPageData.title}` },
        { itemprop: 'name', content: `${metaPageData.title}` },
        { itemprop: 'description', content: `${metaPageData.description}` },
        { itemprop: 'image', content: `${process.env.VUE_APP_API_URL}/assets/${metaPageData.image}` },
        { name: 'twitter:card', content: `${process.env.VUE_APP_API_URL}/assets/${metaPageData.image}` },
        { property: 'og:site_name', content: window.location.hostname },
        { property: 'og:description', content: metaPageData.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: `${process.env.VUE_APP_API_URL}/assets/${metaPageData.image}` },
      ],
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    pageData() {
      return this.$d.data;
    },
    dummyData() {
      return this.pageData || null;
    },
    computedPageBlocks() {
      console.log(this.pageData.page_blocks.slice(2));
      return this.pageData.page_blocks.slice(2);
    },
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
    pageData() {
      this.pageData = this.$d.data;
    },
  },
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
    this.getRelatedCasestudies();

    const root = document.querySelector(':root');
    root.style.setProperty('--headerHeight', `${document.querySelector('header').clientHeight}px`);
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
    async getRelatedCasestudies() {
      const relatedAPIURL = `/casestudies?filter[content][languages_code][_eq]=${Intl.getCanonicalLocales(this.$i18n.locale)}&fields=*.*&limit=2`;
      const res = await this.$d.api.get(relatedAPIURL);
      this.relatedCasesstudies = res.data;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

div.container {
  padding-top: 270px;

  @include breakpoint(sm) {
    padding-top: 120px;
  }

  &.block {
    padding-top: 0;
    margin-top: 80px;
    margin-bottom: 80px;
    display: block;

    @include breakpoint('sm') {
      margin-top: 32px;
      margin-bottom: 80px;
    }
  }

  &.-long {
    padding: 0;

    > div.container {
      padding: 0;
      margin-top: 80px;

      @include breakpoint('sm') {
        margin-top: 32px;
      }
    }
  }

  &.redactor-content {
    flex-direction: column;
  }
}
</style>
