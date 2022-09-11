<template>
  <div class="input-type-search">
    <label for="">{{`Search in ${type}`}}</label>
    <input type="text" :placeholder="`Search in ${type}`"
           v-model="searchString">
    <SVGIconSearch v-if="!searchActive"/>
    <SVGIconClose v-else @click="resetSearch" style="cursor: pointer"/>
  </div>
</template>

<script>
import SVGIconSearch from '@/assets/svg/search.svg?inline';
import SVGIconClose from '@/assets/svg/close.svg?inline';

export default {
  name: 'SearchInput',
  components: {
    SVGIconSearch,
    SVGIconClose,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    type: String,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      searchString: '',
      searchActive: false,
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
  watch: {
    searchString: {
      handler() {
        if (this.searchString.length > 2) {
          this.searchActive = true;
          setTimeout(() => {
            this.$emit('search', this.searchString);
          }, 300);
        } else {
          this.searchActive = false;
          setTimeout(() => {
            this.$emit('search', '');
          }, 300);
        }
      },
      deep: true,
    },
  },
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
    resetSearch() {
      this.searchString = '';
      this.$emit('search', '');
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
    sendSearchRequest() {
      this.$emit('search', this.searchString);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

.input-type-search {
  padding-bottom: 10px;
  padding-right: 50px;
  border-bottom: 1px solid var(--color-grey-dark);
  display: flex;
  align-items: center;
  position: relative;

  @include breakpoint('sm') {
    max-width: calc(100% - 30px);
    padding: 0 0 10px 0;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    background: var(--color-blue);
    z-index: 2;
    width: 0;
    transition: width 0.35s ease-in-out;
  }

  &.focus,
  &:hover {
    &:after {
      width: 100%;
    }
  }

  svg {
    position: absolute;
    right: 0;
  }

  label {
    display: none;
  }

  input {
    appearance: none;
    outline: 0;
    box-shadow: none;
    border: 0;
    width: 100%;

    font-size: 18px;
    line-height: 24px;
    color: var(--color-grey-dark);

    @include breakpoint('sm') {
      padding: 0 30px;
    }

    &::placeholder {
      font-size: 16px;
    }
  }
}
</style>
