<template>
  <main :class="[pageName]">
    <section v-for="(block, blockIndex) in dummyData" :key="blockIndex" :class="[block.blocktype]">
      <Hero
        v-if="block.blocktype === 'hero'"
        :block="block"
        :type="(block.variation) ? block.variation : ''"
        :block-title="block.title"
        :block-content="block.content"
        :cta="block.cta"
        :buttons="block.buttons"
      />
      <Stack
        v-if="block.blocktype === 'stack'"
        :block="block"
        :button="block.button"
        :file="block.file"
      />
      <TextTeaser
        v-if="block.blocktype === 'section'"
        :box-title="block.title"
        :box-content="block.content"
        :button="block.button"
        :file="block.file"
        :bg-color="block.bgcolor"
        :title-color="block.titlecolor"
        :text-color="block.txtcolor"
        :media="block.media"
        :variation="block.variation"
      />
      <div class="container embed" v-if="block.blocktype === 'embed'" v-html="block.html" />
      <div class="container" v-if="block.blocktype === 'linklist'">
        <LinkList
          :block-data="block"
        ></LinkList>
      </div>
      <div class="container" v-if="block.blocktype === 'filelist'">
        <FileList
          :block-data="block"
        ></FileList>
      </div>
      <div class="fill"
           v-if="block.blocktype === 'video'"
           :style="`background-color: ${block.bgcolor || 'transparent'}`"
      >
        <div class="container">
          <VideoPlayer
            class=""
            :thumb="block.media.thumbnail"
            :provider="block.media.service"
            :video-id="block.media.id"
            :caption="block.media.caption"
          />
        </div>
      </div>
      <QuoteSliders
        v-if="block.blocktype === 'quotes'"
        :quotes="block.items"
      />
      <SingleQuote
        class="container"
        v-if="block.blocktype === 'highlight'"
        :quote="block.content"
      >
      </SingleQuote>
      <LatestNews
        v-if="block.blocktype === 'latestnews'"
        :collection-title="block.title"
      />
      <StartNow
        v-if="block.blocktype === 'startnow'"
        :block-title="block.title"
        :button-data="block.buttons"
      />
      <div class="container col" v-if="block.blocktype === 'accordion'">
        <TextTeaser v-if="block.title"
                    class="container mb-md"
                    :box-title="block.title"
                    :box-content="(block.content) ? block.content : ''"
        />
        <accordion specialclass="full">
          <accordionItem v-for="(accordionItem, accItemKey) in block.items"
                         :key="`accordion-item-${accItemKey}`">
            <!-- This slot will handle the title/header of the accordion and is the part you click on -->
            <template slot="accordion-trigger">
              <h3 v-html="accordionItem.title"></h3>
            </template>
            <!-- This slot will handle all the content that is passed to the accordion -->
            <template slot="accordion-content">
              <p v-html="accordionItem.content"></p>
            </template>
          </accordionItem>
        </accordion>
      </div>
      <div
        v-if="block.blocktype === 'ctas'"
        class="fill bg-black"
      >
        <TextTeaser v-if="block.title" class="container white no-bottom fullwidth" :box-title="block.title" />
        <CTACollection :num-cols="block.columns" :cta-collection="block.items" />
      </div>
      <Carousel
        v-if="block.blocktype === 'carousel'"
        :block-title="block.title"
        :glide-data="block.items"
      />
      <VideoCollection
        v-if="block.blocktype === 'videogallery'"
        :block-title="block.title"
        :video-items="block.media"
      />
      <CountUpCollection
        v-if="block.blocktype === 'counters'"
        :counter-data="block.items"
      />
      <ClassicTeaser
        v-if="block.blocktype === 'imgteaser' && block.variation === 'medium'"
        :block-data="block">
      </ClassicTeaser>
      <FullTeaser
        v-if="block.blocktype === 'imgteaser' && block.variation == 'full'"
        teaser-type="newsletter"
        :teaser-block="block"
        :teaser-title="block.title"
        :teaser-content="block.content"
        :teaser-label="block.button.text"
        :teaser-target="block.button.url"
      />
      <NewsCollection
        v-if="block.blocktype === 'collectionteasers' && block.collection.collection === 'news'"
        :collection-type="block.collection.collection"
        :collection-title="block.title"
        :from-news-page="false"
        :collection-amount="block.collection.limit">
      </NewsCollection>
      <CaseCollection
        v-if="block.blocktype === 'collectionteasers' && block.collection.collection === 'casestudies'"
        :collection-type="block.collection.collection"
        :collection-amount="block.collection.limit">
      </CaseCollection>
      <CareerCollection
        v-if="block.blocktype === 'collectionteasers' && block.collection.collection === 'jobs'"
        :collection-type="block.collection.collection"
        :collection-amount="block.collection.limit">
      </CareerCollection>
      <TeamCollection
        v-if="block.blocktype === 'collectionteasers' && block.collection.collection === 'team_members'"
        :collection-type="block.collection.collection"
        collection-amount="-1">
      </TeamCollection>
      <HubspotForm
        class="factorized"
        v-if="block.blocktype === 'hubspot-form'"
        :form-id="block.id"
      />
    </section>
  </main>
