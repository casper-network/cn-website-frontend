<template>
  <div class="grid" v-if="teamData">
    <TeamCard
      v-for="(member, index) in teamData" :key="index"
      :member="member"/>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'TeamCollection',
  components: {},
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
    return {
      teamData: null,
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
    // eslint-disable-next-line valid-typeof
    if (typeof this.$options.components.Hero === 'object') {
      this.$store.commit('changeNavigationTintState', 'light');
    } else {
      this.$store.commit('changeNavigationTintState', 'dark');
    }

    await this.getTeamData();
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
    async getTeamData() {
      try {
        const response = await axios.get(`${API_URL}/items/team_members?fields=*.*&sort%5B%5D=sort&limit=-1`);
        this.teamData = response.data.data;
      } catch (error) {
        this.teamData = false;
        console.log(error);
      }
      return this.teamData;
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
  },
};
</script>

<style lang="scss" scoped>
@import '~scss/mixins';

@import '~scss/mixins';

div.grid {
  display: grid;
  gap: 32px;
  padding: 80px 20px;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  border-bottom: 1px solid var(--color-grey-light);
  max-width: 1248px;
  margin: 0 auto;

  @include breakpoint('m') {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }

  @include breakpoint('sm') {
    grid-template-columns: repeat(1, minmax(100%, 1fr));
  }
}

.teaser {
  flex-direction: column;
  align-items: flex-start;

  ::v-deep .icon {
    width: 64px;
    height: 64px;
    margin-bottom: 48px;
  }

  ::v-deep .teaser-title {
    font-weight: 400;
    margin-bottom: 24px;
  }
}
</style>
