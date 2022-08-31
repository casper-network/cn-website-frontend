<template>
  <header class="header"
          :class="`overlap-state-${isOverlapping} navbar-state-${showNavigation} theme-${this.$store.state.navigationTintState}`">
    <div class="container -long">
      <SVGLogo class="logo" @click="$router.push(`/${$i18n.locale}/`)"/>
      <nav>
        <ul>
          <li class="nav-item" :class="(item.class) ? item.class : ''"
              v-for="(item, index) in computedNavigation" :key="`navitem-${index}`"
              :data-has-sub="!!(item.children)">
            <div v-if="item.url">
              <router-link @click.native="toggleNavigation" :to="`/${$i18n.locale}/${item.url}`">
                <span>{{ item.title }}</span>
              </router-link>
              <ChevronFuckedUp
                v-if="item.children" @click.native="toggleChildren"
                class="dropdown"
              />
            </div>
            <div v-if="!item.url">
              <a class="curs-point" @click="toggleChildren">
                <span>{{ item.title }}</span>
              </a>
              <ChevronFuckedUp
                v-if="item.children" @click.native="toggleChildren"
                class="dropdown"
              />
            </div>
            <ul class="nav-item-children" v-if="item.children">
              <li class="nav-item" v-for="(subItem, index) in item.children"
                  :key="`subnav-item-${index}`">
                <div v-if="subItem.type === 'ext'">
                  <SVGCurvedArrow/>
                  <a @click="toggleNavigation" :href="subItem.url" v-if="subItem" target="_blank">
                    <span>{{ subItem.title }}</span>
                  </a>
                </div>
                <div v-if="subItem.type === 'int'">
                  <SVGRightArrow/>
                  <router-link @click="toggleNavigation" :to="`/${$i18n.locale}/${subItem.url}`" v-if="subItem">
                    <span>{{ subItem.title }}</span>
                  </router-link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="nav-button" @click="toggleNavigation()">
        <SVGBurger/>
      </div>
    </div>
  </header>
</template>

