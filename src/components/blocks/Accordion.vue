<template>
  <ul class="accordion" :class="[type, specialclass]">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'Accordion',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    type: {
      type: String,
      default: 'default',
    },
    specialclass: {
      type: String,
      default: '',
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      Accordion: {
        count: 0,
        active: null,
      },
    };
  },
  provide() {
    return { Accordion: this.Accordion };
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

.accordion {
  list-style: none;
  margin: 0;
  margin-left: auto;
  padding: 0 60px;
  padding-bottom: 100px;

  &.full {
    padding: 0 20px;
    padding-bottom: 100px;
    width: calc(100% - 40px);

    @include breakpoint('sm') {
      width: 100%;
      margin: 0 auto;
      padding: 0;
      padding-bottom: 45px;
    }
  }

  &__item:last-child {
    border-bottom: none;
  }

  @include breakpoint('sm') {
    width: 90%;
    margin: 0 auto;
    padding: 0;
    padding-top: 45px;
    padding-bottom: 45px;
  }
}
</style>
