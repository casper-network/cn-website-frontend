<template>
  <article>
    <div v-if="type === 'news'" class="img-container">
      <router-link :to="`/${$i18n.locale}/news/${postItemData.content[0].slug}`">
        <MediaImage
          :asset="postImage"
          width="500"
          height="250"
          loading="lazy"
        />
      </router-link>
    </div>
    <div v-if="type === 'casestudies'" class="img-container">
      <router-link :to="`/${$i18n.locale}/case-studies/${postItemData.slug}`">
        <MediaImage
          :asset="postImage"
          width="500"
          height="250"
          loading="lazy"
        />
      </router-link>
    </div>
    <div class="content" :class="`postType-${type}`">
      <div class="time" v-if="type === 'news'">
        <SVGClock />
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
import SVGClock from '@/assets/svg/icon-clock.svg?inline';
import MediaImage from '@/components/MediaImage.vue';

dayjs.extend(RelativeTime);

export default {
  name: 'PostItem',
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
        return this.postItemData.content[0].image;
      }
      return this.postItemData.image;
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

  &:first-of-type {
    border-top: 1px solid transparent;
  }
  &:last-of-type {
    border-bottom: 1px solid transparent;
  }

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
    font-size: 3.4568rem;
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
    height: auto;
    aspect-ratio: 16 / 8;

    @include breakpoint('sm') {
      width: 100%;
    }
  }

  div.time {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-weight: 300;
    font-size: 1.185rem;
    line-height: 24px;

    @include breakpoint('sm') {
      margin-bottom: 16px;
    }

    svg {
      margin-right: 13px;
      width: 48px;
      height: 48px;
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
      font-size: 3.4568rem;
      line-height: 1.1;

      @include breakpoint('sm') {
        font-size: var(--typography-h3-m-font-size);
      }
    }
  }

  div.tags {
    display: flex;
    margin: 15px 0;
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
