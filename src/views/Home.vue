<template>
  <div class="home">
    <Hero :type="''"/>
    <div class="container">
      <TextTeaser/>
    </div>
    <div class="container -long">
      <VideoPlayer youtube-video-id="M7lc1UVf-VE"></VideoPlayer>
    </div>
    <div class="container">
      <TextTeaser box-title="Why <span>Casper</span>"
                  box-content="Not only do we think our concept is insanely great, but our users think we're really good too, but take a look for yourself."/>
    </div>
    <div class="container">
      <accordion specialclass="">
        <accordion-item>
          <!-- This slot will handle the title/header of the accordion and is the part you click on -->
          <template slot="accordion-trigger">
            <h3>Proof-of-stake with no compromise</h3>
          </template>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <template slot="accordion-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </template>
        </accordion-item>

        <accordion-item>
          <!-- This slot will handle the title/header of the accordion and is the part you click on -->
          <template slot="accordion-trigger">
            <h3>Thoroughly enterprise optimized</h3>
          </template>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <template slot="accordion-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </template>
        </accordion-item>

        <accordion-item>
          <!-- This slot will handle the title/header of the accordion and is the part you click on -->
          <template slot="accordion-trigger">
            <h3>Scale for global requirements</h3>
          </template>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <template slot="accordion-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </template>
        </accordion-item>
      </accordion>
    </div>
    <QuoteSliders/>
    <LatestNews/>
    <StartNow/>
  </div>
</template>

<script>
// import { HTTP } from '@/utils/http-common';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      data: '',
    };
  },
  mounted() {
    console.log(this.$d.data);
    // eslint-disable-next-line valid-typeof
    if (document.querySelector('.hero')) {
      this.$store.commit('changeNavigationTintState', 'light');
    } else {
      this.$store.commit('changeNavigationTintState', 'dark');
    }
    /* HTTP.get('posts')
      .then((response) => {
        this.posts = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      }); */
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/mixins.scss';

div.home {
  /*> div:not(.hero) {
    margin: var(--margin-160) auto 0;

    @include breakpoint('sm') {
      margin: var(--margin-80) auto 0;
    }
  }*/
}
</style>