<script>
import SVGLogo from '@/assets/svg/logo.svg?inline';
import SVGBurger from '@/assets/svg/burger.svg?inline';
import SVGCurvedArrow from '@/assets/svg/curvedArrow.svg?inline';
import SVGRightArrow from '@/assets/svg/arrowRight.svg?inline';

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
      showNavigation: true,
      lastScrollPosition: 0,
      isOverlapping: true,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    computedNavigation() {
      const path = 'navigation';
      if (this.$i18n.te(path)) {
        return this.$i18n.t(path);
      }
      return null;
    },
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
    isOverlapping(newVal) {
      if (newVal) {
        this.$store.commit('changeNavigationTintState', 'light');
      } else {
        this.$store.commit('changeNavigationTintState', 'dark');
      }
    },
    $route() {
      if (document.querySelector('.nav-button')
        .classList
        .contains('open')) {
        this.toggleNavigation();
      }

      setTimeout(() => {
        if (document.querySelector('.hero') && document.documentElement.scrollTop < 100) {
          this.isOverlapping = this.elementsOverlap();
        } else if (document.querySelector('.hero') && document.documentElement.scrollTop > 100) {
          this.isOverlapping = false;
          this.$store.commit('changeNavigationTintState', 'dark');
        } else {
          this.isOverlapping = false;
        }
      }, 50);

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
  // created() {},
  // beforeMount() {},
  // render(h) { return h(); },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  // beforeUpdate() {},
  /* updated() {

  }, */
  beforeDestroy() {
    // window.removeEventListener('scroll', this.onScroll);
  },
  // destroyed() {},
  methods: {
    displayChildren(evt) {
      evt.currentTarget.classList.add('hover');
    },
    toggleChildren(evt) {
      const els = this.$el.querySelectorAll('.nav-item.hover');
      els.forEach((el) => {
        if (el !== evt.currentTarget.parentNode.parentNode) {
          el.classList.remove('hover');
        }
      });
      evt.currentTarget.parentNode.parentNode.classList.toggle('hover');
      evt.currentTarget.parentNode.classList.toggle('hover');
    },
    hideChildren(evt) {
      evt.currentTarget.classList.remove('hover');
    },
    toggleNavigation() {
      this.$store.state.isMobileNavigationOpen = !this.$store.state.isMobileNavigationOpen;
      if (!this.$store.state.isMobileNavigationOpen) {
        const els = this.$el.querySelectorAll('.nav-item.hover');
        els.forEach((el) => {
          el.classList.remove('hover');
        });
      }

      document.querySelector('.nav-button')
        .classList
        .toggle('open');
      document.querySelector('header nav')
        .classList
        .toggle('open');
      document.querySelector('body')
        .classList
        .toggle('no-scroll');

      if (document.querySelector('body')
        .classList
        .contains('no-scroll')) {
        document.querySelector('header')
          .classList
          .remove('overlap-state-true');
        document.querySelector('header')
          .classList
          .remove('theme-light');
        document.querySelector('header')
          .classList
          .add('overlap-state-false');
        document.querySelector('header')
          .classList
          .add('theme-dark');
      } else if (document.querySelector('.hero')) {
        document.querySelector('header')
          .classList
          .remove('overlap-state-false');
        document.querySelector('header')
          .classList
          .remove('theme-dark');
        document.querySelector('header')
          .classList
          .add('overlap-state-true');
        document.querySelector('header')
          .classList
          .add('theme-light');
      } else {
        document.querySelector('header')
          .classList
          .add('overlap-state-false');
        document.querySelector('header')
          .classList
          .add('theme-light');
      }
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition <= 10) {
        return;
      }

      this.showNavigation = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;

      if (document.querySelector('.hero')) {
        this.isOverlapping = this.elementsOverlap();
        if (currentScrollPosition > document.querySelector('.intro-content')
          .getBoundingClientRect().top) {
          this.isOverlapping = false;
        } else {
          this.isOverlapping = true;
        }
      } else {
        this.isOverlapping = false;
      }

      if (document.querySelector('.article-nav-bar') && document.querySelector('.article-nav-bar')
        .getBoundingClientRect().y === 0) {
        this.showNavigation = false;
      }
    },
    elementsOverlap() {
      const el1 = document.querySelector('.header');
      const el2 = document.querySelector('.hero');

      const domRect1 = el1.getBoundingClientRect();
      const domRect2 = el2.getBoundingClientRect();

      return !(
        domRect1.top > domRect2.bottom
        || domRect1.right < domRect2.left
        || domRect1.bottom < domRect2.top
        || domRect1.left > domRect2.right
      );
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
    top: -110px;
  }

  &.overlap-state-false {
    background: var(--color-white);
  }

  &.overlap-state-true {
    background: transparent;
  }

  div.container.-long {
    align-items: center;
  }

  svg.logo {
    min-width: 176px;
    max-width: 176px;
    cursor: pointer;

    @include breakpoint(1241) {
      max-width: 120px;
      min-width: 120px;
    }
  }

  &.theme-light {
    svg.logo {
      g {
        fill: var(--color-white);
      }
    }

    .nav-item {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      white-space: nowrap;
      color: var(--color-white);

      div {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        div {
          margin-left: 8px;

          ::v-deep svg path {
            stroke: var(--color-white);
          }
        }
      }

      svg {
        transition: all 0.35s ease-in-out;

        path {
          stroke: var(--color-white);
        }
      }

      a {

      }

      :hover {
        > a {
          color: rgba(255, 255, 255, 0.8);
        }

        svg {
          transform: rotate(-180deg);

          path {
            stroke: var(--color-blue);
          }
        }
      }

      &.special {
        border: 1px solid var(--color-white);
        border-radius: var(--border-radius-button);
        padding: 6px 15px;
        transition: all 0.15s ease;

        a.router-link-active {
          color: var(--color-white);
        }

        &:hover {
          background: var(--color-blue);
          color: var(--color-white) !important;

          div,
          a {
            color: var(--color-white) !important;
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
          padding: 13px 19px 13px 0;
        }

        > div {
          justify-content: flex-start;

          span {
            display: inline-block;
            transform: translateX(-19px);
            transition: all 0.35s ease-in-out;
          }
        }

        @include breakpoint('sm') {
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
            stroke: var(--color-blue);
          }
        }

        &.hover,
        &:hover {
          background: var(--color-grey-light) !important;

          svg {
            opacity: 1;
            margin-right: 0;
          }

          span {
            display: inline-block;
            transform: translateX(19px);
            color: var(--color-blue);
          }
        }
      }
    }
  }

  &.theme-dark {
    svg.logo {
      g {
        fill: var(--color-black);
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

      @include breakpoint('sm') {
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

      &.hover,
      :hover {
        > a {
          color: var(--color-blue);
        }

        @include breakpoint('sm') {
          ul {
            height: auto;
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
        border: 1px solid var(--color-blue);
        border-radius: var(--border-radius-button);
        padding: 6px 15px;
        transition: all 0.15s ease;

        @include breakpoint('m') {
          border: 0;
        }

        &:hover {
          background: var(--color-blue);
          color: var(--color-white) !important;

          @include breakpoint('m') {
            border: 0;
            background: white;
            color: #000;
          }

          a {
            color: inherit;

            @include breakpoint('m') {
              color: var(--color-blue);
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
          padding: 13px 19px 13px 0;
        }

        > div {
          justify-content: flex-start;

          span {
            display: inline-block;
            transform: translateX(-19px);
            transition: all 0.35s ease-in-out;
          }
        }

        @include breakpoint('sm') {
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
            stroke: var(--color-blue);
          }
        }

        &.hover,
        &:hover {
          background: var(--color-grey-light) !important;

          svg {
            opacity: 1;
            margin-right: 0;
          }

          span {
            display: inline-block;
            transform: translateX(19px);
          }
        }
      }
    }
  }

  nav {
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

        &.hover,
        &:hover {
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

          color: var(--color-blue);

          svg path {
            stroke: var(--color-blue);
          }
        }

        ul {
          &:after {
            content: '';
            border-style: solid;
            border-width: 10px 8px 10px 0;
            border-color: transparent #f5f5f5 transparent transparent;
            position: absolute;
            left: 45px;
            top: -15px;
            transform: rotate(90deg);
          }

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
          border-radius: 8px;
          padding-top: 0;
          top: 0;
          left: -8%;
          z-index: 999;

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

            &:first-child {
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }

            &:last-child {
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            }
          }
        }
      }
    }

    @include breakpoint(1241) {
      transition: right 0.35s ease-in-out;
      position: fixed;
      width: 100%;
      top: var(--headerHeight);
      right: -100vw;

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
          color: black !important;
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
              border-radius: 0;
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

    @include breakpoint('sm') {
      div.dropdown {
        min-width: 38px;
        min-height: 38px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
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

      @include breakpoint('sm') {
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
    overflow: visible;

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

.router-link-active {
  color: var(--color-blue);
}
</style>
