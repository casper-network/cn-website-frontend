<template>
  <div class="collection-related-apps">
    <div class="container">
      <div class="collection-head">
        <h2 v-html="$t('titles.relatedApplications')"></h2>
        <Button class="secondary" icon="">
          <router-link :to="`/${$i18n.locale}/ecosystem`">{{$t('ctas.viewAll')}}</router-link>
        </Button>
      </div>
      <div class="collection-body">
        <Card v-for="(card, i) in relatedApplications" :key="`card-${i}`" :card-data="card.content[0]"></Card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RelatedApplications',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    relatedApplications: Array,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {};
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
  margin-top: 110px;
}

div.collection-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @include breakpoint('sm') {
    .btn {
      display: none;
    }
  }
}

div.collection-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 80px;

  @include breakpoint('sm') {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
