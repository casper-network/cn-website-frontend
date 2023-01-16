<template>
  <div class="text-component" :class="{ margined: setAsH1 }">
    <div>
      <h1 v-if="setAsH1" class="h1" v-html="boxTitle" />
      <h2 v-else class="h1" v-html="boxTitle" />
      <p v-html="boxContent"></p>
      <Button class="primary" v-if="buttonTarget">
        <router-link v-if="buttonType === 'int'" :to="`/${$i18n.locale}${buttonTarget}`">
          {{buttonLabel}}
        </router-link>
        <a v-if="buttonType === 'ext'" :href="`${buttonTarget}`" target="_blank">
          {{buttonLabel}}
        </a>
      </Button>
    </div>
    <div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'TextTeaser',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    boxTitle: {
      type: String,
      default: 'Titel',
    },
    boxContent: {
      type: String,
      default: '',
    },
    buttonLabel: {
      type: String,
      default: '',
    },
    buttonTarget: {
      type: String,
      default: '',
    },
    buttonType: {
      type: String,
      default: '',
    },
    hasButton: {
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
    return {
      setAsH1: false,
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
  mounted() {
    const h1 = document.querySelector('h1');
    if (!h1 && window.h1Set !== true) {
      this.setAsH1 = true;
      window.h1Set = true;
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

.text-component {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  padding-top: 100px;
  // padding-bottom: 160px;

  &.margined {
    margin-bottom: 100px;
  }

  &.white {
    color: var(--color-white);
  }

  > div:first-child {
    width: 55%;
    min-width: 55%;
  }

  > div:last-child {
    width: 70%;
  }

  &.fullwidth {

    > div:first-child {
      width: 100%;
      min-width: 100%;
    }

    > div:last-child {
      width: 100%;
    }
  }

  @include breakpoint('sm') {
    flex-direction: column;
    padding-top: 45px;
    // padding-bottom: 45px;

    > div:first-child {
      width: 100%;
    }

    > div:last-child {
      width: 100%;
    }
  }

  h1 {
    font-weight: 300;
    margin-bottom: 48px;

    span {
      font-weight: 300;
    }
  }

  p {
    font-weight: 300;

    a {
      font-family: inherit;
      font-size: inherit;
      color: var(--color-blue);
      text-decoration: underline;
    }
  }

  .btn.primary {
    margin-top: 32px;

    @include breakpoint('sm') {
      margin-top: 24px;
    }
  }
}
</style>
