<template>
  <div class="btn" :class="{ disabled }">
    <SVGGlobe v-if="icon === 'globe'" />
    <SVGShare v-else-if="icon === 'share'" />
    <SVGBack v-else-if="icon === 'back'" />
    <SVGOpenLink v-else-if="icon === 'link'" />
    <slot class="btn__content"></slot>
  </div>
</template>

<script>
import SVGGlobe from '@/assets/svg/globe.svg?inline';
import SVGShare from '@/assets/svg/icon-share.svg?inline';
import SVGBack from '@/assets/svg/icon-arrow-left.svg?inline';
import SVGOpenLink from '@/assets/svg/icon-openlink.svg?inline';

export default {
  name: 'Button',
  components: {
    SVGGlobe,
    SVGShare,
    SVGBack,
    SVGOpenLink,
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
    disabled: {
      type: Boolean,
      default: false,
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
    padding: 10px 30px 14px;
    display: flex;
    font-weight: 500;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &.primary {
    background-color: var(--color-atomic-lime);
    border: 2px solid var(--color-atomic-lime);
    color: var(--color-black);
    transition: all 0.15s ease;

    svg {
      margin-right: 15px;

      path {
        fill: var(--color-white);
      }
    }

    &:hover {
      background-color: var(--color-black);
      color: var(--color-atomic-lime);
    }
  }

  &.secondary {
    background-color: var(--color-atomic-lime);
    border: 2px solid var(--color-atomic-lime);
    color: var(--color-black);
    transition: all 0.15s ease;

    svg {
      position: relative;
      left: 15px;
      top: -1px;
      margin-left: 0;
      margin-right: 0;
      width: 22px;

      path {
        &:nth-child(1) {
          fill: transparent;
        }
        &:nth-child(2) {
          fill: var(--color-black);
        }
      }
    }

    &:hover {
      background-color: var(--color-black);
      color: var(--color-atomic-lime);

      svg {
        path {
          &:nth-child(1) {
            fill: transparent;
          }
          &:nth-child(2) {
            fill: var(--color-atomic-lime);
          }
        }
      }
    }
  }
}
</style>
