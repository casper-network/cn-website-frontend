<template>
  <div class="article-nav-bar outer-wrap" v-if="anchorTags && anchorTags.length > 0">
    <div class="container">
      <ul v-if="anchorTags">
        <li v-for="(tag, i) in anchorTags" :key="`anchor-tag-${i}`" class="deepLinkNav dl-nav-item" :id="`anc-${slugged(tag)}`">
          <a :href="`#${slugged(tag)}`" @click.prevent="jumpToAnchor(`#${slugged(tag)}`)">{{ anchorLabels[i].innerText }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleDeepLinkBar',
  components: {},
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
      anchorTags: Array,
      anchorLabels: Array,
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
    this.refresh();
  },
  // beforeUpdate() {},
  // updated() {},
  beforeDestroy() {
    window.removeEventListener('scroll', this.navHighlighter);
  },
  // destroyed() {},
  //---------------------------------------------------
  //
  //  Methods
  //
  //---------------------------------------------------
  methods: {
    refresh() {
      window.removeEventListener('scroll', this.navHighlighter);
      this.$nextTick(() => {
        this.getAnchorHeadings();
        window.addEventListener('scroll', this.navHighlighter);
      });
    },
    jumpToAnchor(tag) {
      const el = document.querySelector(tag);
      el.scrollIntoView();
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
    getAnchorHeadings() {
      const sections = document.querySelectorAll('main section .container');
      const headings = document.querySelectorAll('main h2');
      this.anchorTags = Array.from(sections)
        .filter((n) => n.id !== '');
      this.anchorLabels = Array.from(headings)
        .filter((n) => n.innerText !== '');
    },
    slugged(tag) {
      return tag.id.toLowerCase()
        .replace(/\s/g, '-')
        .replace(/(<([^>]+)>)/ig, '')
        .replace(/[~`!@#$%^&*()+={}[\];:'"<>.,/\\?]/g, '');
    },
    navHighlighter() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const sections = document.querySelectorAll('main div[id]');

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');

        if (sectionId) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.deepLinkNav a[href*=${sectionId}]`)
              .classList
              .add('active');

            const positionOffsetX = document.querySelector(`.deepLinkNav a[href*=${sectionId}]`).offsetLeft;
            document.querySelector('.outer-wrap ul').scrollLeft = `${positionOffsetX}`;
          } else {
            document.querySelector(`.deepLinkNav a[href*=${sectionId}]`)
              .classList
              .remove('active');
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';

.outer-wrap {
  border-bottom: 1px solid var(--color-grey-dark);
  position: sticky;
  top: 0;
  z-index: 9999;
  background: white;
  width: 100%;
  height: 56px;
}

div.container {
  margin-top: 0;
  padding-top: 0 !important;
  overflow: hidden;

  ul {
    padding-left: 0;
    list-style: none;
    display: flex;
    overflow-x: scroll;
    width: 9000px;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      margin-right: 32px;

      a {
        white-space: nowrap;

        &:hover {
          color: var(--color-blue);
        }

        &.active {
          color: var(--color-blue);
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
