<template>
  <div class="container" :id="slugged">
    <div class="article-text-block">
      <div>
        <h2 v-html="title" :data-slug="hashSlug"></h2>
        <Button class="primary" v-if="buttonTarget">
          <router-link :to="`/${$i18n.locale}${buttonTarget}`" v-if="buttonType === 'int'">
            {{buttonLabel}}
          </router-link>
          <a :href="`${buttonTarget}`" target="_blank" v-if="buttonType === 'ext'">
            {{buttonLabel}}
          </a>
        </Button>
      </div>
      <div>
        <p v-html="content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import slugify from 'slugify';

export default {
  name: 'ArticleTextBlock',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    title: String,
    content: String,
    buttonLabel: {
      type: String,
      default: null,
    },
    buttonTarget: {
      type: String,
      default: null,
    },
    buttonType: {
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
    return {};
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    slugged() {
      if (this.title) {
        return this.title.toLowerCase()
          .replace(/\s/g, '-')
          .replace(/(<([^>]+)>)/ig, '')
          .replace(/[~`!@#$%^&*()+={}[\];:'"<>.,/\\?]/g, '');
      }
      return '';
    },
    hashSlug() {
      const title = (this.title || '').replace(/<\/?[^>]+(>|$)/g, '');
      return slugify(title, { lower: true, strict: true });
    },
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
@import '~scss/mixins';
@import '~scss/variables';

.article-text-block {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 80px;
  width: 100%;
  gap: 32px;

  @include breakpoint('sm') {
    padding-top: 32px;
  }

  > div:first-child {
    flex: 1 0 40%;
    padding-right: 16px;
    position: sticky;
    top: 110px;

    @include breakpoint('sm') {
      flex: initial;
      padding-right: 0;
      position: initial;
      top: initial;
    }

    h2 {
      margin-top: 0;
    }

    @include breakpoint('sm') {
      h2 {
        margin-top: 0;
        margin-bottom: 32px;
      }
    }
  }

  p {
    @include style-body('large');
    font-weight: 400;
    flex: 1 0 52%;

    ::v-deep a {
      color: var(--color-blue);
      text-decoration: underline;
      @include style-body('large');
      word-break: break-all;
    }
  }

  @include breakpoint('sm') {
    flex-direction: column;
  }
}

div.container {
  margin: 0 auto;
  padding: 0 20px !important;
}
</style>
