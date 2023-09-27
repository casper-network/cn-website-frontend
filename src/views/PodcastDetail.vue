<template>
  <main v-if="details">
    <div class="container" v-if="hasLeadSection">
      <ArticleLead
        :title="leadSection.title"
        :content="leadSection.content">
      </ArticleLead>
    </div>
    <ArticleHeroImage
      :img-src="leadImage.media"
      :img-alt="leadImage.media.caption">
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
  </main>
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'PodcastDetail',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    episode: {
      type: String,
      default: null,
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      details: null,
    };
  },
  metaInfo() {
    const title = this.metaTitle;
    const description = this.metaDescription;
    const image = this.metaImage;
    if (title && image) {
      return {
        title,
        meta: [
          { name: 'description', content: description },
          { itemprop: 'title', content: title },
          { itemprop: 'description', content: description },
          { itemprop: 'name', content: title },
          { itemprop: 'image', content: image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { property: 'og:title', content: title },
          { property: 'og:site_name', content: window.location.hostname },
          { property: 'og:description', content: description },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: window.location.href },
          { property: 'og:image', content: image },
        ],
      };
    }
    return null;
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    pageblocks() {
      const content = this.details?.content[0] || null;
      return content?.page_blocks || [];
    },
    computedPageBlocks() {
      const blocks = this.pageblocks;
      let offset = 0;
      if (this.hasLeadSection) {
        offset += 1;
      }
      if (this.hasLeadImage) {
        offset += 1;
      }
      return blocks.slice(offset, blocks.length);
    },
    hasLeadSection() {
      const block = this.pageblocks[0] || {};
      return block.blocktype === 'section';
    },
    hasLeadImage() {
      const block = this.pageblocks[1] || {};
      return block.blocktype === 'image';
    },
    leadSection() {
      return this.pageblocks[0] || {};
    },
    leadImage() {
      return this.pageblocks[1] || {};
    },
    metaTitle() {
      const content = this.details?.content[0] || {};
      const lead = this.leadSection;
      let title = content.title || `Podcast Episode #${this.episode}`;
      title = lead.title || title;
      return title;
    },
    metaDescription() {
      const div = document.createElement('div');
      const content = this.details?.content[0] || {};
      const lead = this.leadSection;
      let description = content.description || '';
      div.innerHTML = lead.content || description;
      description = div.textContent;
      return description;
    },
    metaImage() {
      let image = this.leadImage?.media || null;
      image = this.details?.image || image;
      if (image) {
        return `${API_URL}/assets/${image}`;
      }
      return null;
    },
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
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
  async mounted() {
    const locale = Intl.getCanonicalLocales(this.$i18n.locale);
    const { data } = await this.$d.api.get(`/podcasts?fields[]=image&fields[]=content.title,content.description,content.page_blocks&filter[status][_eq]=published&filter[content][languages_code][_eq]=${locale}&filter[content][episode][_eq]=${this.episode}&limit=1`);
    this.details = (Array.isArray(data) && data[0] !== null) ? data[0] : null;
    /*
    if (!this.$d.data) {
      const url = `/${this.$i18n.locale}/case-studies/`;
      window.canonical = window.location.origin + url;
      this.$router.replace(url);
    } else {
      this.getRelatedCasestudies();
      const root = document.querySelector(':root');
      root.style.setProperty('--headerHeight', `${document.querySelector('header').clientHeight}px`);
    }
    */
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
