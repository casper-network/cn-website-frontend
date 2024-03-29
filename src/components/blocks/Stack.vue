<template>
  <div class="stack" :class="[variation]">
    <div class="container">
      <h2 class="h1" :data-slug="slugged">{{ title }}</h2>
      <div v-if="copy" class="copy" v-html="copy" />
      <div class="half">
        <div class="content">
          <ul v-if="items.length > 0">
            <li v-for="(item, idx) in items" :key="`item-${idx}`">
              <h3>{{ item.title }}</h3>
              <div v-html="item.content" />
            </li>
          </ul>
          <Button class="primary" v-if="hasButton">
            <router-link v-if="button.type === 'int'" :to="`/${$i18n.locale}${button.url}`">
              {{ button.text }}
            </router-link>
            <a v-if="button.type === 'ext'" :href="`${button.url}`" target="_blank">
              {{ button.text }}
            </a>
          </Button>
          <template v-if="hasButton && hasFile">
            &nbsp;
          </template>
          <Button class="primary" v-if="hasFile">
            <a :href="downloadLink(file.id)" target="_blank">{{file.text}}</a>
          </Button>
        </div>
        <div class="media">
          <MediaImage
            v-if="media"
            :asset="media"
          />
        </div>
      </div>
    </div >
  </div>
</template>

<script>
import config from '@/directus/config';
import slugify from 'slugify';
import MediaImage from '@/components/MediaImage.vue';

const { API_URL } = config;
export default {
  name: 'Stack.vue',
  components: { MediaImage },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    block: {
      type: Object,
      default: () => {},
    },
    button: {
      type: Object,
      default: null,
    },
    file: {
      type: Object,
      default: null,
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
    title() {
      return this.block?.title || null;
    },
    copy() {
      return this.block?.content || null;
    },
    variation() {
      return this.block?.variation || 'bow';
    },
    media() {
      const media = this.block?.media || [];
      if (media.length > 0) {
        return media[0];
      }
      return null;
    },
    items() {
      return this.block?.items || [];
    },
    hasFile() {
      const { file } = this;
      return file && file.id && file.text;
    },
    hasButton() {
      const { button } = this;
      return button && button.url && button.text;
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
    downloadLink(linkID) {
      return `${API_URL}/assets/${linkID}?download`;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss">
@import '~scss/mixins';
@import '~scss/variables';

.stack {
  & > .container {
    display: block;
    padding: 100px 30px;
    max-width: 1248px;

    @include breakpoint('sm') {
      padding-top: 60px;
      padding-left: 0;
      padding-right: 0;
      max-width: 100vw;
      overflow: hidden;

    }

    h2.h1 {
      margin-bottom: 30px;
      @include breakpoint('sm') {
        font-size: 3.375rem;
        padding-left: 20px;
        padding-right: 20px;
      }
    }

    .copy {
      margin-bottom: 30px;
    }

    p {
      font-weight: 300;
      padding-left: 20px;
      padding-right: 20px;
    }

    & > .half {
      display: flex;
      width: 100%;

      & > div {
        width: 50%;
        max-width: 50%;

        &.content {
          width: 33.33%;

          @include breakpoint('sm') {
            width: 50vw;
            min-width: 50vw;
            padding-left: 20px;
          }

          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;

            li {
              margin: 0;
              padding: 0;

              h3 {
                font-weight: 300;
                font-size: calc(var(--typography-h1-d-font-size) * 0.445);
                margin: 0 0 20px 0;
                padding: 0;
                line-height: .94;
              }
              & > div {
                margin: 0 0 20px 0;
                padding: 0;
                p {
                  margin: 0;
                  padding: 0;
                }
              }
            }
          }
        }

        &.media {
          position: relative;
          display: flex;
          justify-content: center;

          img {
            position: relative;
            left: 50%;
            transform: translate(-50%, 0);
            object-fit: contain;
            width: 100%;
            height: auto;
            aspect-ratio: 1;

            @include breakpoint('sm') {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-85px,-50%);
              max-width: 400px;
              min-width: 100vw;
              width: fit-content;
              height: auto;
            }
          }
        }
      }
    }
  }

  &.bow {
    background-color: var(--color-lighthouse);
    color: var(--color-black);

    & > .container {
      h2.h1 {
        color: var(--color-pelati);
      }
    }
  }

  &.wob {
    background-color: var(--color-black);
    color: var(--color-lighthouse);
    & > .container {
      & > .half {
        display: flex;
        justify-content: flex-end;
        flex-direction: row-reverse;

        @include breakpoint('sm') {
          flex-direction: column;

          & > div {
            &.content {
              padding-left: 20px;
              padding-right: 20px;
              width: calc(100% - 40px);
              min-width: auto;
              max-width: 100%;
            }
            &.media {
              width: 100%;
              max-width: 100%;
              max-height: 180px;
              img {
                position: relative;
                left: auto;
                top: auto;
                width: 100vw;
                height: 100%;
                max-height: none;
                max-width: none;
                transform: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
