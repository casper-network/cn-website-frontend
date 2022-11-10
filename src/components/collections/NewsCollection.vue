<template>
  <div class="container" :class="{'fromNewsPage': fromNewsPage}">
    <div class="collection-head" v-if="$route.name === 'lp-index'">
      <h2 v-html="collectionTitle"></h2>
      <Button class="secondary">
        <router-link :to="`/${$i18n.locale}/news`">{{$t('ctas.allNews')}}</router-link>
      </Button>
    </div>
    <div class="posts">
      <PostItem v-for="(item, i) in news"
                :category-data="categories"
                :key="`mews-item${i}`"
                type="news"
                :post-item-data="item"></PostItem>
    </div>
    <Button v-if="fromNewsPage && showLoadMore" class="secondary" @click.native="incrementPageCount()" style="align-self: center;">
      <a>{{ $t('ctas.loadMore') }}</a>
    </Button>
  </div>
</template>

<script>
import axios from 'axios';
import i18n from '@/i18n';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'ItemNews',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    collectionType: String,
    collectionAmount: Number,
    collectionTitle: String,
    fromNewsPage: Boolean,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      numEntries: 0,
      news: null,
      categories: null,
      currentPage: (this.$route.params.pagination) ? Number(this.$route.params.pagination) : 1,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    showLoadMore() {
      const news = this.news || [];
      return news.length < this.numEntries;
    },
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
  async mounted() {
    await this.getCount();
    await this.getNews();
    await this.getAllCategories();
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
    async getCount() {
      const response = await axios.get(`${API_URL}/items/news?aggregate[count]=*&groupBy[]=status`);
      const count = (((response || {}).data || []).data[0] || {}).count || (((response || {}).data || []).data[1] || {}).count;
      this.numEntries = count || 0;
    },
    async getNews() {
      try {
        const [locale] = Intl.getCanonicalLocales(i18n.locale);
        const totalItems = (this.collectionAmount) ? this.collectionAmount : this.currentPage * 10;
        const response = await axios.get(`${API_URL}/items/news?fields=*.*&limit=${totalItems}&sort=-publish_date&filter[content][languages_code][_eq]=${locale}&filter[status][_eq]=published`);
        this.news = response.data.data;
      } catch (error) {
        this.news = false;
        console.log(error);
      }
      return this.news;
    },
    async getAllCategories() {
      const res = await axios.get(`${API_URL}/cce/categories?locale=en-US&collection=news`);
      this.categories = res.data;
    },
    async incrementPageCount() {
      this.currentPage += 1;

      this.$router.push({
        name: 'lp-news-paginated',
        params: {
          pagination: this.currentPage,
        },
      });

      const [locale] = Intl.getCanonicalLocales(i18n.locale);
      const response = await axios.get(`${API_URL}/items/news?fields=*.*&limit=10&page=${this.currentPage}&sort=-publish_date&filter[content][languages_code][_eq]=${locale}&filter[status][_eq]=published`);
      this.news = [...this.news, ...response.data.data];
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';

div.container {
  flex-direction: column;
  padding-top: 160px;

  &.fromNewsPage {
    padding-top: 0;

    & > .btn.secondary {
      margin-top: 40px;
    }

    @include breakpoint('sm') {
      padding: 45px 0 45px 0;
    }
  }

  @include breakpoint('sm') {
    padding-top: 45px;
    .posts > article:first-of-type {
      padding-top: 45px;
    }
  }

  .posts {
  }

  .collection-head {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    @include breakpoint('sm') {
      h2 { margin-bottom: 40px; }
    }
  }
}
</style>
