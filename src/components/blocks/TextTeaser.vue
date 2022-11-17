<template>
  <div class="text-component">
    <div>
      <h2 class="h1" v-html="boxTitle"></h2>
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
      <p v-html="boxContent"></p>
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
@import '~scss/mixins';

.text-component {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  padding-top: 160px;
  // padding-bottom: 160px;

  > div:first-child {
    width: 50%;
  }

  > div:last-child {
    width: 70%;
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
    font-weight: 400;
    margin-bottom: 0;

    span {
      font-weight: 700;
    }
  }

  p {
    @include style-body('large');

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
