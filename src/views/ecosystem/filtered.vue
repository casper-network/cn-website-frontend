<template>
  <div class="page-ecosystem-index">
    <SearchBar type="ecosystem" @search="finallyDoSearch" @filterByTag="filterByTag"></SearchBar>
    <div class="container -long">
      <div class="title">
        <h1 style="font-weight: 700;margin-top: 32px; margin-bottom: 0;" v-html="(!searchString) ? categories.find(x => x.key === $route.params.category).name : `'${searchString}'`"></h1>
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
// import { HTTP } from '@/utils/http-common';
import axios from 'axios';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'EcoSystemFiltered',
  components: {},
  computed: {
    /* allTags() {
      const tags = Object.keys(this.postItemData).map((key) => this.postItemData[key].tags);
      return [...new Set(tags.flat(Infinity))];
    }, */
  },
  data() {
    return {
      data: '',
      isFiltering: true,
      isSearching: false,
      applicationData: [],
      searchString: '',
      categories: [],
    };
  },
  watch: {
    $route() {
      this.filterByTag();
    },
  },
  mounted() {
    this.applicationData = this.$d.data;
    this.getAllCategories();
  },
  methods: {
    async getAllCategories() {
      let res = {};
      switch (this.type) {
        case 'News':
          res = await axios.get(`${API_URL}/cce/categories?locale=en-US&collection=news`);
          break;
        case 'ecosystem':
        default:
          res = await axios.get(`${API_URL}/cce/categories?locale=en-US&collection=applications`);
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
        console.log('searching', val);
      }
    },
    filterByTag(val) {
      this.applicationData = this.$d.data;
      console.log('filtering', val);
    },
    categoryCollector(val) {
      console.log(val);
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
