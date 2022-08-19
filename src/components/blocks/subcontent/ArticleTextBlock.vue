<template>
  <div class="container" :id="slugged">
    <div class="article-text-block">
      <div>
        <h2 v-html="title"></h2>
      </div>
      <div>
        <p v-html="content"></p>
      </div>
    </div>
  </div>
</template>

<script>
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

    /*::v-deep ul {
      list-style-type: none;
      padding-left: 0;
      @include style-body('large');

      li {
        color: var(--color-blue);
        padding-top: 24px;
        padding-bottom: 24px;
        border-top: 1px solid #ccc;

        a {
          @include style-body('large');
          font-weight: 400;
          color: var(--color-blue);
          display: flex;
          align-items: center;

          &:before {
            content: '';
            background-image: url("data:image/svg+xml,%3Csvg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.5303 4.48139C18.2374 4.1885 17.7626 4.1885 17.4697 4.48139C17.1768 4.77428 17.1768 5.24916 17.4697 5.54205L21.3322 9.40454H7.71456C5.69703 9.40454 3.76212 10.206 2.3355 11.6326C0.908887 13.0592 0.107422 14.9941 0.107422 17.0117V20.4403C0.107422 20.8545 0.443208 21.1903 0.857422 21.1903C1.27164 21.1903 1.60742 20.8545 1.60742 20.4403V17.0117C1.60742 15.392 2.25085 13.8386 3.39616 12.6933C4.54147 11.548 6.09485 10.9045 7.71456 10.9045H21.3322L17.4697 14.7671C17.1768 15.06 17.1768 15.5349 17.4697 15.8278C17.7626 16.1207 18.2374 16.1207 18.5303 15.8278L23.6619 10.6962C23.8044 10.5597 23.8931 10.3675 23.8931 10.1545C23.8931 9.94085 23.8038 9.74802 23.6604 9.61142L18.5303 4.48139Z' fill='%230024CF'/%3E%3C/svg%3E");
            width: 24px;
            height: 24px;
            display: block;
            margin-right: 32px;
          }
        }
      }
    }*/
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
