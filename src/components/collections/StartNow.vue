<template>
  <div class="collection-start">
    <div class="container">
      <div class="collection-head">
        <h2 class="h1" v-html="blockTitle" :data-slug="slugged"/>
      </div>
      <div class="collection-body">
        <router-link
          v-for="(button, idx) in buttonData"
          :key="`button-${idx}`"
          :to="`/${locale}/${button.url}`"
          :class="{ full: idx === (buttonData.length - 1) }"
        >
          <Icon :icon="button.icon" />
          <span>{{ button.title }}</span>
        </router-link>
        <!--
        <WeirdTeaser
          :type="buttonData[0].type"
          :icon="buttonData[0].icon"
          :route-target="buttonData[0].url">
          <template v-slot:title>
            {{ buttonData[0].title }}
          </template>
        </WeirdTeaser>
        <WeirdTeaser
          :type="buttonData[1].type"
          :icon="buttonData[1].icon"
          :route-target="buttonData[1].url">
          <template v-slot:title>
            {{ buttonData[1].title }}
          </template>
        </WeirdTeaser>
        <WeirdTeaser
          class="full"
          :type="buttonData[2].type"
          :icon="buttonData[2].icon"
          :route-target="buttonData[2].url">
          <template v-slot:title>
            {{ buttonData[2].title }}
          </template>
        </WeirdTeaser>
        -->
      </div>
    </div>
  </div>
</template>

<script>

import slugify from 'slugify';

export default {
  name: 'StartNow',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    blockTitle: {
      type: String,
      default: 'Do not hesitate &<br/><b>start now</b>',
    },
    buttonData: {
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
    return {};
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    slugged() {
      const title = (this.blockTitle || '').replace(/<\/?[^>]+(>|$)/g, '');
      return slugify(title, { lower: true, strict: true });
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

.collection-start {
  background-color: var(--color-hello-spring);
  padding: 100px 0;

  @include breakpoint('sm') {
    padding: 1px 0;
  }

  & > .container {
    flex-direction: column;
    margin: 0 auto;

    @include breakpoint('sm') {
      margin: 80px auto;
    }

    & > .collection-head {
      h2 > p {
        display: inline-block;
        line-height: inherit;
        margin: 0;
        padding: 0;
        font-size: inherit;
        font-weight: inherit;
      }
    }

    & > .collection-body {
      display: flex;
      position: relative;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 32px;

      & > a {
        flex: 1 0 38%;
        display: block;
        padding: 45px;
        background-color: var(--color-white);
        transition: all 0.15s ease;
        box-shadow: 0 0 0 4px transparent;

        & > .icon > svg {
          width: 61px;
          height: auto;

          path {
            transition: fill 0.15s ease;
          }
        }

        & > span {
          margin-top: 50px;
          font-size: calc(var(--typography-h1-d-font-size) * 0.4115);
          font-weight: 500;
          letter-spacing: 1px;
          display: block;
          color: var(--color-sky-dancer);
          transition: color 0.15s ease;
          line-height: 1;
        }

        &:hover {
          //background-color: var(--color-sky-dancer);
          border-color: var(--color-sky-dancer);
          box-shadow: 0 0 0 4px var(--color-sky-dancer);
        }

        &.full {
          background-color: var(--color-sky-dancer);
          & > .icon > svg path {
            fill: var(--color-white);
          }
          & > span {
            color: var(--color-white);
          }

          &:hover {
            background-color: var(--color-white);

            & > span {
              color: var(--color-sky-dancer);
            }

            & > .icon > svg path {
              fill: var(--color-sky-dancer);
            }
          }
        }
      }
    }
  }
}

/*
div.collection-head {
  flex-direction: row;
  margin-bottom: 64px;

  ::v-deep h2 {
    p {
      display: inline-block;
      line-height: inherit;
      margin: 0;
      padding: 0;
      font-size: inherit;
      font-weight: inherit;
    }
  }
}

div.collection-body {
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;

  & > a {

  }

  .teaser {
    flex: 1 0 38%;
  }
}
*/
</style>
