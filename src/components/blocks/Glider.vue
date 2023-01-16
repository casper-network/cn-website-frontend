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
import ChevronLeft from '@/assets/svg/icon-chevron-left.svg?inline';
import ChevronRight from '@/assets/svg/icon-chevron-right.svg?inline';
import config from '@/directus/config';

const { API_URL } = config;

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
      return `${API_URL}/assets/${val.id}`;
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
  font-weight: 300;

  img {
    width: 100%;
    height: 100%;
    // aspect-ratio: 16 / 9;
    object-fit: cover;
  }
}

.glide__arrow {
  background: var(--color-atomic-lime);
  border: 2px solid var(--color-atomic-lime);
  border-radius: 0;
  box-shadow: none;
  text-shadow: none;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 13px;
    margin: 0;

    path {
      fill: var(--color-black);
      transition: fill 0.15s ease;
    }
  }

  &:hover {
    background-color: var(--color-black);
    border-color: var(--color-atomic-lime);
    svg {
      path:nth-child(1) {
        fill: var(--color-atomic-lime);
      }
      path:nth-child(2) {
        fill: var(--color-atomic-lime);
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
