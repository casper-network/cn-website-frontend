<template>
  <div class="search-bar">
    <div class="container -long">
      <ul v-if="categories && $d.clientWidth > 768">
        <li :key="`tag-all`">
          <router-link :to="`/${$i18n.locale}/${type.toLowerCase()}`">
            {{ $t('general.overview') }}
          </router-link>
        </li>
        <li v-for="(tag, i) in topCategories" :key="`tag1-${i}`">
          <router-link :to="`/${$i18n.locale}/${type.toLowerCase()}/tag/${tag.key}`" :class="{'active': $route.params.category === tag.name}">
            {{ tag.name }}
          </router-link>
        </li>
        <li class="has-children" tabindex="-1" v-if="allOtherCategories.length > 0">
          <a>More <SVGChevronDown /></a>
          <ul>
            <li v-for="(tag, j) in allOtherCategories" :key="`tag2-${j}`">
              <router-link :to="`/${$i18n.locale}/${type.toLowerCase()}/tag/${tag.key}`" :class="{'active': $route.params.category === tag.name}">
                {{ tag.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <ul v-if="categories && $d.clientWidth <= 768">
        <li :key="`tag-all`">
          <router-link :to="`/${$i18n.locale}/${type.toLowerCase()}`">
            {{ $t('general.overview') }}
          </router-link>
        </li>
        <li v-for="(tag, i) in topCategories" :key="`tag3-${i}`">
          <router-link :to="`/${$i18n.locale}/${type.toLowerCase()}/tag/${tag.key}`" :class="{'active': $route.params.category === tag.name}">
            {{ tag.name }}
          </router-link>
        </li>
        <li v-for="(tag, j) in allOtherCategories" :key="`tag4-${j}`">
          <router-link :to="`/${$i18n.locale}/${type.toLowerCase()}/tag/${tag.key}`" :class="{'active': $route.params.category === tag.name}">
            {{ tag.name }}
          </router-link>
        </li>
      </ul>
      <SearchInput :type="type" class="searchbox" @search="forwardSearchEvent"></SearchInput>
    </div>
  </div>
</template>

<script>
import SVGChevronDown from '@/assets/svg/icon-chevron-down.svg?inline';
import axios from 'axios';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'SearchBar',
  components: {
    SVGChevronDown,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    type: String,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      categories: [],
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    topCategories() {
      return this.categories.slice(0, 5);
    },
    allOtherCategories() {
      return this.categories.slice(5, this.categories.length);
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
    this.getAllCategories();
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
    async getAllCategories() {
      let res = {};
      switch (this.type) {
        case 'News':
          res = await axios.get(`${API_URL}/cce/categories?locale=en-US&collection=news`);
          break;
        case 'ecosystem':
        default:
          res = await axios.get(`${API_URL}/cce/categories?locale=en-US&collection=applications`);
      }
      this.categories = res.data;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
    forwardSearchEvent(val) {
      if (val === '') {
        this.$emit('search', null);
      } else {
        const searchContainer = (this.type === 'News') ? 'news' : 'applications';
        axios.get(`${API_URL}/cce/search?collection=${searchContainer}&locale=${Intl.getCanonicalLocales(this.$i18n.locale)}&q=${val}`).then((resp) => {
          this.$emit('search', [resp.data.data, val]);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

div.search-bar {
  padding: 30px 0;
  width: 100%;
  max-width: 1506px;
  margin: 0 auto;
  border-top: 1px solid var(--color-grey-dark);
  border-bottom: 1px solid var(--color-grey-dark);

  div.container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 0 30px;
    align-items: center;
    overflow: visible;

    &.-long {
      padding-left: 20px;
    }

    @include breakpoint('sm') {
      flex-direction: column;
      gap: 26px;

      &.-long {
        padding: 0;
      }
    }

    ul {
      padding-left: 0;
      margin-left: 0;
      display: flex;
      width: 100%;

      @include breakpoint('sm') {
        order: 2;
        overflow-x: scroll;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;
        padding: 0 15px;
        max-width: calc(100% - 30px);
      }

      &::-webkit-scrollbar {
        display: none;
      }

      li {
        list-style: none;
        margin-right: 24px;

        white-space: nowrap;

        &:last-child {
          margin-right: 0;
        }

        a {
          &:hover {
            color: var(--color-sky-dancer);
          }

          &.router-link-exact-active {
            color: var(--color-sky-dancer);
          }
        }
      }
    }

    .has-children {
      position: relative;
      cursor: pointer;
      outline: 0;

      & > a > svg {
        transform: scale(0.8) translate(0, -1px);
      }

      ul {
        &:before {
          content: '';
          position: absolute;
          background: transparent;
          top: -24px;
          left: 0;
          right: 0;
          height: 24px;
        }

        position: absolute;
        opacity: 0;
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        padding-top: 0;
        top: -10px;
        left: -30px;
        z-index: 999;
        min-width: 180px;
        width: auto;

        @include breakpoint('sm') {
          position: relative;

          &:after,
          &:before {
            display: none;
          }
        }

        transition: all 0.35s ease-in;
        transform: translateY(50px);

        li {
          padding: 10px 29px;
          border-bottom: 1px solid var(--color-grey-light);
          color: var(--color-black);
          opacity: 0;
          background: white;
          width: calc(100% - 58px);

          @for $x from 0 through 10 {
            &:nth-child(#{$x}) {
              animation-delay: 75ms * ($x - 1);
            }
          }
        }
      }

      &:focus-within {
        ul {
          opacity: 1;
          pointer-events: all;
          transform: translateY(50px);

          @include breakpoint('sm') {
            transform: translateY(0);
          }

          li {
            animation: fade-in 300ms ease forwards;
          }
        }

        color: var(--color-sky-dancer);

        svg path {
          stroke: var(--color-sky-dancer);
        }
      }
    }

    @include breakpoint('sm') {
      .searchbox {
        order: 1;
        width: 100%;
      }
    }
  }
}
</style>
