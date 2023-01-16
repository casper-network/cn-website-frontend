<template>
  <div>
    <div class="numLabel">
      {{numLabel}}
    </div>
    <ICountUp
      :delay="delay"
      :endVal="numTarget"
      :options="countOptions"
      class="countup"
      @ready="onReady"
    />
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2';

export default {
  name: 'CountUp',
  components: {
    ICountUp,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    numTarget: Number,
    numLabel: String,
    countOptions: Object,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      delay: 1000,
      endVal: 120500,
      options: {
        useEasing: true,
        useGrouping: true,
        decimalPlaces: 6,
        separator: '\'',
        decimal: '.',
        prefix: '',
        suffix: '',
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
    onReady() {
      /* const that = this;
      instance.update(that.endVal + 100); */
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

.countup {
  font-size: 80px;
  line-height: 90px;
  background: linear-gradient(180deg, #0024CF 0%, #D91C52 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @include breakpoint('sm') {
    font-size: 48px;
  }
}

.numLabel {
  display: block;
  width: 100%;
  border-top: 1px solid var(--color-grey-light);
  padding-top: 16px;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 8px;
}

span {
  margin-bottom: 32px;
  display: block;
}
</style>
