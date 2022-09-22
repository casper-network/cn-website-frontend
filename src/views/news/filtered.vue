<template>
  <div class="page-news-index filtered">
    <section>
      <SearchBar type="News" @search="finallyDoSearch"></SearchBar>
      <div class="container">
        <div class="title">
          <h1 style="margin-top: 32px; margin-bottom: 0;" v-html="(!searchString) ? `<strong>The latest</strong> from the Casper ${computedFilter}` : `<strong>'${searchString}'</strong>`"></h1>
          <p style="font-weight: 700;margin-top: 16px;" v-if="isSearching">
            <span>{{$t('titles.resultsFound')}}</span>
            <span>{{("0" + newsData.length).slice(-2)}}</span>
          </p>
        </div>
        <div class="posts" v-if="newsData">
          <PostItem v-for="(item, i) in newsData"
                    :category-data="categories"
                    :key="`mews-item${i}`"
                    type="news"
                    :post-item-data="item"></PostItem>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'NewsFiltered',
  components: {},
  computed: {
    computedFilter() {
      const { category } = this.$route.params;
      if (category) {
        return category.charAt(0).toUpperCase() + category.slice(1, this.$route.params.length);
      }
      return null;
    },
  },
  data() {
    return {
      meta: null,
      newsData: '',
      categories: [],
      searchString: '',
      isFiltering: false,
      isSearching: false,
    };
  },
  metaInfo() {
    // eslint-disable-next-line prefer-destructuring
    const meta = this.meta;
    const { locale } = this.$i18n;
    if (meta) {
      return {
        title: `${meta.title}`,
        link: [
          {
            rel: 'canonical',
            href: `${window.location.origin}/${locale}/news/`,
          },
        ],
        meta: [
          {
            name: 'description',
            content: meta.description,
          },
          {
            property: 'og:title',
            content: `${meta.title}`,
          },
          {
            itemprop: 'name',
            content: `${meta.title}`,
          },
          {
            itemprop: 'description',
            content: `${meta.description}`,
          },
          {
            itemprop: 'image',
            content: `${API_URL}/assets/${meta.image}`,
          },
          {
            name: 'twitter:card',
            content: `${API_URL}/assets/${meta.image}`,
          },
          {
            property: 'og:site_name',
            content: window.location.hostname,
          },
          {
            property: 'og:description',
            content: meta.description,
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
            content: `${API_URL}/assets/${meta.image}`,
          },
        ],
      };
    }
    return null;
  },
  watch: {
    $route() {
      this.filterByTag();
    },
  },
  async created() {
    const [locale] = Intl.getCanonicalLocales(this.$i18n.locale);
    const res = await axios.get(`${API_URL}/items/lp_news?filter[content][languages_code][_eq]=${locale}&fields=*.title,*.description,*.image`);
    if (res.status === 200) {
      const { data } = res;
      this.meta = data?.data?.content[0] || null;
    }
  },
  async mounted() {
    this.newsData = this.$d.data;
    this.getAllCategories();
    this.filterByTag();
  },
  methods: {
    finallyDoSearch(val) {
      if (!val) {
        this.newsData = this.$d.data;
        this.isSearching = false;
        this.isFiltering = true;
        this.searchString = '';
      } else {
        // eslint-disable-next-line prefer-destructuring
        this.newsData = val[0];
        this.isFiltering = false;
        this.isSearching = !!(val[1]);
        // eslint-disable-next-line prefer-destructuring
        this.searchString = val[1];
        this.newsData.sort((a, b) => Date.parse(b.publish_date) - Date.parse(a.publish_date));
        console.log('searching', val[0]);
      }
    },
    filterByTag() {
      this.newsData = this.$d.data;
      this.newsData.sort((a, b) => Date.parse(b.publish_date) - Date.parse(a.publish_date));
      this.isFiltering = true;
    },
    async getAllCategories() {
      const res = await axios.get(`${API_URL}/cce/categories?locale=en-US&collection=news`);
      this.categories = res.data;
    },
  },
};
</script>
<style lang="scss">
@import '~scss/mixins';

.page-news-index {
  padding-top: 110px;

  @include breakpoint('sm') {
    padding-top: 75px;
  }

  div.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  div.title,
  div.posts {
    width: 100%;
  }
}
</style>
