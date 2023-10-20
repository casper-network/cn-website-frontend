<template>
  <div class="carousel-container">
    <div class="container">
      <h2 v-if="title" v-html="title" :data-slug="slugged"></h2>
    </div>
    <div class="fullwidth-glider" ref="glider">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li class="glide__slide" v-for="(item, i) in computedItems" :key="`glide-slide-${i}`">
            <img :src="item.image" :alt="item.text" />
          </li>
        </ul>
      </div>
      <div class="glide__arrows" ref="arrows">
        <div class="glide__arrow glide__arrow--left" data-glide-dir="<" @click="gliderMoveLeft()">
          <ChevronLeft/>
        </div>
        <div class="glide__arrow glide__arrow--right" data-glide-dir=">" @click="gliderMoveRight()">
          <ChevronRight/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide/dist/glide';
import ChevronLeft from '@/assets/svg/icon-chevron-left.svg?inline';
import ChevronRight from '@/assets/svg/icon-chevron-right.svg?inline';
import '@glidejs/glide/dist/css/glide.core.min.css';
import slugify from 'slugify';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'ResponsiveGallery',
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
    title: {
      type: String,
      default: null,
    },
    desktopMedia: {
      type: Array,
      default: () => [],
    },
    mobileMedia: {
      type: Array,
      default: () => [],
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      glider: null,
      timeoutId: null,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    slugged() {
      const title = (this.blockTitle || '').replace(/<\/?[^>]+(>|$)/g, '');
      return slugify(title, { lower: true, strict: true });
    },
    computedItems() {
      const { clientWidth } = this.$d;
      const arr = clientWidth < 768 ? this.mobileMedia : this.desktopMedia;
      return arr.map((o) => ({
        text: o.text,
        image: `${API_URL}/assets/${o.id}`,
      }));
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
    const { glider } = this.$refs;
    glider.addEventListener('pointerdown', this.handlePointerDown);
    glider.addEventListener('mousemove', this.handlePointerDown);
    document.documentElement.classList.add('hide-x');
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  // beforeUpdate() {},
  // updated() {},
  beforeDestroy() {
    const { glider } = this.$refs;
    glider.removeEventListener('pointerdown', this.handlePointerDown);
    glider.removeEventListener('mousemove', this.handlePointerDown);
    window.removeEventListener('resize', this.handleResize);
    document.documentElement.classList.remove('hide-x');
  },
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
    handleResize() {
      if (this.glider) {
        this.glider.disable();
        this.glider.destroy();
        this.glider = null;
      }

      this.glider = new Glide(this.$refs.glider, {
        type: 'carousel',
        perView: 1,
        gap: 0,
      }).mount();
    },
    handlePointerDown() {
      clearTimeout(this.timeoutId);
      const { arrows } = this.$refs;
      arrows.classList.add('visible');
      this.timeoutId = setTimeout(() => {
        arrows.classList.remove('visible');
      }, 3500);
    },
    gliderMoveLeft() {
      this.glider.go('<');
    },
    gliderMoveRight() {
      this.glider.go('>');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import "./node_modules/@glidejs/glide/src/assets/sass/glide.core";

.fullwidth-glider {
  position: relative;
  width: 100%;
  margin: 0 auto;

  & > .glide__track {
    overflow: visible;
  }
}

.glide__slide {
  img {
    width: 100%;
    height: auto;
    aspect-ratio: 16/8;
    object-fit: cover;

    @include breakpoint('sm') {
      aspect-ratio: 8/16;
    }
  }
}

.glide__arrow {
  border: 2px solid var(--color-atomic-lime);
  background-color: var(--color-atomic-lime);
  border-radius: 0;
  box-shadow: none;
  text-shadow: none;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;

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
    svg {
      path:nth-child(1) {
        fill: var(--color-atomic-lime);
      }
      path:nth-child(2) {
        fill: var(--color-atomic-lime);
      }
    }

    @include breakpoint('sm') {
      background-color: var(--color-atomic-lime);
      svg {
        path:nth-child(1) {
          fill: var(--color-black);
        }
        path:nth-child(2) {
          fill: var(--color-black);
        }
      }
    }
  }
}

.glide__arrows {
  position: absolute;
  display: flex;
  inset: 0;
  width: calc(100% + 104px);
  left: -52px;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  gap: 32px;
  transition: width 0.16s ease-out, left 0.16s ease-out;

  &.visible {
    width: 100%;
    left: 0;
  }
}

.glide__arrow--left {
  pointer-events: all;
  position: relative;
  width: 48px;
  height: 48px;
  left: initial;
  cursor: pointer;
}

.glide__arrow--right {
  pointer-events: all;
  position: relative;
  width: 48px;
  height: 48px;
  right: initial;
  cursor: pointer;
}

.carousel-container {
  display: block;
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 100%;
  padding: 0 0 var(--margin-80) 0;
  margin-top: 0;

  & > div.container {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 42px;
  }

  & > .container:empty {
    display: none;
  }
}

@include breakpoint('sm') {
  .glider {
    display: block;
    position: relative;
    padding: 0 20px;
  }
}
</style>
