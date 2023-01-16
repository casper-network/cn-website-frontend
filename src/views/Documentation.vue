<template>
  <div>
    <div class="container">
      <TextTeaser
        :has-button="false"
        box-title="<b>Documentation</b><br/>Everything you need to know"
        box-content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit mattis fermentum, ut a in adipiscing eget. Fermentum est, bibendum nulla in. Arcu leo tellus enim in amet vitae tincidunt. Ac sit amet, condimentum vestibulum enim malesuada.">
      </TextTeaser>
      <CTACollection></CTACollection>
      <Teaser type="readmore" icon="git" class="readmore-teaser">
        <template v-slot:title>Read more about it</template>
      </Teaser>
    </div>
  </div>
</template>

<script>
import TextTeaser from '@/components/blocks/TextTeaser.vue';
import Teaser from '@/components/blocks/Teaser.vue';
import CTACollection from '@/components/collections/CTACollection.vue';

export default {
  name: 'Documentation',
  components: {
    TextTeaser,
    Teaser,
    CTACollection,
  },
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {},
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
  // mounted() {}
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

div.container {
  padding-top: 270px;
  padding-bottom: 160px;
  flex-direction: column;

  @include breakpoint('sm') {
    padding-top: 116px;
    padding-bottom: 80px;
  }
}
</style>
