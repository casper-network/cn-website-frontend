<template>
  <div class="page-news-index filtered">
    <section>
      <SearchBar type="News" @search="finallyDoSearch"></SearchBar>
      <div class="container">
        <div class="title">
          <h1 style="font-weight: 700;margin-top: 32px; margin-bottom: 0;" v-html="(!searchString) ? '<span>The latest</span> of Casper Association' : `'${searchString}'`"></h1>
          <p style="font-weight: 700;margin-top: 16px;" v-if="isSearching">
            <span>{{$t('titles.resultsFound')}}</span>
            <span>{{("0" + newsData.length).slice(-2)}}</span>
          </p>
          <h2 v-if="isFiltering">{{this.$route.params.category.charAt(0).toUpperCase() + this.$route.params.category.slice(1, this.$route.params.length)}}</h2>
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

export default {
  name: 'NewsFiltered',
  components: {},
  computed: {},
  data() {
    return {
      newsData: '',
      categories: Array,
      searchString: '',
      isFiltering: false,
      isSearching: false,
    };
  },
  watch: {
    $route() {
      this.filterByTag();
    },
  },
  mounted() {
    this.newsData = this.$d.data;
    this.categories = this.getAllCategories();
  },
  methods: {
    finallyDoSearch(val) {
      // eslint-disable-next-line prefer-destructuring
      this.newsData = val[0];
      this.isFiltering = false;
      this.isSearching = !!(val[1]);
      // eslint-disable-next-line prefer-destructuring
      this.searchString = val[1];
      this.newsData.sort((a, b) => Date.parse(b.publish_date) - Date.parse(a.publish_date));
      console.log('searching', val[0]);
    },
    filterByTag(val) {
      this.newsData = this.$d.data;
      this.newsData.sort((a, b) => Date.parse(b.publish_date) - Date.parse(a.publish_date));
      this.isFiltering = true;
      console.log('filtering', val);
    },
    async getAllCategories() {
      const res = await axios.get(`${process.env.VUE_APP_API_URL}/cce/categories?locale=en-US&collection=news`);
      this.categories = res.data;
    },
  },
};
</script>
<style lang="scss">
.page-news-index {
  padding-top: 110px;

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
