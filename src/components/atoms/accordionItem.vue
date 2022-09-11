<template>
  <li class="accordion__item">
    <Button v-if="isJobPage" class="share" icon="share" @click.native.prevent="shareJob">
      <p>{{$t('ctas.share')}}</p>
    </Button>
    <div
      class="accordion__trigger"
      :class="{'accordion__trigger_active': visible}"
      @click="open">
      <!-- This slot will handle the title/header of the accordion and is the part you click on -->
      <slot name="accordion-trigger"></slot>
      <SVGPlusIcon v-if="!visible"/>
      <SVGMinusIcon v-if="visible"/>
    </div>

    <transition-group
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end">
      <div class="accordion__content"
           v-show="visible" key="acc-cont">
        <slot name="accordion-content"></slot>
      </div>
      <div key="acc-form" v-show="visible">
        <slot name="accordion-form"></slot>
      </div>
    </transition-group>
  </li>
</template>

<script>
import SVGPlusIcon from '@/assets/svg/plus.svg?inline';
import SVGMinusIcon from '@/assets/svg/minus.svg?inline';

export default {
  name: 'accordionItem',
  inject: ['Accordion'],
  components: {
    SVGPlusIcon,
    SVGMinusIcon,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    jobSlug: String,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      index: null,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    visible() {
      return this.index === this.Accordion.active;
    },
    isJobPage() {
      return this.$route.name === 'lp-career';
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
  created() {
    // eslint-disable-next-line no-multi-assign
    this.index = this.Accordion.count += 1;
  },
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
    open() {
      if (this.visible) {
        this.Accordion.active = null;
      } else {
        this.Accordion.active = this.index;
      }
    },
    start(el) {
      const elClone = el;
      elClone.style.height = `${elClone.scrollHeight}px`;
    },
    end(el) {
      const elClone = el;
      elClone.style.height = '';
    },
    shareJob() {
      console.log('here');
      if (this.$d.clientWidth < 768) {
        window.navigator.share({ url: this.jobSlug });
      } else {
        this.$router.push({ name: 'items-jobs', params: { slug: this.jobSlug } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.accordion__item {
  cursor: pointer;
  position: relative;
  width: 100%;

  &:after {
    content: '';
    border-bottom: 1px solid #ccc;
    display: block;
    width: 57%;
    position: absolute;
    right: 0;

    @include breakpoint('sm') {
      width: 100%;
    }
  }

  @include breakpoint('sm') {
    // padding: 24px 20px 24px 0;
  }

  &:first-child {
    padding-top: 0;
  }

  .accordion__content {
    margin-left: 43%;
    margin-bottom: 45px;
    width: auto;

    @include breakpoint('sm') {
      margin-left: 0;
    }

    p {
      max-width: 90%;
      margin-bottom: 32px;

      @include style-body('large')
    }
  }
}

.accordion__trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 43%;
  width: auto;
  padding: 47px 20px 47px 0;

  @include breakpoint('sm') {
    margin-left: 0;
    padding: 24px 20px 24px 0;
  }

  svg {
    width: 40px;
    transition: all 0.65s ease-in-out;

    @include breakpoint('sm') {
      width: 24px;
    }
  }

  h3 {
    max-width: 85%;
  }
}

.btn.share {
  position: absolute;
  right: 0;
  top: 47px;
  z-index: 20000;

  @include breakpoint('sm') {
    top: 26px;
  }

  svg {
    width: 24px;
  }

  p {
    padding: 0;
    font-size: 16px;
    color: var(--color-blue);
    line-height: 1;
  }
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>
