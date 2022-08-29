<template>
  <div>
    <Hero type="reduced single" v-if="pageData.page_blocks"
          :block="pageData.page_blocks[0]"
          :block-title="pageData.page_blocks[0].title"
          :block-content="pageData.page_blocks[0].content">
      <FormContact></FormContact>
    </Hero>
  </div>
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'Contact',
  components: {
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {},
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      pageData: '',
      selectData: ['All', 'Developer', 'Enterprise Customer', 'Curious'],
      isMobile: false,
      formData: {
        name: '',
        email: '',
      },
    };
  },
  metaInfo() {
    const metaPageData = this.$d.data;
    return {
      title: `${metaPageData.title}`,
      meta: [
        { name: 'description', content: metaPageData.description },
        { property: 'og:title', content: `${metaPageData.title}` },
        { itemprop: 'name', content: `${metaPageData.title}` },
        { itemprop: 'description', content: `${metaPageData.description}` },
        { itemprop: 'image', content: `${API_URL}/assets/${metaPageData.image}` },
        { name: 'twitter:card', content: `${API_URL}/assets/${metaPageData.image}` },
        { property: 'og:site_name', content: window.location.hostname },
        { property: 'og:description', content: metaPageData.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: `${API_URL}/assets/${metaPageData.image}` },
      ],
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
    // eslint-disable-next-line valid-typeof
    if (typeof this.$options.components.Hero === 'object') {
      this.$store.commit('changeNavigationTintState', 'light');
    } else {
      this.$store.commit('changeNavigationTintState', 'dark');
    }

    setTimeout(() => {
      const el = document.querySelector('header');
      el.classList = [];
      el.classList.add('header', 'overlap-state-true', 'theme-light');
    }, 50);

    this.pageData = this.$d.data;
    this.isMobile = window.innerWidth < 768;

    window.addEventListener('resize', (e) => {
      console.log(e);
      this.isMobile = window.innerWidth < 768;
    });
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

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

/*.form-container {
  background: white;
  border-radius: var(--border-radius-teaser);
  padding: 80px 128px;
  width: 70%;
  display: block;
  margin-top: 90px;

  @include breakpoint('sm') {
    width: 85%;
  }

  form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
  }

  @include breakpoint('sm') {
    padding: 32px;
    margin-top: 32px;
  }

  .form-group {
    flex: 1;

    @include breakpoint('sm') {
      flex: 1 0 100%;
    }

    label {
      display: block;
      margin-bottom: 16px;
    }

    input[type="text"],
    input[type="email"] {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding: 10px 10px 10px 20px;
      width: 90%;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
      border: 1px solid #ccc;
      border-radius: var(--border-radius-input);
      outline: 1px solid #ccc;

      &:focus {
        outline: 1px solid var(--color-blue);
      }

      &.error {
        outline: 1px solid red;
      }
    }

    ::placeholder {
      color: #ccc;
    }

    &.checkboxes {
      flex-basis: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;

      @include breakpoint('sm') {
        flex-direction: column;
      }

      > div {
        display: flex;
        align-items: center;
        @include breakpoint('sm') {
          flex-direction: column;
        }

        label {
          margin: 0;
        }
      }

      .group {
        div {
          align-items: center;
          display: flex;
          margin-right: 24px;
          @include breakpoint('sm') {
            flex-direction: column;
          }
        }
      }
    }
  }
}*/
</style>
