<template>
  <div class="`collection-latest-${type}`">
    <div class="container">
      <div class="collection-head">
        <h2 v-if="type === 'news'" v-html="$i18n.t('titles.relatedNews')"></h2>
        <h2 v-if="type === 'casestudies'" v-html="$i18n.t('titles.relatedCasestudies')"></h2>
        <Button class="secondary" icon="back">
          <router-link v-if="type === 'casestudies'" :to="`/${$i18n.locale}/case-studies`">{{$t('ctas.backToOverview')}}</router-link>
          <router-link v-else :to="`/${$i18n.locale}/news`">{{$t('ctas.backToOverview')}}</router-link>
        </Button>
      </div>
      <div class="collection-body" v-if="relatedItems && type === 'news'">
        <PostItem
          v-for="(item, i) in relatedItems"
          :key="i"
          :post-item-data="item"
          :type="type"
          :category-data="categories"
        ></PostItem>
      </div>
      <div class="collection-body" v-if="relatedItems && type === 'casestudies'">
        <PostItem
          v-for="(item, i) in relatedItems"
          :key="i"
          :post-item-data="item.content[0]"
          :type="type"
          :category-data="categories"
        ></PostItem>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'RelatedItems',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    relatedItems: Array,
    type: String,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      categories: null,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {},
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
    if (this.type === 'news') {
      this.getAllCategories();
    }
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
    async getAllCategories() {
      const res = await axios.get(`${process.env.VUE_APP_API_URL}/cce/categories?locale=en-US&collection=news`);
      this.categories = res.data;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

div.container {
  flex-direction: column;
  margin-top: 160px;

  @include breakpoint(sm) {
    margin-top: 80px;
  }
}

div.collection-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @include breakpoint('sm') {
    .btn {
      display: none;
    }
  }
}
</style>
