<template>
  <div class="page-ecosystem-index">
    <SearchBar type="ecosystem" @search="finallyDoSearch" @filterByTag="filterByTag"></SearchBar>
    <div class="container -long">
      <div class="title">
        <h1 style="font-weight: 700;margin-top: 32px; margin-bottom: 0;" v-html="(!searchString) ? (categories.find(x => x.key === $route.params.category)||{}).name || '' : `'${searchString}'`"></h1>
        <p style="font-weight: 700;margin-top: 16px;" v-if="isSearching || !isFiltering">
          <span>{{$t('titles.resultsFound')}}</span>
          <span>{{("0" + applicationData.length).slice(-2)}}</span>
        </p>
      </div>
    </div>
    <!--    <Glider :glide-data="glideData" v-if="!isFiltering"></Glider>-->
    <div class="container -long">
      <div class="block-content">
        <Card v-for="(card, i) in applicationData" :key="`card-${i}`"
              :card-data="card.content[0]"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'EcoSystemFiltered',
  components: {},
  computed: {},
  data() {
    return {
      data: '',
      meta: null,
      isFiltering: true,
      isSearching: false,
      applicationData: [],
      searchString: '',
      categories: [],
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
          { rel: 'canonical', href: `${window.location.origin}/${locale}/ecosystem/` },
        ],
        meta: [
          { name: 'description', content: meta.description },
          { itemprop: 'title', content: `${meta.title}` },
          { itemprop: 'description', content: `${meta.description}` },
          { itemprop: 'name', content: `${meta.title}` },
          { itemprop: 'image', content: `${API_URL}/assets/${meta.image}` },
          { name: 'twitter:card', content: 'summary_large_image' },
          { property: 'og:title', content: `${meta.title}` },
          { property: 'og:site_name', content: window.location.hostname },
          { property: 'og:description', content: meta.description },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: window.location.href },
          { property: 'og:image', content: `${API_URL}/assets/${meta.image}` },
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
    const res = await axios.get(`${API_URL}/items/lp_ecosystem?filter[content][languages_code][_eq]=${locale}&fields=*.title,*.description,*.image`);
    if (res.status === 200) {
      const { data } = res;
      this.meta = data?.data?.content[0] || null;
    }
  },
  mounted() {
    this.applicationData = this.$d.data;
    this.getAllCategories();
  },
  methods: {
    async getAllCategories() {
      const [locale] = Intl.getCanonicalLocales(this.$i18n.locale);
      let res = {};
      switch (this.type) {
        case 'News':
          res = await axios.get(`${API_URL}/cce/categories?locale=${locale}&collection=news`);
          break;
        case 'ecosystem':
        default:
          res = await axios.get(`${API_URL}/cce/categories?locale=${locale}&collection=applications`);
      }
      this.categories = res.data;
    },
    finallyDoSearch(val) {
      if (!val) {
        this.applicationData = this.$d.data;
        this.isSearching = false;
        this.isFiltering = true;
        this.searchString = '';
      } else {
        // eslint-disable-next-line prefer-destructuring
        this.applicationData = val[0];
        this.isSearching = !!(val[1]);
        // eslint-disable-next-line prefer-destructuring
        this.searchString = val[1];
      }
    },
    filterByTag() {
      this.applicationData = this.$d.data;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~scss/mixins';

.page-ecosystem-index {
  padding-top: 110px;
  padding-bottom: 110px;

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

.block-content {
  display: grid;
  gap: 32px;
  margin-top: 64px;
  grid-template-columns: repeat(3, minmax(32%, 3fr));

  @include breakpoint('sm') {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
