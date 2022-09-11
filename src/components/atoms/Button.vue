<template>
  <div class="btn">
    <SVGGlobe v-if="icon === 'globe'"></SVGGlobe>
    <SVGShare v-if="icon === 'share'"></SVGShare>
    <SVGBack v-if="icon === 'back'"></SVGBack>
    <slot class="btn__content"></slot>
  </div>
</template>

<script>
import SVGGlobe from '@/assets/svg/globe.svg?inline';
import SVGShare from '@/assets/svg/share.svg?inline';
import SVGBack from '@/assets/svg/backArrow.svg?inline';

export default {
  name: 'Button',
  components: {
    SVGGlobe,
    SVGShare,
    SVGBack,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    icon: {
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
.btn {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  font-size: var(--typography-cta-d-font-size);

  a, p {
    padding: 12px 30px 14px;
    display: flex;
  }

  &.primary {
    background-color: var(--color-blue);
    border-radius: var(--border-radius-button);
    border: 1px solid var(--color-white);
    color: var(--color-white);

    svg {
      margin-right: 15px;

      path {
        fill: var(--color-white);
      }
    }

    &:hover {
      background-color: var(--color-dark-blue);
    }
  }

  &.secondary {
    background-color: var(--color-white);
    border-radius: var(--border-radius-button);
    border: 1px solid var(--color-blue);
    color: var(--color-blue);

    svg {
      margin-left: 15px;

      path {
        fill: var(--color-blue);
      }
    }

    &:hover {
      background-color: var(--color-blue);
      color: var(--color-white);

      svg {
        path {
          fill: var(--color-white);
        }
      }
    }
  }
}
</style>
