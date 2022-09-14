<template>
  <a class="teaser" :class="`teaser-type-${type}`" :href="url" target="_blank">
    <div>
      <Icon :icon="icon"/>
      <div class="teaser-content-wrap">
        <p class="teaser-title">
          <slot name="title"></slot>
        </p>
        <p class="teaser-content">
          <slot name="content"></slot>
        </p>
      </div>
    </div>
  </a>
</template>

<script>

export default {
  name: 'Teaser',
  components: {},
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
    url: String,
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

  .teaser-content-wrap {
    position: relative;
    z-index: 1;
  }

  .teaser-title {
    @extend h3;
    margin-bottom: 10px;
  }

  .icon {
    margin-bottom: 48px;
  }

  @include breakpoint('sm') {
    padding: 32px;
  }
}

.teaser-type-usp {
  a {
    display: flex;
    flex-direction: row !important;

    @include breakpoint('sm') {
      flex-direction: column !important;
    }
  }

  .teaser-title {
    @extend h4;
    font-weight: 700;
    margin-bottom: 10px;
  }

  &:hover {
    box-shadow: 0 0 0 4px rgba(0, 36, 207, 0.3);

    .teaser-title {
      color: var(--color-blue);
    }
  }

  @include breakpoint('sm') {
    flex-direction: column !important;
    padding: 32px;

    .icon {
      width: 64px;
      margin-bottom: 16px;
    }
  }
}

.teaser-type-readmore {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-gradient-diagonal);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0 0;
    transition: all 0.3s ease;
    z-index: 0;
  }

  .teaser-title {
    @extend h4;
    font-weight: 400;
    color: var(--color-white);
    transition: all 0.35s ease;
  }

  .icon {
    margin-right: 32px;
    position: relative;
    transition: all 0.35s ease;

    circle,
    path {
      stroke: var(--color-white);
    }
  }

  &:hover {
    &:before {
      background: var(--color-blue);
      background-position: 0 0;
    }

    .teaser-title {
      color: var(--color-white);
    }

    .icon {
      circle,
      path {
        stroke: var(--color-white);
      }
    }
  }
}

.teaser-type-full {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: var(--color-gradient-diagonal);
  background-repeat: no-repeat;
  background-size: 200% 100%;
  background-position: 50%;
  transition: all 0.3s ease;
  width: 100%;

  .teaser-title {
    @extend h4;
    font-weight: 400;
    color: white;
  }

  .icon {
    margin-right: 32px;
  }

  &:hover {
    background-size: 220% 150%;
    background-position: 0;

    .teaser-title {
      color: var(--color-white);
    }
  }
}

.teaser-type-cta {
  flex-direction: row;
  // justify-content: center;
  align-items: center;

  .teaser-title {
    @extend h4;
  }

  .teaser-content {
    font-size: 20px;
    line-height: 32px;
  }

  .icon {
    margin-right: 32px;

    svg {
      overflow: visible;
    }
  }

  &:hover {
    box-shadow: 0 0 0 4px rgba(0, 36, 207, 0.3);

    .teaser-title {
      @extend h4;
      color: var(--color-blue);
      margin-bottom: 10px;
    }
  }
}
</style>
