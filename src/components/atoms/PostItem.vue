<template>
  <article>
    <div v-if="type === 'news'" class="img-container">
      <router-link :to="`/${$i18n.locale}/news/${postItemData.content[0].slug}`"><img :src="postImage" loading="lazy" alt=""></router-link>
    </div>
    <div v-if="type === 'casestudies'" class="img-container">
      <router-link :to="`/${$i18n.locale}/case-studies/${postItemData.slug}`"><img :src="postImage" loading="lazy" alt=""></router-link>
    </div>
    <div class="content" :class="`postType-${type}`">
      <div class="time" v-if="type === 'news'">
        <SVGWatch />
        {{ getRelativeDate }}
      </div>
      <h3 v-if="type === 'news'">{{postItemData.content[0].title}}</h3>
      <h3 v-else>{{postItemData.title}}</h3>
      <p v-if="type === 'casestudies'">
        {{postItemData.description}}
      </p>
      <div class="tags" v-if="type === 'news' && categoryData">
        <Tag class="secondary" v-for="(tag, i) in postItemData.categories" :key="`tag-${i}`">
          <router-link :to="`/${$i18n.locale}/news/tag/${tag.categories_news_key}`">
            {{ (categoryData.find((category) => category.key === tag.categories_news_key) || {}).name || '' }}
          </router-link>
        </Tag>
      </div>
      <Button class="primary" icon="" v-if="type === 'news'">
        <router-link :to="`/${$i18n.locale}/news/${postItemData.content[0].slug}`">{{$t('ctas.readMore')}}</router-link>
      </Button>
      <Button class="primary" icon="" v-if="type === 'casestudies'">
        <router-link :to="`/${$i18n.locale}/case-studies/${postItemData.slug}`">{{$t('ctas.learnMore')}}</router-link>
      </Button>
    </div>
  </article>
</template>

<script>
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import SVGWatch from '@/assets/svg/watch.svg?inline';
import config from '@/directus/config';

const { API_URL } = config;

dayjs.extend(RelativeTime);

export default {
  name: 'PostItem',
  components: {
    SVGWatch,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    postItemData: Object,
    type: String,
    categoryData: {
      type: Array,
      default: () => [],
    },
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
    getRelativeDate() {
      return dayjs().to(this.postItemData.publish_date);
    },
    postImage() {
      if (this.type === 'news') {
        return `${API_URL}/assets/${this.postItemData.content[0].image}`;
      }
      return `${API_URL}/assets/${this.postItemData.image}`;
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
@import '@/assets/scss/mixins.scss';

article {
  display: flex;
  justify-content: flex-start;
  gap: 128px;
  padding: 80px 0;
  border-top: 1px solid var(--color-grey-light);
  border-bottom: 1px solid var(--color-grey-light);

  &:hover {
    .img-container {
      transform: translateX(16px);
      // animation: flash 0.45s;
    }
  }

  @include breakpoint('sm') {
    flex-direction: column;
    padding: 24px 0;
    gap: 24px;

    &:hover {
      .img-container {
        transform: none;
        animation: none;
      }
    }
  }

  h3 {
    font-weight: 300;
  }

  h3 ~ p {
    margin: 32px 0 64px 0;
    font-weight: 400;

    @include breakpoint('sm') {
      margin: 24px 0 24px;
    }
  }

  img {
    max-width: 500px;
    aspect-ratio: 16 / 8;
    border-radius: var(--border-radius-input);

    @include breakpoint('sm') {
      width: 100%;
    }
  }

  div.time {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #666;

    @include breakpoint('sm') {
      margin-bottom: 16px;
    }

    svg {
      margin-right: 8px;
      width: 17px;
      height: 17px;

      path {
        fill: #666;
      }
    }
  }

  div.content.postType-case {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  div.content.postType-news {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    h3 {
      font-size: 30px;

      @include breakpoint('sm') {
        font-size: var(--typography-h3-m-font-size);
      }
    }
  }

  div.tags {
    display: flex;
    margin: 32px 0;
    gap: 8px;

    @include breakpoint('sm') {
      margin: 20px 0 32px 0;
    }
  }

  .btn {
    @include breakpoint('sm') {
      float: right;
      align-self: flex-end;
    }
  }
}

.img-container {
  transition: transform 0.35s ease-in-out;

  img {
    object-fit: cover;
  }

  @include breakpoint('sm') {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@keyframes flash {
  25% { opacity: .3; }
  100% { opacity: 1;  }
}
</style>
