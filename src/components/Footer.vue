<template>
  <footer>
    <div class="container -long">
      <div class="social">
        <p class="h2" v-html="$t('footer.socialTitle')"></p>
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
    </div>
    <div class="container -long">
      <div class="secondary-footer">
        <div>
          <SVGLogo class="logo"/>
<!--          <LanguageSwitcher />-->
        </div>
        <div class="secondary-footer-nav">
          <ul>
            <li v-for="(navItem, i) in compNavFooter4" :key="`nav-col-2-${i}`">
              <router-link :to="`/${$i18n.locale}/${navItem.url}`">{{navItem.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SVGIconDiscord from '@/assets/svg/social_discord.svg?inline';
import SVGIconTwitter from '@/assets/svg/social_twitter.svg?inline';
import SVGIconTelegram from '@/assets/svg/social_telegram.svg?inline';
import SVGIconLinkedIn from '@/assets/svg/social_linkedin.svg?inline';
import SVGIconYoutube from '@/assets/svg/social_youtube.svg?inline';
import SVGIconGithub from '@/assets/svg/social_github.svg?inline';
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
  background: var(--color-grey-light);

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

  .social {
    p.h2 span {
      font-weight: 700;
      line-height: 1.3;
      display: inline-block;
    }

    ul {
      display: flex;
      justify-content: space-between;
      padding-left: 0;
      margin-top: 60px;

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

          &:hover {
            path {
              stroke: var(--color-blue);
              stroke-width: 2px;
            }
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
        margin-bottom: 20px;
        display: block;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
      }

      margin-left: 0;
      padding-left: 0;

      li {
        list-style: none;
        padding: 9px 0;

        &:hover {
          color: var(--color-blue);
        }
      }
    }
  }

  .secondary-footer {
    margin-top: 120px;
    border-top: 1px solid var(--color-grey-dark);
    padding-top: 24px;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;

    @include breakpoint('sm') {
      margin-top: 10px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    > div:not(.secondary-footer-nav) {
      svg.logo {
        width: 110px;
        margin-right: 50px;
      }

      display: flex;
      flex-direction: row;
      align-items: center;

      @include breakpoint('sm') {
        width: 100%;
        justify-content: space-between;
      }
    }

    .secondary-footer-nav {
      width: 100%;
      padding: 16px 0;

      ul {
        display: flex;
        list-style-type: none;
        padding-left: 0;
        justify-content: flex-end;

        @include breakpoint('sm') {
          justify-content: flex-start;
        }

        li {
          margin-right: 20px;

          a {
            font-size: 14px;
            line-height: 24px;
          }

          &:hover {
            color: var(--color-blue);
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
