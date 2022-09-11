<template>
  <div class="container">
    <div class="posts">
      <PostItem v-for="(item, i) in casestudies"
                :key="`case-study-item${i}`"
                type="casestudies"
                :post-item-data="item.content[0]"></PostItem>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'ItemCaseStudy',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    collectionType: String,
    collectionAmount: Number,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      casestudies: null,
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
    this.getCaseStudies();
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
    async getCaseStudies() {
      try {
        const response = await axios.get(`${API_URL}/items/casestudies?fields=*.*&limit=-1&sort=sort,date_created`);
        this.casestudies = response.data.data.filter((item) => item.status === 'published');
      } catch (error) {
        this.casestudies = false;
        console.log(error);
      }
      return this.casestudies;
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
  .posts {
    padding-top: 160px;

    @include breakpoint('sm') {
      padding-top: 45px;
    }
  }
}
</style>
