<template>
  <div class="fileList">
    <ul>
      <li v-for="(linkItem, i) in blockData.files" :key="`link-block-${i}`">
        <a :href="downloadLink(linkItem.id)" :download="`${linkItem.text}`" target="_blank">
          {{linkItem.text}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'FileList',
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
    downloadLink(linkID) {
      return `${API_URL}/assets/${linkID}?download`;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';
@import '~scss/variables';

.fileList {
  margin-left: 43%;
  width: 100%;

  @include breakpoint('sm') {
    margin-left: 0;
  }

  ul {
    width: 100%;
  }

  ::v-deep a {
    color: var(--color-blue);
    text-decoration: underline;
    @include style-body('large');
  }

  ::v-deep ul {
    list-style-type: none;
    padding-left: 0;

    li {
      color: var(--color-blue);
      padding-top: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-bottom: 0;
      }

      a {
        @include style-body('large');
        font-weight: 400;
        color: var(--color-blue);
        display: flex;
        align-items: center;

        &:before {
          content: '';
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.5303 4.48139C18.2374 4.1885 17.7626 4.1885 17.4697 4.48139C17.1768 4.77428 17.1768 5.24916 17.4697 5.54205L21.3322 9.40454H7.71456C5.69703 9.40454 3.76212 10.206 2.3355 11.6326C0.908887 13.0592 0.107422 14.9941 0.107422 17.0117V20.4403C0.107422 20.8545 0.443208 21.1903 0.857422 21.1903C1.27164 21.1903 1.60742 20.8545 1.60742 20.4403V17.0117C1.60742 15.392 2.25085 13.8386 3.39616 12.6933C4.54147 11.548 6.09485 10.9045 7.71456 10.9045H21.3322L17.4697 14.7671C17.1768 15.06 17.1768 15.5349 17.4697 15.8278C17.7626 16.1207 18.2374 16.1207 18.5303 15.8278L23.6619 10.6962C23.8044 10.5597 23.8931 10.3675 23.8931 10.1545C23.8931 9.94085 23.8038 9.74802 23.6604 9.61142L18.5303 4.48139Z' fill='%230024CF'/%3E%3C/svg%3E");
          min-width: 24px;
          background-size: cover;
          background-repeat: no-repeat;
          min-height: 24px;
          display: block;
          margin-right: 32px;
        }
      }
    }
  }
}
</style>
