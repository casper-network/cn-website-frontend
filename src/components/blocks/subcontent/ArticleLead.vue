<template>
  <div class="article-lead">
    <div>
      <h1 v-html="title"></h1>
      <p v-html="content"></p>
    </div>
    <div>
      <Button class="secondary share" icon="share" v-if="this.$d.clientWidth < 768">
        <a @click="shareThis">Share</a>
      </Button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ArticleLead',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    type: String,
    title: String,
    content: String,
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
    shareThis() {
      window.navigator.share({ url: window.location.href });
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';

div.article-lead {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  @include breakpoint('sm') {
    flex-direction: column;
    gap: 32px;
  }

  .share {
    color: var(--color-white);
    text-decoration: none;

    a {
      text-decoration: none;
      color: var(--color-blue);
    }

    &:hover {
      color: var(--color-white);

      a {
        color: var(--color-white);
      }
    }
  }

  h1 {
    max-width: 70%;

    @include breakpoint('sm') {
      max-width: 100%;
      width: 100%;
    }
  }

  p {
    max-width: 70%;

    @include breakpoint('sm') {
      max-width: 100%;
      width: 100%;
    }
  }

  ::v-deep a {
    color: var(--color-blue);
    text-decoration: underline;
    @include style-body('large');
  }
}
</style>