</template>
<script>
import { getDummyPage } from '@/api/endpoints/directusEndpoints';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'PageFactory',
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
      imgTeaserInc: 0,
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
      return this.$d.data.page_blocks;
    },
    dummyData() {
      return this.pageData || getDummyPage();
    },
    pageName() {
      return this.$route.name;
    },
  },
  metaInfo() {
    const metaPageData = this.$d.data;
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
  },
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
    this.checkTint();
    if (this.dummyData[this.dummyData.length - 1].blocktype === 'startnow' || (this.dummyData[this.dummyData.length - 1].blocktype === 'imgteaser' && this.dummyData[this.dummyData.length - 1].variation === 'full')) {
      document.querySelector('main')
        .classList
        .add('no-pb');
    } else {
      document.querySelector('main')
        .classList
        .remove('no-pb');
    }

    const root = document.querySelector(':root');
    root.style.setProperty('--headerHeight', `${document.querySelector('header').clientHeight}px`);

    if (document.querySelector('section.video') || document.querySelector('.video-container')) {
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
  // beforeUpdate() {},
  updated() {
    this.checkTint();
    if (this.dummyData[this.dummyData.length - 1].blocktype === 'startnow' || (this.dummyData[this.dummyData.length - 1].blocktype === 'imgteaser' && this.dummyData[this.dummyData.length - 1].variation === 'full')) {
      document.querySelector('main')
        .classList
        .add('no-pb');
    } else {
      document.querySelector('main')
        .classList
        .remove('no-pb');
    }

    if (document.querySelector('section.video') || document.querySelector('.video-container')) {
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

    const root = document.querySelector(':root');
    root.style.setProperty('--headerHeight', `${document.querySelector('header').clientHeight}px`);
  },
  beforeDestroy() {
    /* document.head.removeChild('script#youtube-api');
    document.head.removeChild('script#vimeo-api'); */
  },
  // destroyed() {},
  //---------------------------------------------------
  //
  //  Methods
  //
  //---------------------------------------------------
  methods: {
    checkTint() {
      const data = (this.dummyData || [])[0] || null;
      const hasColor = data?.bgcolor !== null && data?.bgcolor !== undefined;
      if (data && data.blocktype === 'hero' && hasColor) {
        this.$store.commit('heroHasBgColor', true);
        this.$store.commit('changeNavigationTintState', 'light');
      } else {
        this.$store.commit('heroHasBgColor', false);
        this.$store.commit('changeNavigationTintState', 'dark');
      }
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss">
@import '~scss/mixins';
@import '~scss/variables';

main.lp-career, main.lp-documentation {
  padding-bottom: 0;
}
main.lp-casper {
  padding-bottom: 0;

  .imgteaser {
    & > .outer-wrap {
      margin: 80px auto 0;
    }

    &:last-of-type {
      & > .outer-wrap {
        padding-bottom: 240px;

        @include breakpoint('sm') {
          padding-bottom: 109px;
        }
      }
    }

    & + .imgteaser {
      & > .outer-wrap {
        margin: 0 auto 0;
      }
    }
  }
}

section.ctas {
  .fill {
    &.bg-black {
      background-color: var(--color-black);
      padding: 0 0 100px 0;
    }
  }
}
</style>
