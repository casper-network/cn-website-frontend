<template>
  <div>
    <div class="glide" ref="glider">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li class="glide__slide" v-for="(item, i) in glideData" :key="`glide-slide-${i}`">
            <img loading="lazy" width="1024" height="768" :src="slideImage(item)" alt="">
            <div v-if="item.text" v-html="item.text"></div>
          </li>
        </ul>
      </div>
      <div class="glide__arrows" data-glide-el="controls">
        <div class="glide__arrow glide__arrow--left" data-glide-dir="<">
          <ChevronLeft/>
        </div>
        <div class="glide__arrow glide__arrow--right" data-glide-dir=">">
          <ChevronRight/>
        </div>
      </div>
      <div class="glide__bullets" data-glide-el="controls[nav]">
        <button class="glide__bullet" v-for="(item, i) in glideData" :key="`glide-slide-${i}`"
                :data-glide-dir="`=${i}`"></button>
      </div>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide/dist/glide';
import ChevronLeft from '@/assets/svg/chevronLeft.svg?inline';
import ChevronRight from '@/assets/svg/chevronRight.svg?inline';

export default {
  name: 'Glider',
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
    glideData: Array,
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
  mounted() {
    new Glide(this.$refs.glider, {
      type: 'carousel',
      perView: 1,
      gap: 10,
    }).mount();
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
    slideImage(val) {
      return process.env.VUE_APP_ASSET_URL + val.id;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import "./node_modules/@glidejs/glide/src/assets/sass/glide.core";
@import "./node_modules/@glidejs/glide/src/assets/sass/glide.theme";

.glide__slide {
  // background: #ccc;

  img {
    width: 100%;
    height: 100%;
    // aspect-ratio: 16 / 9;
    object-fit: cover;
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

.glide__bullets {
  padding: 6px;
  border-radius: var(--border-radius-button);
  background: var(--color-grey-light);
  bottom: 0;

  .glide__bullet {
    width: 6px;
    height: 6px;
    background: var(--color-grey-dark);
    border: 0;
    margin: 4px 4px;

    &.glide__bullet--active {
      background: var(--color-blue);
    }
  }
}
</style>
