<template>
  <header
    class="header"
    :class="`overlap-state-${overlapState} navbar-state-${showNavigation} theme-${themeState}`"
  >
    <div class="container -long">
      <SVGLogo class="logo" @click="goHome()"/>
      <nav v-if="!hideNavigation">
        <ul>
          <li
            class="nav-item"
            :class="(item.class) ? item.class : ''"
            v-for="(item, index) in computedNavigation" :key="`navitem-${index}`"
            :data-has-sub="!!(item.children)"
          >
            <div v-if="item.url && !item.children">
              <router-link @click.native="toggleNavigation" :to="item.url">
                <span>{{ item.label }}</span>
                <ChevronFuckedUp
                  v-if="item.children" @click.native="toggleChildren"
                  class="dropdown"
                />
              </router-link>
            </div>
            <div v-if="item.url && item.children">
              <a @click.prevent.stop="handleSpecialNavigation" :data-to="item.url" :href="item.url">
                <span>{{ item.label }}</span>
                <ChevronFuckedUp
                  v-if="item.children" @click.native="toggleChildren"
                  class="dropdown"
                />
              </a>
            </div>
            <div v-else-if="!item.url">
              <a class="curs-point" @click="toggleChildren">
                <span>{{ item.label }}</span>
                <ChevronFuckedUp
                  v-if="item.children" @click.native="toggleChildren"
                  class="dropdown"
                />
              </a>
            </div>
            <ul class="nav-item-children" v-if="item.children">
              <li v-for="(subItem, index) in item.children"
                  class="nav-item"
                  :class="[subItem.type]"
                  :key="`subnav-item-${index}`">
                <div v-if="subItem.type === 'ext'">
                  <SVGCurvedArrow/>
                  <a @click="toggleNavigation" :href="subItem.url" v-if="subItem" target="_blank">
                    <span>{{ subItem.label }}</span>
                  </a>
                </div>
                <div v-if="subItem.type === 'int'">
                  <SVGRightArrow/>
                  <router-link @click="toggleNavigation" :to="subItem.url" v-if="subItem">
                    <span>{{ subItem.label }}</span>
                  </router-link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div v-if="!hideNavigation" class="nav-button" @click="toggleNavigation()">
        <SVGBurger/>
      </div>
    </div>
  </header>
</template>

<script>
import SVGLogo from '@/assets/svg/logo.svg?inline';
import SVGBurger from '@/assets/svg/icon-burger.svg?inline';
import SVGCurvedArrow from '@/assets/svg/icon-arrow-curved-right.svg?inline';
import SVGRightArrow from '@/assets/svg/icon-arrow-right.svg?inline';

