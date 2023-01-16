<template>
  <div class="tag">
    <slot></slot>
    <SVGPlus v-if="icon === 'plus'" />
  </div>
</template>

<script>
import SVGPlus from '@/assets/svg/icon-accordion-plus.svg?inline';

export default {
  name: 'Tag',
  components: {
    SVGPlus,
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

<style lang="scss">
@import './src/assets/scss/typography.scss';

.tag {
  @extend .tagLabel;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 0;
  cursor: pointer;
  margin: 0;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;

  &.primary {
    border: 1px solid var(--color-white);
    color: var(--color-white);

    svg {
      margin-right: 15px;

      path {
        fill: var(--color-white);
      }
    }

    &.icon {
      width: 24px;
      height: 24px;
      padding: 2px;

      svg {
        margin: 2px;
        width: 20px;
        height: 20px;

        path {
          fill: var(--color-white);
        }
      }
    }

    &:hover {
    }
  }

  &.secondary {
    color: var(--color-sky-dancer);

    svg {
      margin-right: 15px;

      path {
        fill: var(--color-sky-dancer);
      }
    }

    a {
      font-size: 1.1851851852rem;
      font-weight: 500;
    }

    &.icon {
      width: 24px;
      height: 24px;
      padding: 2px;

      svg {
        margin: 2px;
        width: 20px;
        height: 20px;

        path {
          fill: var(--color-blue);
        }
      }
    }
  }
}
</style>
