<template>
  <div class="count-up-container">
    <div class="grid">
      <CountUp
        v-for="(counter, i) in counterData" :key="`counter${i}`"
        :num-target="counter.value"
        :num-label="counter.title"
        :count-options="{
          useEasing: true,
          useGrouping: true,
          decimalPlaces: counter.decimals,
          separator: '\'',
          decimal: '.',
          prefix: (counter.prefix) ? counter.prefix : '',
          suffix: (counter.suffix) ? counter.suffix : '',
        }"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'CountUpCollection',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    counterData: {
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

div.grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;

  max-width: 1248px;
  margin: 160px auto 0;
  padding: 0 30px;

  @include breakpoint('sm') {
    grid-template-columns: repeat(1, 1fr);
    margin: 80px auto 0;
    padding: 0 15px;
  }
}
</style>