export default {
  name: 'Header',
  components: {
    SVGLogo,
    SVGBurger,
    SVGRightArrow,
    SVGCurvedArrow,
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
      hideNavigation: false,

      pageThemeState: null,
      showNavigation: true,
      themeState: 'light',
      overlapState: true,
      scroll: {
        top: 0,
        value: 0,
        offset: 80,
      },
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    computedNavigation() {
      let navigation = this.$store.state.navigations?.main_navigation || [];
      navigation.forEach((o) => {
        if (o.url) {
          // eslint-disable-next-line no-param-reassign
          o.type = o.url.includes('http') ? 'ext' : 'int';
        }
        if (o.children) {
          o.children.forEach((oo) => {
            if (oo.url) {
              // eslint-disable-next-line no-param-reassign
              oo.type = oo.url.includes('http') ? 'ext' : 'int';
            }
          });
        }
      });

      const path = 'navigation';
      if (this.$i18n.te(path)) {
        navigation = navigation.concat(this.$i18n.t(path));
      }
      return navigation;
    },
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
    $route() {
      const navButton = document.querySelector('.nav-button');
      if (navButton && navButton.classList.contains('open')) {
        this.toggleNavigation();
      }

      this.updateTheme();

      this.testForCountryPage();
      this.showNavigation = true;
    },
  },
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
  async created() {
    const [locale] = Intl.getCanonicalLocales(this.$i18n.locale);
    const response = await this.$d.api.get(`/navigations?filter[content][languages_code][_eq]=${locale}&fields=*.main_navigation,*.footer_navigation`);
    // eslint-disable-next-line prefer-destructuring
    this.$store.state.navigations = (response?.data.content || [])[0];
  },
  // beforeMount() {},
  // render(h) { return h(); },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.testForCountryPage();
  },
  // beforeUpdate() {},
  /* updated() {

  }, */
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  // destroyed() {},
  methods: {
    testForCountryPage() {
      const { hostname } = window.location;
      this.hideNavigation = /^[a-zA-Z]{2}.casper.network/.test(hostname) || /^[a-zA-Z]{2}.staging.casper.network/.test(hostname);
    },
    goHome() {
      if (this.hideNavigation) {
        window.location.href = 'https://casper.network/en-us/';
      } else {
        this.$router.push(`/${this.$i18n.locale}/`);
      }
    },
    toggleChildren(evt) {
      if (this.$d.clientWidth <= 1241) {
        const els = this.$el.querySelectorAll('.nav-item.hover');
        els.forEach((el) => {
          if (el !== evt.currentTarget.parentNode.parentNode) {
            el.classList.remove('hover');
          }
        });
        evt.currentTarget.parentNode.parentNode.classList.toggle('hover');
        evt.currentTarget.parentNode.classList.toggle('hover');
      }
    },

    toggleNavigation() {
      this.$store.state.isMobileNavigationOpen = !this.$store.state.isMobileNavigationOpen;
      if (!this.$store.state.isMobileNavigationOpen) {
        const els = this.$el.querySelectorAll('.nav-item.hover');
        els.forEach((el) => {
          el.classList.remove('hover');
        });
      }

      document.querySelector('.nav-button').classList.toggle('open');
      document.querySelector('header nav').classList.toggle('open');
      document.querySelector('body').classList.toggle('no-scroll');
    },

    updateTheme() {
      this.$nextTick(() => {
        const div = document.querySelector('main > section > div');
        const bgColor = div?.style.backgroundColor || 'transparent';
        this.pageThemeState = (bgColor === 'transparent') ? 'dark' : 'light';
        this.themeState = this.pageThemeState;
      });
    },

    handleSpecialNavigation(evt) {
      const { currentTarget, target } = evt;
      evt.preventDefault();
      evt.stopPropagation();
      if (this.$d.clientWidth <= 1180) {
        if (target.nodeName !== 'SPAN') {
          this.toggleChildren(evt);
        } else {
          this.toggleNavigation();
          this.$router.push(currentTarget.dataset.to);
        }
      } else {
        this.$router.push(currentTarget.dataset.to);
      }
    },

    handleScroll() {
      const { top, offset } = this.scroll;
      const doc = document.documentElement;
      const { scrollTop } = doc;
      if (scrollTop >= 0 && scrollTop + window.innerHeight < doc.scrollHeight) {
        this.scroll.top = scrollTop;
        let value = this.scroll.value + (scrollTop - top);
        if (value >= offset) {
          this.overlapState = false;
          this.themeState = 'dark';
          this.showNavigation = false;
          value = offset;
        } else if (value <= 0) {
          value = 0;
          this.showNavigation = true;
        }

        if (scrollTop < offset) {
          this.overlapState = true;
          this.themeState = this.pageThemeState;
        }
        this.scroll.value = value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';

header {
  padding: 20px 0;
  z-index: 999999;
  position: fixed;
  width: 100%;
  top: 0;
  transition: top 0.65s ease-in-out, background 0.35s ease-in-out;

  &.navbar-state-false {
    top: -130px;
  }

  &.overlap-state-false {
    background: var(--color-lighthouse);
  }

  &.overlap-state-true {
    background: transparent;
  }

  div.container.-long {
    align-items: center;
  }

  svg.logo {
    min-width: 159px;
    max-width: 159px;
    cursor: pointer;

    path {
      transition: fill 0.65s ease, stroke 0.65s ease;
    }

    @include breakpoint(1241) {
      max-width: 120px;
      min-width: 120px;
    }
  }

  &.theme-light {
    svg.logo {
    }

    .nav-item {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      color: var(--color-lighthouse);

      @include breakpoint('spl') {
        color: var(--color-sky-dancer);
      }

     > div {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        div {
          margin-left: 8px;
        }
      }

      svg {
        transition: all 0.35s ease-in-out;
      }

      a {
        display: flex;
        font-weight: 500;
        letter-spacing: 0.3px;
      }

      @media (max-width: 1241px) {
        flex-direction: column;

        > div {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }

        ul {
          height: 0;
          overflow: hidden;
        }
      }

      &.hover {
        @media (max-width: 1241px) {
          ul {
            height: auto;
          }
        }
      }

      @media (hover) {
        :hover {
          > a {
            color: rgba(255, 255, 255, 0.8);

            @include breakpoint('spl') {
              color: var(--color-sky-dancer);
            }
          }

          @media (max-width: 1241px) {
            ul {
              height: auto;
            }
          }

          svg {
            transform: rotate(-180deg);
            path {
              stroke: var(--color-sky-dancer);
            }
          }
        }
      }

      &.special {
        border: 2px solid var(--color-atomic-lime);
        background-color: var(--color-atomic-lime);
        padding: 6px 15px;
        transition: all 0.15s ease;

        a {
          color: var(--color-black);
          &.router-link-active {
            color: var(--color-black);
          }
        }

        @media (max-width: 1241px) {
          border: 0;
        }

        @media (hover) {
          &:hover {
            background: var(--color-black);
            color: var(--color-atomic-lime) !important;

            div,
            a {
              color: var(--color-atomic-lime) !important;
            }
          }
        }
      }
    }

    .nav-item-children {
      background: white;

      .nav-item {
        color: #000;
        padding: 0;
        width: 100%;

        @include breakpoint('spl') {
          color: var(--color-sky-dancer);
        }

        a {
          padding: 13px 26px 13px 0;
        }

        > div {
          justify-content: flex-start;

          span {
            display: inline-block;
            transform: translateX(-19px);
            transition: all 0.35s ease-in-out;
          }
        }

        @media (max-width: 1241px) {
          padding: 0;

          > div {
            width: 100%;
            flex-direction: row;
            display: flex;
            align-items: center;
          }
        }

        svg {
          width: 18px;
          height: 15px;
          display: inline-block;
          margin-left: 19px;
          opacity: 0;
          transition: all 0.35s ease-in-out;
          transform: rotate(0);

          path {
            fill: var(--color-sky-dancer);
          }
        }

        &.ext svg {
          position: relative;
          top: 2px;
        }

        &.hover {
          background: var(--color-grey-light) !important;

          svg {
            opacity: 1;
            margin-right: 0;
          }

          span {
            display: inline-block;
            transform: translateX(9px);
            color: var(--color-sky-dancer);
          }
        }

        @media (hover) {
          &:hover {
            background: var(--color-grey-light) !important;

            svg {
              opacity: 1;
              margin-right: 0;
            }

            span {
              display: inline-block;
              transform: translateX(9px);
              color: var(--color-sky-dancer);
            }
          }
        }
      }
    }
  }

  &.theme-dark {
    svg.logo {
      path {
        fill: var(--color-pelati);
      }
    }

    .nav-item {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      color: var(--color-black);

      > div {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        div {
          margin-left: 8px;
        }
      }

      a {
        display: flex;
        align-items: center;
        font-weight: 500;
        letter-spacing: 0.3px;
        color: var(--color-sky-dancer);
        &.router-link-active {
          color: var(--color-black);
        }
      }

      @media (max-width: 1241px) {
        flex-direction: column;

        > div {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
        }

        ul {
          height: 0;
          overflow: hidden;
        }
      }

      &.hover {
        > a {
          color: var(--color-black);
        }

        @media (max-width: 1241px) {
          ul {
            height: auto;
          }
        }
      }

      @media (hover) {
        :hover {
          > a {
            color: var(--color-black);
          }

          @media (max-width: 1241px) {
            > a {
              color: var(--color-sky-dancer);
            }
            ul {
              height: auto;
            }
          }
        }
      }

      svg path {
        stroke: var(--color-black);
      }

      a {
        // @extend .link-cta;
      }

      &.special {
        border: 2px solid var(--color-atomic-lime);
        background-color: var(--color-atomic-lime);
        padding: 6px 15px;
        transition: all 0.15s ease;

        a {
          color: var(--color-black);
          &.router-link-active {
            color: var(--color-black);
          }
        }

        @media (max-width: 1241px) {
          border: 0;
        }

        @media (hover) {
          &:hover {
            background: var(--color-black);
            color: var(--color-atomic-lime) !important;

            @include breakpoint('m') {
              border: 0;
              background: white;
              color: #000;
            }

            a {
              color: inherit;

              @include breakpoint('m') {
                color: var(--color-sky-dancer);
              }
            }
          }
        }
      }
    }

    .nav-item-children {
      background: white;

      .nav-item {
        color: #000;
        padding: 0;
        width: 100%;

        a {
          padding: 13px 26px 13px 0;
        }

        > div {
          justify-content: flex-start;

          span {
            display: inline-block;
            transform: translateX(-19px);
            transition: all 0.35s ease-in-out;
          }
        }

        @media (max-width: 1241px) {
          padding: 0;

          > div {
            width: 100%;
            flex-direction: row;
            display: flex;
            align-items: center;
          }
        }

        svg {
          width: 18px;
          height: 15px;
          display: inline-block;
          margin-left: 19px;
          opacity: 0;
          transition: all 0.35s ease-in-out;
          transform: rotate(0);

          path {
            fill: var(--color-sky-dancer);
            stroke: var(--color-sky-dancer);
          }
        }

        &.ext svg {
          position: relative;
          top: 2px;
        }

        &.hover {
          background: var(--color-grey-light) !important;

          svg {
            opacity: 1;
            margin-right: 0;
          }

          span {
            display: inline-block;
            transform: translateX(9px);
          }
        }

        @media (hover) {
          &:hover {
            background: var(--color-grey-light) !important;

            svg {
              opacity: 1;
              margin-right: 0;
            }

            span {
              display: inline-block;
              transform: translateX(9px);
            }
          }
        }
      }
    }
  }

  nav {
    @media (max-width: 1241px) {
      background: white;
    }

    ul {
      display: flex;
      padding-left: 0;

      li {
        list-style: none;
        margin-right: 40px;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        svg {
          margin-left: 6px;
        }

        ul {
          pointer-events: none;
        }

        &.hover {
          ul {
            opacity: 1;
            pointer-events: all;
            transform: translateY(50px);

            @media (max-width: 1241px) {
              transform: translateY(0);
            }

            li {
              animation: fade-in 300ms ease forwards;
            }
          }

          color: var(--color-sky-dancer);

          svg path {
            stroke: var(--color-sky-dancer);
            fill: var(--color-sky-dancer);
          }
        }

        @media (hover) {
          &:hover {
            ul {
              opacity: 1;
              pointer-events: all;
              transform: translateY(50px);

              @media (max-width: 1241px) {
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
          top: 0;
          left: -8%;
          z-index: 999;

          @media (max-width: 1241px) {
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
      }
    }

    @include breakpoint('spl') {
      transition: right 0.35s ease-in-out;
      position: fixed;
      width: 100%;
      top: var(--headerHeight);
      right: -100vw;
      bottom: 0;

      ul {
        display: flex;
        flex-direction: column;

        li {
          transition: transform 0.35s ease-in-out;
          @include staggerTransition(12, 35ms);
          transform: translateX(300px);
          background: white;
          border-top: 1px solid var(--color-grey-light);
          border-bottom: 1px solid var(--color-grey-light);
          color: var(--color-sky-dancer);
          margin-right: 0;
          padding: 0 16px;
          justify-content: space-between;

          a {
            padding: 16px 0;
            width: 100%;
          }

          svg {
            path {
              stroke: #000 !important;
            }
          }
        }
      }

      &.open {
        right: 0;
        background: white;
        bottom: 0;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          display: none;
        }

        ul {
          li {
            transform: translateX(0);

            ul {
              left: 0;
              border: 0;
              top: 0;
              outline: 0;
              width: 100%;

              > li {
                padding-left: 48px;
              }
            }
          }
        }
      }
    }
  }

  .nav-item {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    white-space: nowrap;

    @media (max-width: 1241px) {
      div.dropdown {
        min-width: auto;
        min-height: 38px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        @include breakpoint('sm') {
          min-width: 15px;
          min-height: 15px;
        }
      }
    }

    a {
      // @extend .link-cta;
    }

    /*&.special {
      border: 1px solid var(--color-blue);
      border-radius: var(--border-radius-button);
      padding: 6px 15px;
      transition: all 0.15s ease;

      &:hover {
        background: var(--color-blue);
        color: var(--color-white);
      }

      @media (max-width: 1241px) {
        display: none;
      }
    }*/
  }
}

.nav-button {
  cursor: pointer;
  display: none;

  @include breakpoint(1241) {
    display: block;
  }

  svg {
    position: relative;
    top: -2px;
    overflow: visible;
    width: 24px;
    height: auto;

    * {
      transition: all 0.25s ease-in-out;
      transform: translate(0, 0);
    }
  }

  &.open {
    svg {
      * {
        transition: all 0.25s ease-in-out;

        @include staggerTransition(12, 35ms);

        &:nth-child(2) {
          transform: translate(6px, 6px);
        }

        &:nth-child(3) {
          transform: translate(6px, 0px);
        }

        &:nth-child(4) {
          transform: translate(6px, -6px);
        }

        &:nth-child(5) {
          transform: translate(0, 6px);
        }

        &:nth-child(7) {
          transform: translate(0, -6px);
        }

        &:nth-child(8) {
          transform: translate(-6px, 6px);
        }

        &:nth-child(9) {
          transform: translate(-6px, 0);
        }

        &:nth-child(10) {
          transform: translate(-6px, -6px);
        }
      }
    }
  }
}
</style>
