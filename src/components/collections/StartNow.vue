<template>
  <div class="collection-start">
    <div class="container">
      <div class="collection-head">
        <h2 v-html="blockTitle"></h2>
      </div>
      <div class="collection-body">
        <WeirdTeaser
          :type="buttonData[0].type"
          :icon="buttonData[0].icon"
          :route-target="buttonData[0].url">
          <template v-slot:title>
            {{ buttonData[0].title }}
          </template>
        </WeirdTeaser>
        <WeirdTeaser
          :type="buttonData[1].type"
          :icon="buttonData[1].icon"
          :route-target="buttonData[1].url">
          <template v-slot:title>
            {{ buttonData[1].title }}
          </template>
        </WeirdTeaser>
        <WeirdTeaser
          class="full"
          :type="buttonData[2].type"
          :icon="buttonData[2].icon"
          :route-target="buttonData[2].url">
          <template v-slot:title>
            {{ buttonData[2].title }}
          </template>
        </WeirdTeaser>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'StartNow',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    blockTitle: {
      type: String,
      default: 'Do not hesitate &<br/><b>start now</b>',
    },
    buttonData: {
      type: Array,
      required: true,
    },
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
@import '~scss/mixins';

div.container {
  flex-direction: column;
  margin: 160px auto;

  @include breakpoint('sm') {
    margin: 80px auto;
  }
}

div.collection-head {
  flex-direction: row;
  margin-bottom: 64px;
}

div.collection-body {
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;

  .teaser {
    flex: 1 0 38%;
  }
}
</style>
