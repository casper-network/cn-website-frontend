<template>
  <div>
    <div class="career-detail-item" v-html="content"></div>
    <br/>
    <Button class="primary" @click.native="toggleForm()">
      <a>{{ $t('ctas.applyNow') }}</a>
    </Button>
  </div>
</template>

<script>
export default {
  name: 'CareerDetail',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    content: String,
    slug: String,
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
    toggleForm() {
      this.$emit('toggle-form');
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss">
@import '~scss/mixins';

.career-detail-item {
  p {
    font-size: 20px !important;
    line-height: 32px !important;
  }

  p.title {
    @include style-body('large');
    font-weight: 500;
  }

  h2,
  h3 {
    margin-top: var(--margin-32);
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;

    li {
      position: relative;
      display: flex;
      margin: 32px 0 32px 8px;

      &:before {
        content: '';
        background-size: contain;
        background-repeat: no-repeat;
        min-width: 24px;
        height: 24px;
        display: block;
        transform: translate(-50%, 8px);
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.5 12.7266C1.5 6.92757 6.20101 2.22656 12 2.22656C17.799 2.22656 22.5 6.92757 22.5 12.7266C22.5 18.5256 17.799 23.2266 12 23.2266C6.20101 23.2266 1.5 18.5256 1.5 12.7266ZM12 0.726562C5.37258 0.726562 0 6.09915 0 12.7266C0 19.354 5.37258 24.7266 12 24.7266C18.6274 24.7266 24 19.354 24 12.7266C24 6.09915 18.6274 0.726562 12 0.726562ZM18.5885 8.02051C18.8453 7.69555 18.7901 7.2239 18.4651 6.96705C18.1402 6.7102 17.6685 6.76542 17.4117 7.09039L9.56866 17.0134L9.55985 17.0248C9.53104 17.0627 9.4936 17.0932 9.45064 17.1137C9.40767 17.1342 9.36042 17.1442 9.31283 17.1428C9.26523 17.1413 9.21867 17.1286 9.17701 17.1055C9.13534 17.0825 9.09978 17.0498 9.0733 17.0102L9.06315 16.9955L6.61315 13.5184C6.37456 13.1799 5.90666 13.0988 5.56806 13.3374C5.22946 13.5759 5.14839 14.0439 5.38697 14.3825L7.83251 17.8531C7.99128 18.0874 8.2031 18.281 8.45081 18.418C8.70149 18.5567 8.98167 18.6335 9.26803 18.6421C9.5544 18.6506 9.83866 18.5907 10.0972 18.4672C10.3532 18.3449 10.5767 18.1637 10.7493 17.9386L18.5885 8.02051Z' fill='%230024CF'/%3E%3C/svg%3E%0A");
      }
      @include style-body('large');
    }
  }
}
</style>
