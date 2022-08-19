<template>
  <div>
    <Hero type="reduced single" v-if="pageData.page_blocks"
          :block="pageData.page_blocks[0]"
          :block-title="pageData.page_blocks[0].title"
          :block-content="pageData.page_blocks[0].content">
    <FormNewsletter></FormNewsletter>
    </Hero>
  </div>
</template>

<script>
import Hero from '@/components/blocks/Hero.vue';

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
        { property: 'og:title', content: `${metaPageData.title}` },
        { itemprop: 'name', content: `${metaPageData.title}` },
        { itemprop: 'description', content: `${metaPageData.description}` },
        { itemprop: 'image', content: `${process.env.VUE_APP_API_URL}/${metaPageData.image}` },
        { name: 'twitter:card', content: `${process.env.VUE_APP_API_URL}/${metaPageData.image}` },
        { property: 'og:site_name', content: window.location.hostname },
        { property: 'og:description', content: metaPageData.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: `${process.env.VUE_APP_API_URL}/${metaPageData.image}` },
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

    if (document.querySelector('.hero')) {
      this.$store.commit('changeNavigationTintState', 'light');
    } else {
      this.$store.commit('changeNavigationTintState', 'dark');
    }

    setTimeout(() => {
      const el = document.querySelector('header');
      el.classList = [];
      el.classList.add('header', 'overlap-state-true', 'theme-light');
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
</style>
