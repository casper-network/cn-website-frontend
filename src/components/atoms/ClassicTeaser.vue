<template>
  <div class="outer-wrap">
    <div class="inner-wrap">
      <img v-if="teaserImage" :src="teaserImage" alt="">
      <div>
        <h3>{{blockData.title}}</h3>
        <p v-html="blockData.content"></p>
        <Button class="primary">
          <router-link v-if="blockData.button.type === 'int'" :to="blockData.button.url">{{ blockData.button.text || $t('ctas.learnMore') }}</router-link>
          <a v-if="blockData.button.type === 'ext'" :href="blockData.button.url">{{ blockData.button.text || $t('ctas.learnMore') }}</a>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'ClassicTeaser',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    blockData: Object,
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
    teaserImage() {
      const media = this.blockData?.media || null;
      if (media) {
        return `${API_URL}/assets/${media}`;
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

<style lang="scss" scoped>
@import '~scss/mixins';

.outer-wrap {
  padding: 80px;
  background: var(--color-grey-light);
  margin: 80px auto 0;

  @include breakpoint('sm') {
    padding: 64px 20px;
  }
}

.inner-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  max-width: 1506px;
  margin: 0 auto;

  @include breakpoint('sm') {
    grid-template-columns: 1fr;
    gap: 45px;
  }

  img {
    aspect-ratio: 752 / 436;
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    p {
      margin: 30px 0 64px;
      max-width: 90%;

      @include breakpoint('sm') {
        margin: 24px 0 24px;
      }
    }

    .btn {
      @include breakpoint('sm') {
        align-self: flex-end;
      }
    }
  }
}
</style>
