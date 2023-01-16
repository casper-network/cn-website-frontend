<template>
  <footer>
    <div class="container -long">
      <div class="main">
        <p class="h1" v-html="$t('footer.socialTitle')"></p>
        <ul>
          <li>
            <a :href="$t('social.discord')" target="_blank">
              <SVGIconDiscord/>
            </a>
          </li>
          <li>
            <a :href="$t('social.twitter')" target="_blank">
              <SVGIconTwitter/>
            </a>
          </li>
          <li>
            <a :href="$t('social.telegram')" target="_blank">
              <SVGIconTelegram/>
            </a>
          </li>
          <li>
            <a :href="$t('social.linkedin')" target="_blank">
              <SVGIconLinkedIn/>
            </a>
          </li>
          <li>
            <a :href="$t('social.youtube')" target="_blank">
              <SVGIconYoutube/>
            </a>
          </li>
          <li>
            <a :href="$t('social.github')" target="_blank">
              <SVGIconGithub/>
            </a>
          </li>
        </ul>
        <div class="secondary desktop">
          <SVGLogo class="logo"/>
          <ul>
            <li v-for="(navItem, i) in compNavFooter4" :key="`nav-col-2-${i}`">
              <router-link :to="`/${$i18n.locale}/${navItem.url}`">{{navItem.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-nav nav-1">
        <ul :aria-label="$t('footer.nav1Title')">
          <li v-for="(navItem, i) in compNavFooter1" :key="`nav-col-1-${i}`">
            <router-link :to="`/${$i18n.locale}/${navItem.url}`">
                         {{navItem.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="footer-nav nav-3">
        <ul :aria-label="$t('footer.nav3Title')">
          <li v-for="(navItem, i) in compNavFooter3" :key="`nav-col-3-${i}`">
            <router-link :to="`/${$i18n.locale}/${navItem.url}`" v-if="navItem.type === 'int'">{{navItem.title}}</router-link>
            <a :href="navItem.url" v-if="navItem.type === 'ext'" target="_blank">{{navItem.title}}</a>
          </li>
        </ul>
      </div>
      <div class="footer-nav nav-2">
        <ul :aria-label="$t('footer.nav2Title')">
          <li v-for="(navItem, i) in compNavFooter2" :key="`nav-col-2-${i}`">
            <router-link :to="`/${$i18n.locale}/${navItem.url}`">{{navItem.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="secondary mobile">
        <SVGLogo class="logo"/>
        <ul>
          <li v-for="(navItem, i) in compNavFooter4" :key="`nav-col-2-${i}`">
            <router-link :to="`/${$i18n.locale}/${navItem.url}`">{{navItem.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import SVGIconDiscord from '@/assets/svg/icon-social-discord.svg?inline';
import SVGIconTwitter from '@/assets/svg/icon-social-twitter.svg?inline';
import SVGIconTelegram from '@/assets/svg/icon-social-telegram.svg?inline';
import SVGIconLinkedIn from '@/assets/svg/icon-social-linkedin.svg?inline';
import SVGIconYoutube from '@/assets/svg/icon-social-youtube.svg?inline';
import SVGIconGithub from '@/assets/svg/icon-social-github.svg?inline';
import SVGLogo from '@/assets/svg/logo.svg?inline';

export default {
  name: 'Footer',
  components: {
    SVGIconDiscord,
    SVGIconTwitter,
    SVGIconTelegram,
    SVGIconLinkedIn,
    SVGIconYoutube,
    SVGIconGithub,
    SVGLogo,
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
    return {};
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    compNavFooter1() {
      const path = 'footer.nav1Content';
      if (this.$i18n.te(path)) {
        return this.$i18n.t(path);
      }
      return null;
    },
    compNavFooter2() {
      const path = 'footer.nav2Content';
      if (this.$i18n.te(path)) {
        return this.$i18n.t(path);
      }
      return null;
    },
    compNavFooter3() {
      const path = 'footer.nav3Content';
      if (this.$i18n.te(path)) {
        return this.$i18n.t(path);
      }
      return null;
    },
    compNavFooter4() {
      const path = 'footer.nav4Content';
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

<style lang="scss">
@import '~scss/mixins';

footer {
  padding: 48px 48px 0;
  background: var(--color-white);

  @include breakpoint('m') {
    padding: 30px 20px 0;
    flex-direction: column;
  }

  div.container {
    @include breakpoint('m') {
      padding: 0;
      flex-direction: column;
    }
  }

  .main {
    p.h2 span {
      font-weight: 500;
      line-height: 1.3;
      display: inline-block;
    }

    ul {
      display: flex;
      justify-content: space-between;
      padding-left: 0;
      margin-top: 60px;

      @include breakpoint('mx') {
        justify-content: flex-start;
        gap: 15px;
      }

      @include breakpoint('sm') {
        margin-top: 24px;
        justify-content: flex-start;
      }

      li {
        display: flex;
        align-items: center;

        svg {
          margin-right: 2.5vw;
          width: 48px;
          height: 48px;

          @include breakpoint('sm') {
            margin-right: 24px;
            width: 32px;
            height: 32px;
          }
        }
      }
    }
  }

  .footer-nav {
    ul {
      &::before {
        content: attr(aria-label);
        margin-left: 0;
        margin-bottom: 10px;
        display: block;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      margin-left: 0;
      padding-left: 0;

      li {
        list-style: none;
        padding: 0 0 4px 0;
        color: var(--color-sky-dancer);
      }
    }
  }

  .secondary.desktop {
    margin-top: 40px;
    margin-bottom: 48px;

    @include breakpoint('sm') {
      display: none;
    }
    & > svg {
      max-width: 159px;
      path {
        fill: var(--color-pelati);
      }
    }

    & > ul {
      margin-top: 30px;
      display: flex;
      justify-content: flex-start;
      gap: 70px;

      a {
        color: var(--color-sky-dancer);
      }
    }
  }

  .secondary.mobile {
    display: none;
    margin-top: 40px;

    @include breakpoint('sm') {
      display: block;
    }

    & > svg {
      max-width: 159px;
      path {
        fill: var(--color-pelati);
      }
    }

    & > ul {
      padding: 0 0;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      list-style-type: none;
      gap: 0;

      a {
        color: var(--color-sky-dancer);
      }
    }
  }
}
</style>
