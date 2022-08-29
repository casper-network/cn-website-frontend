<template>
  <div class="page-news-index">
    <section>
      <SearchBar type="News" @search="finallyDoSearch" @filterByTag="filterByTag"></SearchBar>
      <div class="container">
        <div class="title">
          <h1 v-html="(newsData[1] || {}).title"></h1>
        </div>
        <NewsCollection v-if="newsData && !isSearching"
          :collection-type="newsData[1].collection.collection"
          :collection-amount="newsData[1].collection.limit"
          :from-news-page="true"
        ></NewsCollection>

        <div class="posts" v-if="isSearching && searchData">
          <PostItem v-for="(item, i) in searchData[0]"
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
  name: 'News',
  components: {},
  computed: {},
  data() {
    return {
      newsData: '',
      searchData: '',
      isSearching: false,
      categories: Array,
    };
  },
  metaInfo() {
    const metaPageData = this.$d.data;
    return {
      title: `${metaPageData.title}`,
      meta: [
        { name: 'description', content: metaPageData.description },
        { property: 'og:title', content: `${metaPageData.title}` },
        { itemprop: 'name', content: `${metaPageData.title}` },
        { itemprop: 'description', content: `${metaPageData.description}` },
        { itemprop: 'image', content: `${API_URL}/assets/${metaPageData.image}` },
        { name: 'twitter:card', content: `${API_URL}/assets/${metaPageData.image}` },
        { property: 'og:site_name', content: window.location.hostname },
        { property: 'og:description', content: metaPageData.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: `${API_URL}/assets/${metaPageData.image}` },
      ],
    };
  },
  mounted() {
    const root = document.querySelector(':root');
    root.style.setProperty('--headerHeight', `${document.querySelector('header').clientHeight}px`);
    this.newsData = this.$d.data.page_blocks;
    this.getAllCategories();
  },
  methods: {
    finallyDoSearch(val) {
      if (!val) {
        this.newsData = this.$d.data.page_blocks;
        this.isSearching = false;
        this.searchData = null;
      } else {
        this.isSearching = !!(val.length);
        this.searchData = val;
        this.searchData[0].sort((a, b) => Date.parse(b.publish_date) - Date.parse(a.publish_date));
        console.log('searching', val);
      }
    },
    filterByTag(val) {
      console.log('filtering', val);
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
  padding-bottom: 110px;

  @include breakpoint('sm') {
    padding-top: 75px;
    padding-bottom: 75px;
  }

  div.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  div.title,
  div.posts {
    margin-top: 33px;
    width: 100%;
  }

  div.title {
    margin-top: 80px;
  }
}
</style>
