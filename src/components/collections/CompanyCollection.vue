<template>
  <div class="companycollection">
    <div class="grid">
      <PartnerCard />
      <PartnerCard />
    </div>
    <div class="grid-medium">
      <PartnerCard />
      <PartnerCard />
      <PartnerCard />
      <PartnerCard />
      <PartnerCard />
      <PartnerCard />
    </div>
  </div>
</template>

<script>

export default {
  name: 'CompanyCollection',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {},
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
@import '~scss/mixins';

.companycollection {
  position: relative;
  width: 100%;
  display: block;
}
div.grid {
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 32px;
  margin-bottom: 32px;

  @include breakpoint('sm') {
    gap: 16px;
    grid-template-columns: 1fr;
  }
}

div.grid-medium {
  display: grid;
  width: 100%;
  grid-template-columns: 2fr 2fr 2fr;
  gap: 32px;

  @include breakpoint('sm') {
    gap: 16px;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
