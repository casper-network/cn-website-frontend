<template>
  <div class="post-collection">
      <div class="block-header">
        <h2 v-html="blockTitle"></h2>
        <div>
          <div class="glide__arrows hidden-on-mobile">
            <div class="glide__arrow glide__arrow--left" @click="glider.go('<')">
              <ChevronLeft/>
            </div>
            <div class="glide__arrow glide__arrow--right" @click="glider.go('>')">
              <ChevronRight/>
            </div>
          </div>

          <Button class="secondary hidden-on-mobile">
            <router-link :to="buttonTarget">
              {{buttonLabel}}
            </router-link>
          </Button>
        </div>
      </div>
<!--      <div class="block-content-desktop" v-if="postCollectionData && this.$d.clientWidth > 768">
        <Card :card-data="card.content[0]" class="app-card" v-for="(card, i) in postCollectionData" :key="`card-d&#45;&#45;${i}`"></Card>
      </div>-->
      <div class="block-content-mobile" v-if="postCollectionData">
        <div class="glider" ref="glider">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide" v-for="(card, i) in postCollectionData" :key="`card-${i}`" >
                <Card :card-data="card.content[0]" class="app-card"></Card>
              </li>
            </ul>
          </div>
          <div class="glide__bullets hidden-on-desktop" data-glide-el="controls[nav]">
            <button class="glide__bullet" v-for="(item, i) in postCollectionData" :key="`glide-slide-${i}`"
                    :data-glide-dir="`=${i}`"></button>
          </div>
        </div>
      </div>
      <div class="block-footer hidden-on-desktop">
        <Button class="secondary">
          <router-link :to="buttonTarget">
            {{buttonLabel}}
          </router-link>
        </Button>
      </div>
  </div>
</template>

<script>

import Glide from '@glidejs/glide/dist/glide';
import ChevronLeft from '@/assets/svg/chevronLeft.svg?inline';
import ChevronRight from '@/assets/svg/chevronRight.svg?inline';

export default {
  name: 'PostCollection',
  components: {
    ChevronLeft,
    ChevronRight,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    blockTitle: String,
    buttonLabel: String,
    buttonTarget: String,
    collectionData: Object,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      postCollectionData: {},
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {},
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
    await this.getCollectionData();
    const numItems = this.postCollectionData.length;

    if (!this.glider && numItems) {
      this.glider = new Glide(this.$refs.glider, {
        type: numItems >= 3 ? 'carousel' : 'slider',
        perView: 3,
        gap: 32,
        autoplay: numItems >= 3 ? 3500 : false,
        hoverpause: true,
        focusAt: 0,
        startAt: 0,
        breakpoints: {
          768: {
            perView: 2,
          },
          500: {
            perView: 1,
          },
        },
      }).mount();
    }

    window.addEventListener('resize', () => {
      if (!this.glider) {
        this.glider = new Glide(this.$refs.glider, {
          type: numItems >= 3 ? 'carousel' : 'slider',
          perView: 3,
          gap: 32,
          autoplay: numItems >= 3 ? 3500 : false,
          hoverpause: true,
          breakpoints: {
            768: {
              perView: 2,
            },
            500: {
              perView: 1,
            },
          },
        }).mount();
      }
    });
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
    async getCollectionData() {
      const requestAPIEndpoint = this.collectionData.collection.api.replace('VAR_LOCALE', Intl.getCanonicalLocales(this.$i18n.locale));
      const res = await this.$d.api.get(requestAPIEndpoint);
      this.postCollectionData = this.shuffleArray(res.data);
    },
    //----------------------------------
    // Helper Methods
    //----------------------------------
    shuffleArray(array) {
      return array.sort(() => 0.5 - Math.random());
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import "./node_modules/@glidejs/glide/src/assets/sass/glide.core";

.post-collection {
  padding: 80px 32px 0;
  position: relative;
  display: block;
  max-width: 1506px;
  margin: 0 auto;

  @include breakpoint('sm') {
    padding: 80px 20px 0;
  }
}

.block-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .glide__arrows {
      display: flex;
      gap: 12px;
    }
  }
}

.container {
  flex-direction: column;
}

.block-content-desktop {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(3, minmax(32%, 3fr));

  .app-card {
      width: 100%;
  }
}

.block-content-mobile {
  .app-card {
      width: 100%;
  }
}

.glide__bullets {
  padding: 6px;
  border-radius: var(--border-radius-button);
  background: var(--color-grey-light);
  position: absolute;
  right: 30px;
  bottom: 12px;

  .glide__bullet {
    appearance: none;
    width: 8px;
    height: 8px;
    background: var(--color-grey-dark);
    border: 0;
    border-radius: 100%;
    margin: 4px 4px;
    padding: 0;

    &.glide__bullet--active {
      background: var(--color-blue);
    }
  }
}

.glide__arrow {
  background: white;
  border-radius: 100%;
  box-shadow: none;
  text-shadow: none;
  border: 1px solid var(--color-blue);
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin: 0;
  }

  &:hover {
    border: 1px solid var(--color-white);
    background: var(--color-blue);

    svg {
      path {
        fill: var(--color-white);
      }
    }
  }

  .glide__arrow--left {

  }

  .glide__arrow--right {

  }
}
</style>
