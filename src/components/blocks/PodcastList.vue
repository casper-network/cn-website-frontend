<template>
  <div class="podcast-list">
    <template v-if="title">
      <h1 v-if="setAsH1" class="h1" v-html="title" :data-slug="slugged" />
      <h2 v-else class="h1" v-html="title" :data-slug="slugged" />
    </template>
    <template v-if="content">
      <p class="copy" v-html="content" />
    </template>
    <template v-if="services">
      <div class="services">
        <p>Available on:</p>
        <div>
          <a v-for="(service, sidx) in services" :key="`service-${sidx}`" target="_blank" :href="service.url" :title="service.title">
            <MediaImage :asset="service.image" :alt="service.title" width="64" height="64" />
          </a>
        </div>
      </div>
    </template>
    <div class="items">
      <div
        v-for="(pod, idx) in podcasts"
        :key="`podcast-${idx}`"
        class="item"
      >
        <a class="image" target="_blank" :href="pod.url">
          <MediaImage :asset="pod.image" width="300" height="300"/>
        </a>

        <div class="content">
          <div class="release-date">
            <SVGClock />
            {{ pod.release_date | date }}
          </div>

          <h3>{{ pod.title }}</h3>

          <div
            class="description"
            :class="{ open: pod.readmore }"
            v-html="pod.description"
          />
          <template v-if="pod.internal_url">
            <router-link class="btn-more" :to="pod.url">{{ $t('ctas.more') }}</router-link>
          </template>
          <template v-else>
            <a class="btn-more" :href="pod.url" target="_blank">{{ $t('ctas.more') }}</a>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SVGClock from '@/assets/svg/icon-clock.svg?inline';
import MediaImage from '@/components/MediaImage.vue';
import slugify from 'slugify';

