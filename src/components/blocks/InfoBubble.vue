<template>
  <div class="info-bubble" :class="{ closed }" v-if="text" >
    <SVGInfo />
    <div v-html="text" />
  </div>
</template>

<script>
import SVGInfo from '@/assets/svg/icon-information.svg?inline';

export default {
  name: 'InfoBubble',
  components: {
    SVGInfo,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    text: {
      type: String,
      default: null,
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      closed: false,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
  },
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
    if (this.text) {
      setTimeout(() => {
        this.closed = true;
      }, 3500);
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
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss">
@import '~scss/mixins';

.info-bubble {
  --size: 48px;

  position: fixed;
  right: 30px;
  bottom: 30px;
  border-radius: var(--size);
  padding: 12px;
  display: flex;
  align-items: center;
  background-color: var(--color-atomic-lime);
  box-shadow: 1px 2px 5px rgba(0,0,0,0.75);
  z-index: 10000;
  max-width: 100%;
  transition: max-width 1.2s ease-in-out;

  @include breakpoint('sm') {
    right: 10px;
    bottom: 10px;
    --size: 36px;
    font-size: 13px;
  }

  & > svg {
    width: var(--size);
    height: var(--size);
    min-width: var(--size);
    min-height: var(--size);
    max-width: var(--size);
    max-height: var(--size);
  }
  & > div {
    margin: 0 12px;
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 1.2s ease-in-out;
    opacity: 1;

    p {
      margin: 0;
      font-size: inherit;
      line-height: inherit;
      padding: 0;
    }
  }

  &.closed {
    max-width: var(--size);

    & > div {
      opacity: 0;
    }

    &:hover {
      max-width: 100%;
      & > div {
        opacity: 1;
      }
    }
  }
}
</style>
