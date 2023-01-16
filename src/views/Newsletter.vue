<template>
  <div>
    <Hero type="reduced single" v-if="pageData.page_blocks"
          :block="pageData.page_blocks[0]"
          :block-title="pageData.page_blocks[0].title"
          :block-content="pageData.page_blocks[0].content">
    </Hero>
    <div class="restrict">
      <FormNewsletter />
    </div>
  </div>
</template>

<script>
import Hero from '@/components/blocks/Hero.vue';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'Newsletter',
  components: {
    Hero,
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
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {},
  metaInfo() {
    const metaPageData = this.$d.data;
    return {
      title: `${metaPageData.title}`,
      meta: [
        { name: 'description', content: metaPageData.description },
        { itemprop: 'title', content: `${metaPageData.title}` },
        { itemprop: 'description', content: `${metaPageData.description}` },
        { itemprop: 'name', content: `${metaPageData.title}` },
        { itemprop: 'image', content: `${API_URL}/assets/${metaPageData.image}` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:title', content: `${metaPageData.title}` },
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
    this.pageData = this.$d.data;

    this.isMobile = window.innerWidth < 768;

    window.addEventListener('resize', (e) => {
      console.log(e);
      this.isMobile = window.innerWidth < 768;
    });

    setTimeout(() => {
      const el = document.querySelector('header');
      el.classList = [];
      el.classList.add('header', 'overlap-state-true', 'theme-dark');
    }, 50);

    const root = document.querySelector(':root');
    root.style.setProperty('--headerHeight', `${document.querySelector('header').clientHeight}px`);
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

.restrict {
  margin: 0 auto;
  padding-bottom: 100px;
  max-width: 1248px;
}
</style>
