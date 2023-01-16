<template>
  <div class="teaser" :class="`teaser-type-weirdo`">
    <router-link :to="routeTarget">
      <div class="normal">
        <Icon :icon="icon"/>
        <div class="teaser-content-wrap">
          <p class="teaser-title h4">
            <slot name="title"></slot>
          </p>
          <p class="teaser-content">
            <slot name="content"></slot>
          </p>
        </div>
      </div>
      <div class="hover">
        <p class="h4">Get started</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'WeirdTeaser',
  components: {
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    type: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    routeTarget: {
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
@import "@/assets/scss/typography.scss";

.teaser {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 64px;
  background: var(--color-grey-light);
  border-radius: var(--border-radius-teaser);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transform: translateZ(0);

  div.normal {
    display: flex;
    align-items: center;
    transition: all 0.35s ease-in-out;
    transform: translateY(0);
  }

  div.hover {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: blue;
    color: white;
    font-weight: 500;
    z-index: 2;
    transition: all 0.35s ease-in-out;
    transform: translateY(-250px);
    border-radius: var(--border-radius-teaser);
    overflow: hidden;

    p.h4 {
      transition: all 0.45s 0.035s ease-in-out;
      transform: scale(1.3);
    }

    a {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }

  .icon {
    width: 64px;
    height: 64px;
  }

  .teaser-content-wrap {
    position: relative;
    z-index: 1;
  }

  &:hover {
    div.normal {
      transform: translateY(200px);
    }

    div.hover {
      transform: translateY(0);

      p.h4 {
        transform: scale(1);
      }
    }
  }
}

.teaser-type-weirdo {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  border-radius: var(--border-radius-teaser);
  overflow: hidden;

  @include breakpoint('sm') {
    padding: 32px;
  }

  &.full {
    justify-content: flex-start;
    background: var(--color-gradient-diagonal);

    .teaser-title {
      color: white;
    }

    .icon {
      circle {
        stroke: white;
      }

      path {
        fill: white;
      }
    }
  }

  .teaser-title {
    font-weight: 400;
    color: var(--color-black);
    transition: all 0.35s ease;
  }

  .icon {
    margin: 0 32px 0 0;
    position: relative;
    transition: all 0.35s ease;

    svg {
      overflow: visible;
    }
  }

  &:hover {
    &:before {
      // background: var(--color-gradient-diagonal);
      background-position: 0 0;
    }

    .teaser-title {
      color: var(--color-white);
    }
  }
}
</style>
