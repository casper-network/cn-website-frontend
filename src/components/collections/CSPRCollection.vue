<template>
  <div class="container">
    <div class="collection-head">
      <h2 v-if="title" v-html="title" class="h1"/>
    </div>
    <div class="collection-items">
      <a class="item" v-for="(item, i) in items" :key="`item-${i}`" :href="item.url" target="_blank">
        <img :src="`${API_URL}/assets/${item.image}`" :alt="item.name"/>
        <div class="overlay">
          <Button class="secondary link" icon="link">
            <a :href="item.url" target="_blank">
              <span>{{ item.name }}</span>
            </a>
          </Button>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import i18n from '@/i18n';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'ItemNews',
  components: {
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    blockData: {
      type: Object,
      default: () => ({}),
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      items: [],
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
    title() {
      return this.blockData?.title || null;
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
  async mounted() {
    this.items = await this.getData();
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
    async getData() {
      const collection = this.blockData?.collection || null;
      if (collection) {
        try {
          const [locale] = Intl.getCanonicalLocales(i18n.locale);
          const response = await axios.get(`${API_URL}/items/cspr_platforms?filter[status][_eq]=published&filter[content][languages_code][_eq]=${locale}&fields=*.*&limit=-1`);
          let data = response?.data?.data || [];
          if (collection.type) {
            data = data.filter((o) => o.type.includes(collection.type));
          }
          return data.map((o) => {
            const item = o.content[0];
            return { image: item.image, name: item.name, url: item.url };
          });
        } catch (err) {
          console.error(err);
        }
      }
      return null;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';

div.container {
  flex-direction: column;
  padding-top: 160px;
  padding-bottom: 100px;

  .collection-head {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    @include breakpoint('sm') {
      h2 { margin-bottom: 40px; }
    }
  }

  .collection-items {
    width: calc(100% + 32px);
    margin-left: -16px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;

    & > .item {
      position: relative;
      background-color: white;
      width: calc(20% - 52px);
      box-shadow: 0 0 8px -2px rgba(0, 0, 0, .25);
      padding: 16px;
      display: flex;
      justify-content: center;
      align-items: center;

      @include breakpoint('sm') {
        width: calc(50% - 52px);
      }

      img {
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        object-fit: contain;
      }

      & > .overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, .65);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.16s linear;

        & > .btn {
          position: relative;
          transform: translate(0, 10px);
          transition: transform 0.12s linear;
          flex-grow: 0;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 156px;
          border-color: black;

          & > a {
            position: relative;
            top: 2px;
          }
        }
      }

      &:hover > .overlay {
        opacity: 1;

        & > .btn {
          transform: translate(0, 0);
          &:hover {
            border-color: var(--color-atomic-lime);
          }
        }
      }
    }
  }

  ::v-deep {
    .btn.secondary.link {
      svg path {
        fill: currentColor;
      }
    }
  }
}
</style>
