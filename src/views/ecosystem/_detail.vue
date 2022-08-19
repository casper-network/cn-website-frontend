<template>
  <div>
    <article>
      <header>
        <div class="container">
          <img :src="logoImage" alt="">
          <div class="application-head">
            <h1>{{pageData.data.title}}</h1>
            <p>{{ $t('general.by') }} <span>{{ pageData.data.company }}</span></p>
            <div class="buttons">
              <Button class="secondary" icon="share">
                <a href="#" target="_blank">{{ $t('ctas.share') }}</a>
              </Button>
              <Button class="primary" icon="">
                <a :href="pageData.data.url" target="_blank">{{ $t('ctas.visitSite') }}</a>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main class="container">
        <div class="tags">
          <Tag class="secondary" v-for="(tag, i) in pageData.categories" :key="`tag-${i}`">
            {{ tag.categories_applications_key }}
          </Tag>
        </div>
        <div class="introduction">
          <p>The Casper Network is the first live proof-of-stake blockchain built off the Casper CBC
            specification. Casper is designed to accelerate enterprise and developer adoption of
            blockchain technology today and evolve to meet user needs in the future.</p>
        </div>
        <div class="detail">
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. </p>
        </div>
      </main>
      <section class=" related" v-if="relatedApplications.length > 0">
        <RelatedApplications :related-applications="relatedApplications"></RelatedApplications>
      </section>
    </article>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue';
import Tag from '@/components/atoms/Tag.vue';
import RelatedApplications from '@/components/collections/RelatedApplications.vue';

export default {
  name: 'detail.vue',
  components: {
    Button,
    Tag,
    RelatedApplications,
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
      pageData: {
        data: {},
        categories: {},
      },
      relatedApplications: [],
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    cardImage() {
      return process.env.VUE_APP_ASSET_URL + this.pageData.data.image;
    },
    logoImage() {
      return process.env.VUE_APP_ASSET_URL + this.pageData.data.logo;
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
  mounted() {
    this.pageData = this.$d.data;
    this.categories = this.$d.categories;
    this.getRelatedApplications();
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
    async getRelatedApplications() {
      const relatedAPIURL = '/applications?filter[content][languages_code][_eq]=VAR_LOCALE&filter[categories][categories_applications_key][_eq]=VAR_CATEGORY&fields=*.*&limit=-1';
      let requestAPIEndpoint = relatedAPIURL.replace('VAR_LOCALE', Intl.getCanonicalLocales(this.$i18n.locale));
      requestAPIEndpoint = requestAPIEndpoint.replace('VAR_CATEGORY', this.pageData.categories[0].categories_applications_key);
      const res = await this.$d.api.get(requestAPIEndpoint);
      const currentIndex = res.data.findIndex((object) => object.id === this.pageData.data.id);
      res.data.splice(currentIndex, 1);
      this.relatedApplications = res.data.sort(() => ((Math.random() > 0.5) ? 1 : -1)).slice(1, 3);
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

article {
  width: 100%;
  padding-top: 110px;

  header {
    background: var(--color-grey-light);

    .container {
      gap: 32px;
      padding: 48px 20px;

      @include breakpoint('sm') {
        flex-direction: column;
        padding: 48px 20px 32px;
      }

      img {
        flex: 1 0 23%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      > div {
        flex: 1 0 60%;

        h1 {
          margin-bottom: 24px;
        }

        p {
          margin-bottom: 24px;

          span {
            font-weight: 600;
          }
        }

        .buttons {
          display: flex;
          gap: 15px;
        }
      }
    }
  }

  main {
    &.container {
      flex-direction: column;
      padding: 110px 20px;

      @include breakpoint('sm') {
        padding: 42px 20px;
      }
    }

    border-bottom: 1px solid var(--color-grey-light);

    div.tags {
      display: flex;
      gap: 8px;
    }

    div.introduction {
      font-weight: 600;
      margin-top: 42px;
      margin-bottom: 80px;
    }
  }

  section.related {
  }
}
</style>
