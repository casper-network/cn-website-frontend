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
      <TextTeaser
        class="container"
        v-if="block.blocktype === 'section'"
        :box-title="block.title"
        :box-content="block.content"
        :button-target="block.button.url"
        :button-type="block.button.type"
        :button-label="block.button.text"
      />
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
      <div class="container"
           v-if="block.blocktype === 'video'">
        <VideoPlayer
          class=""
          :thumb="block.media.thumbnail"
          :provider="block.media.service"
          :video-id="block.media.id"
          :caption="block.media.caption"
        />
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
      <div class="container col"
           v-if="block.blocktype === 'accordion'">
        <TextTeaser v-if="block.title"
                    class="container mb-md px-0"
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
      <div v-if="block.blocktype === 'ctas'">
        <TextTeaser v-if="block.title"
                    class="container"
                    :box-title="block.title"
        />
        <CTACollection
          :num-cols="block.columns"
          :cta-collection="block.items"
        />
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
    </section>
  </main>
</template>
<script>
import { getDummyPage } from '@/api/endpoints/directusEndpoints';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'PageFactory',
  components: { },
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
    return {
      title: `${metaPageData.title}`,
      meta: [
        {
          name: 'description',
          content: metaPageData.description,
        },
        {
          property: 'og:title',
          content: `${metaPageData.title}`,
        },
        {
          itemprop: 'name',
          content: `${metaPageData.title}`,
        },
        {
          itemprop: 'description',
          content: `${metaPageData.description}`,
        },
        {
          itemprop: 'image',
          content: `${API_URL}/assets/${metaPageData.image}`,
        },
        {
          name: 'twitter:card',
          content: `${API_URL}/assets/${metaPageData.image}`,
        },
        {
          property: 'og:site_name',
          content: window.location.hostname,
        },
        {
          property: 'og:description',
          content: metaPageData.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: window.location.href,
        },
        {
          property: 'og:image',
          content: `${API_URL}/assets/${metaPageData.image}`,
        },
      ],
    };
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
  created() {
  },
  // beforeMount() {},
  // render(h) { return h(); },
  mounted() {
    if (this.dummyData[0].blocktype === 'hero') {
      this.$store.commit('changeNavigationTintState', 'light');
    } else {
      this.$store.commit('changeNavigationTintState', 'dark');
    }

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
    // console.log(this.dummyData[0].blocktype === 'hero');
    if (this.dummyData[0].blocktype === 'hero') {
      this.$store.commit('changeNavigationTintState', 'light');
    } else {
      this.$store.commit('changeNavigationTintState', 'dark');
    }

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
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss">
@import '~scss/mixins';
@import '~scss/variables';

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
</style>
