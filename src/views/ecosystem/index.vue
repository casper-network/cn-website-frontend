<template>
  <div class="page-ecosystem-index">
    <SearchBar type="Ecosystem" @search="finallyDoSearch"></SearchBar>
    <div class="container -long">
      <div class="title" v-if="applicationData">
        <h1 style="font-weight: 700;margin-top: 32px; margin-bottom: 0;" v-if="isSearching" v-html="`'${searchString}'`"></h1>
        <h1 style="margin-top: 32px" v-html="applicationData[0].title" v-else></h1>
        <p style="font-weight: 700;margin-top: 16px;" v-if="isSearching || isFiltering">
          <span>{{$t('titles.resultsFound')}}</span>
          <span>{{ searchResults }}</span>
        </p>
      </div>
    </div>
    <!--    <Glider :glide-data="glideData" v-if="!isFiltering"></Glider>-->
    <div v-for="(appCollection, appIndex) in applicationData" :key="appIndex">
      <div v-if="appCollection.blocktype === 'filteredcollectionteasers' && !isSearching">
        <PostCollection
          @categorydata="categoryCollector"
          button-label="View All"
          :collection-data="appCollection"
          :button-target="`/${$i18n.locale}/ecosystem/tag/${appCollection.collection.category}`"
          :block-title="`${appCollection.title}`"/>
      </div>
    </div>
    <div v-if="isSearching">
      <div class="container -long">
        <div class="block-content" v-if="searchData">
          <Card v-for="(card, i) in searchData[0]" :key="`card-${i}`"
                :card-data="card.content[0]"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'EcoSystem',
  components: {},
  computed: {},
  data() {
    return {
      data: '',
      isFiltering: false,
      isSearching: false,
      applicationData: null,
      searchData: null,
      searchResults: 0,
      searchString: '',
      categories: [],
    };
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
          content: `${process.env.VUE_APP_API_URL}/assets/${metaPageData.image}`,
        },
        {
          name: 'twitter:card',
          content: `${process.env.VUE_APP_API_URL}/assets/${metaPageData.image}`,
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
          content: `${process.env.VUE_APP_API_URL}/assets/${metaPageData.image}`,
        },
      ],
    };
  },
  mounted() {
    this.applicationData = this.$d.data.page_blocks;
    this.getAllCategories();
  },
  methods: {
    async getAllCategories() {
      const res = await axios.get(`${process.env.VUE_APP_API_URL}/cce/categories?locale=en-US&collection=applications`);
      this.categories = res.data;
    },
    finallyDoSearch(val) {
      if (!val) {
        this.applicationData = this.$d.data.page_blocks;
        this.isSearching = false;
        this.searchData = null;
      } else {
        // eslint-disable-next-line prefer-destructuring
        this.searchString = val[1];
        this.isSearching = !!(val[1]);
        this.searchData = val;
        const numResults = (val[0] || []).length;
        if (numResults === 0) {
          this.searchResults = 0;
        } else {
          this.searchResults = numResults.toString().padStart(2, '0');
        }
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
  padding-bottom: 160px;

  div.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  div.title {
    margin-top: 32px;
  }

  div.title,
  div.posts {
    width: 100%;
  }

  .block-content {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(3, minmax(32%, 3fr));

    @include breakpoint('sm') {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  transform-origin: left center;
  opacity: 0;
}
</style>