export default {
  name: 'PodcastList',
  components: {
    MediaImage,
    SVGClock,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    title: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    services: {
      type: Array,
      default: null,
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      setAsH1: false,
      podcasts: null,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    slugged() {
      const title = (this.title || '').replace(/<\/?[^>]+(>|$)/g, '');
      return slugify(title, { lower: true, strict: true });
    },
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
  },
  //---------------------------------------------------
  //
  //  Filter Properties
  //
  //---------------------------------------------------
  filters: {
    date(value) {
      const date = new Date(value);
      return date.toLocaleDateString();
    },
  },
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
  async mounted() {
    const h1 = document.querySelector('h1');
    if (!h1 && window.h1Set !== true) {
      this.setAsH1 = true;
      window.h1Set = true;
    }

    const siteLocale = this.$i18n.locale;
    const locale = Intl.getCanonicalLocales(siteLocale);
    const { data } = await this.$d.api.get(`/podcasts?fields[]=url&fields[]=image&fields[]=release_date&fields[]=content.title,content.description,content.slug&fields[]=status&filter[status][_eq]=published&filter[content][languages_code][_eq]=${locale}&limit=-1`);
    const podcasts = (data || []).map((o) => {
      const slug = (o.content[0] || {}).slug ?? null;
      const siteUrl = `/${siteLocale}/lp/podcast`;
      return {
        image: o.image,
        release_date: o.release_date,
        url: slug !== null ? `${siteUrl}/${slug}` : o.url,
        internal_url: slug !== null,
        title: (o.content[0] || {}).title,
        description: (o.content[0] || {}).description,
        readmore: false,
      };
    });
    this.podcasts = podcasts.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
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
    /*
    readMore(idx, open) {
      const podcasts = JSON.parse(JSON.stringify(this.podcasts));
      podcasts.forEach((pod) => {
        // eslint-disable-next-line no-param-reassign
        pod.readmore = false;
      });
      podcasts[idx].readmore = !open;
      this.podcasts = podcasts;
    },
    */
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';

.podcast-list {
  margin: 0 auto;
  max-width: 1248px;
  padding: 30px;

  @include breakpoint('sm') {
    padding: 20px;
  }

  ::v-deep {
    p, span {
      font-size: 19.85px !important;
      line-height: 1.5 !important;
      letter-spacing: 2px !important;
      font-weight: 300 !important;
    }
    a {
      font-family: inherit !important;
      font-size: inherit !important;
      color: var(--color-blue);
      text-decoration: underline !important;
    }
  }

  & > .copy {
    margin-bottom: 32px;
  }

  & > .services {
    text-align: right;

    @include breakpoint('sm') {
      text-align: center;
    }

    ::v-deep {
      & > p {
        font-size: 2.4rem !important;

        @include breakpoint('sm') {
          font-size: 1.8rem !important;
        }
      }
    }

    & > div {
      display: inline-flex;
      gap: 32px;
      margin-top: 6px;
      margin-bottom: 64px;

      & > a {
        width: 64px;
        height: 64px;

        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      @include breakpoint('sm') {
        margin-bottom: 32px;

        & > a {
          width: 42px;
          height: 42px;
        }

      }
    }
  }

   & > .items {
     display: flex;
     flex-direction: column;
     gap: 160px;

     @include breakpoint('m') {
       gap: 80px;
     }

     @include breakpoint('sm') {
       margin-top: 60px;
       gap: 80px;
     }

     & > .item {
       display: flex;
       gap: 128px;

       @include breakpoint('m') {
         gap: 64px;
       }

       @include breakpoint('sm') {
         gap: 40px;
       }

       @include breakpoint('s') {
         flex-direction: column;
         gap: 10px;
       }

       & > a.image {
         position: relative;
         display: block;
         flex: 0;
         width: 300px;
         height: 300px;
         padding-top: 10px;

         @include breakpoint('sm') {
           width: 250px;
           height: 250px;
         }

         @include breakpoint('s') {
           width: 100%;
           height: auto;
         }

         & > img {
           width: inherit;
           height: inherit;
           object-fit: cover;
         }

         & > svg {
           position: absolute;
           left: 50%;
           top: 50%;
           transform: translate(-50%, -50%);

           @include breakpoint('sm') {
             width: 90px;
           }
         }
       }

       & > .content {
         display: block;
         text-decoration: none !important;
         line-height: normal;
         color: inherit;

         & > div.release-date {
           width: 100%;
           text-align: left;
           white-space: nowrap;
           margin-bottom: 20px;
           svg {
             position: relative;
             top: 8px;
             margin-right: 8px;
             display: inline-block;
             width: 25px;
             height: 25px;
           }
         }

         h3 {
           margin-bottom: 10px;
           line-height: 1.1;
         }
         .description {
           display: -webkit-box;
           -webkit-line-clamp: 3;
           -webkit-box-orient: vertical;
           overflow: hidden;
           height: 85px;
           margin-bottom: 20px;

           &.open {
             overflow: visible;
             display: block;
             height: auto;

             ::v-deep {
               p {
                 padding-bottom: 15px;
               }
             }
           }

           ::v-deep {
             p, span {
               font-size: 19.85px !important;
               line-height: 1.5 !important;
               letter-spacing: 2px !important;
               font-weight: 300 !important;
             }
             a {
               font-family: inherit !important;
               font-size: inherit !important;
               color: var(--color-blue);
               text-decoration: underline !important;
             }
             p {
               padding-bottom: 0;
             }
           }
         }

         .btn-more {
           flex-direction: row;
           justify-content: center;
           align-items: center;
           cursor: pointer;
           margin: 0;
           text-align: center;
           vertical-align: middle;
           white-space: nowrap;
           width: auto;
           background-color: var(--color-atomic-lime);
           border: 2px solid var(--color-atomic-lime);
           color: var(--color-black);
           transition: all 0.15s ease;
           display: inline-flex;
           padding: 10px 30px 14px;
           font-weight: 500;
           font-size: 18px !important;
           text-decoration: none !important;
           line-height: 24px;

           &:hover {
             background-color: var(--color-black);
             color: var(--color-atomic-lime);
           }

           @include breakpoint('s') {
             float: right;
           }
         }
       }
     }
   }
}
</style>
