<template>
  <div class="collection-latest-news">
    <div class="container">
      <div class="collection-head">
        <h2 v-html="collectionTitle"></h2>
        <Button class="secondary">
          <router-link to="/news">All news</router-link>
        </Button>
      </div>
      <div class="collection-body">
        <PostItem :post-item-data="postItemData"></PostItem>
        <PostItem :post-item-data="postItemData"></PostItem>
        <PostItem :post-item-data="postItemData"></PostItem>
        <PostItem :post-item-data="postItemData"></PostItem>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LatestNews',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    collectionTitle: {
      type: String,
      default: 'Latest xxx',
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      postItemData: {
        title: 'Etwas grosses',
        featuredImage: 'https://picsum.photos/800/600',
        slug: 'etwas-grosses',
        tags: ['test', 'test2'],
        type: 'news',
        date: '2020-01-01',
      },
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
  // mounted() {},
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
