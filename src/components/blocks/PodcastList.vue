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
            <img :src="`${API_URL}/assets/${service.image}`" :alt="service.title" />
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
          <img :src="pod.image" alt="">
          <SVGIconPlay />
        </a>
        <div class="content">
          <h4>{{ pod.title }}</h4>
          <div
            class="description"
            :class="{ open: pod.readmore }"
            v-html="pod.description"
          />
          <button class="more" @click="readMore(idx, pod.readmore)">
            {{ pod.readmore ? 'Read less' : 'Read more' }}
          </button>
        </div>
        <div class="release-date">
          <SVGClock />
          {{ pod.release_date | date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SVGIconPlay from '@/assets/svg/icon-play.svg?inline';
import SVGClock from '@/assets/svg/icon-clock.svg?inline';
import config from '@/directus/config';
import slugify from 'slugify';

const { API_URL } = config;

export default {
  name: 'PodcastList',
  components: {
    SVGIconPlay,
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
    API_URL() {
      return API_URL;
    },
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

    const locale = Intl.getCanonicalLocales(this.$i18n.locale);
    const { data } = await this.$d.api.get(`/podcasts?fields[]=url&fields[]=image&fields[]=release_date&fields[]=content.title,content.description&fields[]=status&filter[status][_eq]=published&filter[content][languages_code][_eq]=${locale}&limit=-1`);
    const podcasts = (data || []).map((o) => ({
      image: `${API_URL}/assets/${o.image}`,
      release_date: o.release_date,
      url: o.url,
      title: (o.content[0] || {}).title,
      description: (o.content[0] || {}).description,
      readmore: false,
    }));
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
    readMore(idx, open) {
      const podcasts = JSON.parse(JSON.stringify(this.podcasts));
      podcasts.forEach((pod) => {
        // eslint-disable-next-line no-param-reassign
        pod.readmore = false;
      });
      podcasts[idx].readmore = !open;
      this.podcasts = podcasts;
    },
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
     gap: 20px;

     & > .item {
       display: flex;
       border: 1px solid var(--color-grey-medium);
       padding: 20px;
       gap: 20px;

       @include breakpoint('sm') {
         flex-direction: column;
       }

       & > a.image {
         position: relative;
         display: block;
         width: 150px;
         height: 150px;
         min-width: 150px;
         max-width: 150px;

         @include breakpoint('sm') {
           width: 100%;
           height: 100%;
           aspect-ratio: 1;
           min-width: 100%;
           max-width: none;
         }

         & > img {
           width: 100%;
           height: 100%;
           object-fit: cover;
           aspect-ratio: 1;
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

       & > div.content {
         h4 {
           margin-bottom: 10px;
         }
         .description {
           display: -webkit-box;
           -webkit-line-clamp: 3;
           -webkit-box-orient: vertical;
           overflow: hidden;
           height: 85px;

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

         button.more {
           background: transparent;
           border: none;
           padding: 0;
           margin: 15px 0 0 0;
           font-size: inherit;
           font-family: inherit;
           font-weight: 500;
           letter-spacing: 2px;
           cursor: pointer;
           color: var(--color-blue);
         }
       }

       & > div.release-date {
         white-space: nowrap;
         svg {
           position: relative;
           top: 8px;
           margin-right: 8px;
           display: inline-block;
           width: 25px;
           height: 25px;
         }

         @include breakpoint('sm') {
           text-align: right;
         }
       }
     }
   }
}
</style>
