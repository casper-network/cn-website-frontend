<template>
  <article class="news-detail" v-if="pageData">
    <div class="container">
      <ArticleLead
        :title="pageData.page_blocks[0].title"
        :content="pageData.page_blocks[0].content">
      </ArticleLead>
    </div>
    <ArticleHeroImage :img-src="pageData.image"></ArticleHeroImage>
    <ArticleDeepLinkBar ref="deeplinkBar" />
    <main class="news-detail-container">
      <section v-for="(block, blockIndex) in computedPageBlocks" :key="blockIndex">
        <ArticleTextBlock
          v-if="block.blocktype === 'section'"
          :title="block.title"
          :content="block.content"
          :button-target="block.button.url"
          :button-type="block.button.type"
          :button-label="block.button.text"
        />
        <div class="container -long" v-if="block.blocktype === 'highlight'">
          <div class="container">
            <SingleQuote
              :quote="block.content"/>
          </div>
        </div>
        <div class="container block" v-if="block.blocktype === 'imagegallery'">
          <div class="half-carousel">
            <Glider :glide-data="block.media"></Glider>
          </div>
        </div>
        <div class="container block" v-if="block.blocktype === 'video'">
          <div class="half-carousel">
            <VideoPlayer
              :thumb="block.media.thumbnail"
              :provider="block.media.service"
              :video-id="block.media.id"
              :caption="block.media.caption"
              in-article
            />
          </div>
        </div>
        <ArticleImage
          v-if="block.blocktype === 'image'"
          :img-src="block.media"
          :img-alt="block.caption"
          :isReduced="(block.variation === 'reduced')">
        </ArticleImage>
      </section>
    </main>
    <RelatedItems type="news" :relatedItems="relatedNews"></RelatedItems>
  </article>
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'detail.vue',
  components: {
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
      relatedNews: [],
      scripts: [
        'https://www.youtube.com/iframe_api',
        'https://player.vimeo.com/api/player.js',
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
      return this.$d.data?.data || null;
    },
    pageCategories() {
      return (this.$d.data?.categories || []).map((i) => i.categories_news_key);
    },
    dummyData() {
      return this.pageData || null;
    },
    computedPageBlocks() {
      if (this.pageData) {
        return this.pageData.page_blocks.slice(1);
      }
      return null;
    },
  },
  metaInfo() {
    const metaPageData = this.$d.data?.data;
    if (metaPageData) {
      const out = {
        title: `${metaPageData.title}`,
        meta: [],
        link: null,
      };
      // eslint-disable-next-line prefer-destructuring
      const canonical = window.canonical;
      if (canonical) {
        out.link = [{ rel: 'canonical', href: `${canonical}` }];
        window.canonical = null;
      } else {
        const { href } = window.location;
        if (href.slice(-1) !== '/') {
          out.link = [{ rel: 'canonical', href: `${href}/` }];
        }
      }

      out.meta = [
        { name: 'description', content: metaPageData.description },
        { itemprop: 'title', content: `${metaPageData.title}` },
        { itemprop: 'description', content: `${metaPageData.description}` },
        { itemprop: 'name', content: `${metaPageData.title}` },
        { itemprop: 'image', content: `${API_URL}/assets/${metaPageData.image}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:title', content: `${metaPageData.title}` },
        { property: 'og:site_name', content: window.location.hostname },
        { property: 'og:description', content: metaPageData.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: `${API_URL}/assets/${metaPageData.image}` },
      ];
      return out;
    }
    return null;
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
    $route() {
      this.$refs.deeplinkBar.refresh();
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
    if (!this.$d.data) {
      const type = this.$route.meta.details;
      const { locale } = this.$i18n;
      if (type === 'news') {
        const url = `/${locale}/news/`;
        window.canonical = window.location.origin + url;
        this.$router.replace(url);
      } else {
        const url = `/${locale}/`;
        window.canonical = window.location.origin + url;
        this.$router.replace(url);
      }
    } else {
      const root = document.querySelector(':root');
      root.style.setProperty('--headerHeight', `${document.querySelector('header').clientHeight}px`);
      this.getRelatedNews();
    }
  },
  // beforeUpdate() {},
  updated() {
    if (document.querySelector('.video-container')) {
      this.scripts.forEach((script) => {
        const tag = document.createElement('script');
        tag.setAttribute('src', script);
        if (script.includes('youtube')) {
          tag.setAttribute('id', 'youtube-api');
        } else {
          tag.setAttribute('id', 'vimeo-api');
        }
        document.head.appendChild(tag);
      });
    }
  },
  // beforeDestroy() {},
  // destroyed() {},
  //---------------------------------------------------
  //
  //  Methods
  //
  //---------------------------------------------------
  methods: {
    async getRelatedNews() {
      const availableCategories = this.pageCategories;
      const relatedAPIURL = '/news?filter[content][languages_code][_eq]=VAR_LOCALE&fields=*.*&limit=-1';
      const requestAPIEndpoint = relatedAPIURL.replace('VAR_LOCALE', Intl.getCanonicalLocales(this.$i18n.locale));
      const res = await this.$d.api.get(requestAPIEndpoint);
      const currentId = this.$d.data.data.id;
      this.relatedNews = res.data
        .filter((o) => {
          const articleCategories = (o.categories || []).map((i) => i.categories_news_key);
          const intersection = availableCategories.filter((e) => articleCategories.includes(e));
          return o.id !== currentId && intersection.length > 0;
        })
        .sort((a, b) => (new Date(b.publish_date) - new Date(a.publish_date)))
        .slice(1, 3);
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>
<style lang="scss">
@import '~scss/mixins';

main.news-detail-container {
  p {
    margin: 1rem 0;
  }

  p.title {
    @include style-body('large');
    font-weight: 500;
  }

  h2,
  h3,
  h4 {
    margin-top: var(--margin-80);
    margin-bottom: var(--margin-32);
    line-height: 1.2;
  }

  ul {
    /*list-style-type: none;*/
    padding-left: 11px;
    margin: 0;

    li {
      position: relative;
      // display: flex;
      margin: 32px 0 32px 8px;

      /*&:before {
        content: '';
        background-size: contain;
        background-repeat: no-repeat;
        min-width: 24px;
        height: 24px;
        display: block;
        transform: translate(-50%, 8px);
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.5 12.7266C1.5 6.92757 6.20101 2.22656 12 2.22656C17.799 2.22656 22.5 6.92757 22.5 12.7266C22.5 18.5256 17.799 23.2266 12 23.2266C6.20101 23.2266 1.5 18.5256 1.5 12.7266ZM12 0.726562C5.37258 0.726562 0 6.09915 0 12.7266C0 19.354 5.37258 24.7266 12 24.7266C18.6274 24.7266 24 19.354 24 12.7266C24 6.09915 18.6274 0.726562 12 0.726562ZM18.5885 8.02051C18.8453 7.69555 18.7901 7.2239 18.4651 6.96705C18.1402 6.7102 17.6685 6.76542 17.4117 7.09039L9.56866 17.0134L9.55985 17.0248C9.53104 17.0627 9.4936 17.0932 9.45064 17.1137C9.40767 17.1342 9.36042 17.1442 9.31283 17.1428C9.26523 17.1413 9.21867 17.1286 9.17701 17.1055C9.13534 17.0825 9.09978 17.0498 9.0733 17.0102L9.06315 16.9955L6.61315 13.5184C6.37456 13.1799 5.90666 13.0988 5.56806 13.3374C5.22946 13.5759 5.14839 14.0439 5.38697 14.3825L7.83251 17.8531C7.99128 18.0874 8.2031 18.281 8.45081 18.418C8.70149 18.5567 8.98167 18.6335 9.26803 18.6421C9.5544 18.6506 9.83866 18.5907 10.0972 18.4672C10.3532 18.3449 10.5767 18.1637 10.7493 17.9386L18.5885 8.02051Z' fill='%230024CF'/%3E%3C/svg%3E%0A");
      }*/
      @include style-body('large');
    }
  }
}
</style>
<style lang="scss" scoped>
@import '~scss/mixins';

div.container {
  padding-top: 270px;

  @include breakpoint('sm') {
    padding-top: 100px;
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

  div.half-carousel {
    width: calc(60% - 43px);
    margin-left: auto;

    ::v-deep ul > li > div:last-of-type {
      font-size: 20px;
      line-height: 24px;
    }

    @include breakpoint('sm') {
      margin-left: auto;
      width: 100%;
    }
  }
}
</style>
