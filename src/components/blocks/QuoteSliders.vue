<template>
  <div class="quote-slider">
    <div class="left-short">
        <div class="quote-img">
      <transition name="scale" mode="out-in">
          <img :src="quoteImage" alt="" :key="currentQuote.id">
      </transition>
        </div>
    </div>
    <div class="right-long">
      <div class="navigator">
        <SVGArrowLeft @click="previousQuote()" :class="{'invisible': currentQuoteIndex === 0}"/>
        <p class="label">{{ currentQuoteIndex + 1 }} of {{ totalQuotes }}</p>
        <SVGArrowRight @click="nextQuote()" />
      </div>
      <div class="content">
        <div class="slider">
          <figure>
            <transition name="fade" mode="out-in">
              <blockquote cite="https://developer.mozilla.org/samples/html/figure.html"
                          :key="currentQuote.id">
                {{ this.currentQuote.quote }}
              </blockquote>
            </transition>
            <transition name="slide" mode="out-in">
              <figcaption>{{this.currentQuote.citer}}<br/>{{this.currentQuote.company}}</figcaption>
            </transition>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SVGArrowLeft from '@/assets/svg/icon-arrow-left.svg?inline';
import SVGArrowRight from '@/assets/svg/icon-arrow-right.svg?inline';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'QuoteSliders',
  components: {
    SVGArrowLeft,
    SVGArrowRight,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    quotes: {
      type: Array,
      required: true,
    },
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      currentQuote: '',
      currentQuoteImage: '',
      currentQuoteImgSrc: 'https://i.pravatar.cc/300',
      currentQuoteIndex: 0,
      totalQuotes: 0,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    quoteImage() {
      return `${API_URL}/assets/${this.currentQuote.image}`;
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
    this.totalQuotes = this.quotes.length;
    this.currentQuote = [...this.quotes].reverse()
      .pop();
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
    nextQuote() {
      if (this.currentQuoteIndex < this.totalQuotes - 1) {
        this.currentQuoteIndex += 1;
      } else {
        this.currentQuoteIndex = 0;
      }
      this.currentQuote = this.quotes[this.currentQuoteIndex];
    },
    previousQuote() {
      if (this.currentQuoteIndex > 0) {
        this.currentQuoteIndex -= 1;
      } else {
        // this.currentQuoteIndex = this.totalQuotes - 1;
      }
      this.currentQuote = this.quotes[this.currentQuoteIndex];
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.quote-slider {
  box-sizing: border-box;
  background: var(--color-blue);
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 80px;
  min-height: 890px;

  @include breakpoint('sm') {
    min-height: auto;
  }

  .left-short {
    padding: 150px 0;
    flex: 0 0 33%;
    display: flex;
    justify-content: flex-end;

    .quote-img {
      width: 300px;
      height: 300px;
      position: relative;
      margin-top: 20%;
    }

    img {
      border-radius: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include breakpoint('sm') {
      display: none;
    }
  }

  .right-long {
    padding: 150px 0;

    @include breakpoint('sm') {
      padding: 45px 0;
    }

    .navigator {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 50px;

      transition: all 0.65s ease-in-out;

      p.label {
        font-size: 2rem;
        color: white;
        margin: 0 20px;

        @include breakpoint('sm') {
          font-size: 24px;
        }
      }

      svg {
        width: 38px;
        cursor: pointer;
        opacity: 1;
        transition: all 0.35s ease-in-out;

        &.invisible {
          opacity: 0.3;
        }

        path {
          fill: var(--color-white);
          &:nth-child(1) {
            fill: transparent;
          }
        }
      }
    }

    figure {
      margin: 0;
    }

    .content {
      color: white;
      width: 90%;

      blockquote {
        font-size: 36px;
        line-height: 51px;
        font-weight: 300;
        padding: 0;
        margin: 0;

        @include breakpoint('sm') {
          font-size: 24px;
          line-height: 32px;
        }
      }

      figcaption {
        @include style-body('medium');
        margin-top: 40px;
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to{
  transform-origin: left center;
  opacity: 0;
}
</style>
