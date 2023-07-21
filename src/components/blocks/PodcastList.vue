<template>
  <div class="podcast-list">
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
    formId: {
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
    return {
      podcasts: null,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
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
    const locale = Intl.getCanonicalLocales(this.$i18n.locale);
    const { data } = await this.$d.api.get(`/podcasts?fields[]=url&fields[]=image&fields[]=release_date&fields[]=content.title,content.description&fields[]=status&filter[status][_eq]=published&filter[content][languages_code][_eq]=${locale}&limit=-1`);
    this.podcasts = (data || []).map((o) => ({
      image: `${API_URL}/assets/${o.image}`,
      release_date: o.release_date,
      url: o.url,
      title: (o.content[0] || {}).title,
      description: (o.content[0] || {}).description,
      readmore: false,
    }));
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

           &.open {
             overflow: visible;
             display: block;

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
