<template>
  <div class="carousel-container">
    <div class="container">
      <h2 v-html="blockTitle"></h2>
      <div class="glide__arrows">
        <div class="glide__arrow glide__arrow--left" data-glide-dir="<" @click="gliderMoveLeft()">
          <ChevronLeft/>
        </div>
        <div class="glide__arrow glide__arrow--right" data-glide-dir=">" @click="gliderMoveRight()">
          <ChevronRight/>
        </div>
      </div>
    </div>
    <div class="glider" ref="glider">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li class="glide__slide" v-for="(item, i) in glideData" :key="`glide-slide-${i}`">
            <CarouselItem :card-data="item"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Glide from '@glidejs/glide/dist/glide';
import ChevronLeft from '@/assets/svg/chevronLeft.svg?inline';
import ChevronRight from '@/assets/svg/chevronRight.svg?inline';
import '@glidejs/glide/dist/css/glide.core.min.css';

export default {
  name: 'Carousel',
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
    blockTitle: {
      type: String,
      default: 'Blockchain glossary',
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
  mounted() {
    document.documentElement.classList.add('hide-x');
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  // beforeUpdate() {},
  // updated() {},
  beforeDestroy() {
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

      const before = 30 * (this.$d.clientWidth / 1400);
      if (this.$d.clientWidth >= 480) {
        this.glider = new Glide(this.$refs.glider, {
          type: 'slider',
          perView: 5,
          gap: 32,
          focusAt: 1,
          startAt: 1,
          peek: {
            before,
            after: -800,
          },
        }).mount();
      }
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

.glider {
  max-width: 1248px;
  margin: 0 auto;

  & > .glide__track {
    overflow: visible;
  }
}

.glide__slides {
  margin-left: -2vw;

  @include breakpoint('sm') {
    flex-wrap: wrap;
    margin-left: 0;
  }
}

.glide__slide {
  // background: #ccc;

  img {
    width: 100%;
    height: 100%;
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
}

.glide__arrows {
  display: flex;
  justify-content: space-between;
  gap: 32px;

  @include breakpoint('sm') {
    display: none;
  }
}

.glide__arrow--left {
  position: relative;
  width: 48px;
  height: 48px;
  left: initial;
}

.glide__arrow--right {
  position: relative;
  width: 48px;
  height: 48px;
  right: initial;
}

.carousel-container {
  display: block;
  width: 100%;
  position: relative;
  height: 100%;
  padding: 0 0 var(--margin-80) 0;
  margin-top: 80px;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 42px;
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
