<template>
  <div class="container" v-if="careerItems && careerItems.length > 0">
    <accordion type="full">
      <accordion-item v-for="(job, i) in careerItems" :key="`job-item-${i}`" :job-slug="job.content[0].slug">
        <!-- This slot will handle the title/header of the accordion and is the part you click on -->
        <template slot="accordion-trigger">
          <div class="info-bar">
            <div>
              <ul>
                <li>{{ job.content[0].location }}</li>
                <li>{{ job.workload }}</li>
              </ul>
            </div>
            <h3>{{ job.content[0].title }}</h3>
          </div>
        </template>
        <!-- This slot will handle all the content that is passed to the accordion -->
        <template slot="accordion-content">
          <CareerDetail :slug="job.content[0].slug" :content="job.content[0].description" v-on:toggle-form="toggleForm"/>
        </template>
        <template slot="accordion-form">
          <transition>
            <FormCareer v-show="isFormToggled" :job-id="job.id"></FormCareer>
          </transition>
        </template>
      </accordion-item>
    </accordion>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/directus/config';

const { API_URL } = config;

export default {
  name: 'CareerCollection',
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
      careerItems: [],
      isFormToggled: false,
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
    this.getCareerItems();
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
    toggleForm() {
      console.log('toggleForm');
      this.isFormToggled = !this.isFormToggled;
    },
    async getCareerItems() {
      try {
        const response = await axios.get(`${API_URL}/items/jobs?fields=*.*&limit=-1&sort=sort,date_created`);
        this.careerItems = response.data.data.filter((item) => item.status === 'published');
      } catch (error) {
        this.careerItems = false;
        console.log(error);
      }
      return this.careerItems;
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

div.grid {
  display: grid;
  gap: 32px;
  padding: 80px 30px;
  grid-template-columns: repeat(3, minmax(300px, 1fr));

  @include breakpoint('sm') {
    grid-template-columns: repeat(1, minmax(100%, 1fr));
  }
}

div.container {
  padding-top: 80px;
  flex-direction: column;

  &:last-child {
    padding-bottom: 160px;
  }
}

div.info-bar {
  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
    margin-bottom: 8px;

    li {
      margin-right: 8px;
      display: flex;
      color: var(--color-grey-dark);

      &:first-of-type {
        &:before {
          content: '';
          background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 3.5C7.17157 3.5 6.5 4.17157 6.5 5C6.5 5.82843 7.17157 6.5 8 6.5C8.82843 6.5 9.5 5.82843 9.5 5C9.5 4.17157 8.82843 3.5 8 3.5ZM5.5 5C5.5 3.61929 6.61929 2.5 8 2.5C9.38071 2.5 10.5 3.61929 10.5 5C10.5 6.38071 9.38071 7.5 8 7.5C6.61929 7.5 5.5 6.38071 5.5 5Z' fill='%23666666'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 1C6.93913 1 5.92172 1.42143 5.17157 2.17157C4.42143 2.92172 4 3.93913 4 5C4 5.43516 4.17858 6.06646 4.50766 6.83238C4.83046 7.58367 5.27392 8.41068 5.75074 9.21841C6.57869 10.6209 7.49017 11.9368 8 12.6504C8.50983 11.9368 9.42131 10.6209 10.2493 9.21841C10.7261 8.41068 11.1695 7.58367 11.4923 6.83238C11.8214 6.06646 12 5.43516 12 5C12 3.93913 11.5786 2.92172 10.8284 2.17157C10.0783 1.42143 9.06087 1 8 1ZM4.46447 1.46447C5.40215 0.526784 6.67392 0 8 0C9.32608 0 10.5979 0.526784 11.5355 1.46447C12.4732 2.40215 13 3.67392 13 5C13 5.6485 12.7509 6.43629 12.4111 7.22714C12.065 8.03262 11.5984 8.90007 11.1104 9.72676C10.1338 11.3811 9.04891 12.9101 8.60729 13.5184L8.60585 13.5204C8.53606 13.6155 8.44485 13.6929 8.33959 13.7462C8.23434 13.7996 8.118 13.8274 8 13.8274C7.882 13.8274 7.76566 13.7996 7.66041 13.7462C7.55515 13.6929 7.46394 13.6155 7.39415 13.5204L7.39271 13.5184C6.95109 12.9101 5.86618 11.3811 4.88959 9.72676C4.40158 8.90007 3.93496 8.03262 3.58888 7.22714C3.24908 6.43629 3 5.6485 3 5C3 3.67392 3.52678 2.40215 4.46447 1.46447Z' fill='%23666666'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.4955 11.7584C11.5492 11.4876 11.8122 11.3114 12.0831 11.3651C13.0178 11.5502 13.8247 11.803 14.4115 12.1162C14.7046 12.2727 14.9657 12.4563 15.159 12.6739C15.355 12.8945 15.5 13.1732 15.5 13.4996C15.5 14.0294 15.1283 14.4233 14.7299 14.6924C14.3141 14.9733 13.7453 15.2066 13.0874 15.3946C11.7646 15.7725 9.96621 15.9996 8 15.9996C6.03379 15.9996 4.23538 15.7725 2.91264 15.3946C2.25466 15.2066 1.68587 14.9733 1.27009 14.6924C0.871724 14.4233 0.5 14.0294 0.5 13.4996C0.5 13.1739 0.644293 12.8958 0.839622 12.6753C1.03217 12.458 1.29228 12.2746 1.58418 12.1183C2.16851 11.8053 2.97197 11.5527 3.90225 11.3672C4.17307 11.3132 4.43637 11.489 4.49035 11.7598C4.54434 12.0306 4.36856 12.2939 4.09775 12.3479C3.21536 12.5238 2.51883 12.7521 2.05632 12.9998C1.8248 13.1238 1.67479 13.2407 1.58807 13.3385C1.50412 13.4333 1.5 13.4852 1.5 13.4996C1.5 13.522 1.51994 13.6544 1.82991 13.8638C2.12246 14.0614 2.57867 14.2591 3.18736 14.4331C4.39795 14.7789 6.09954 14.9996 8 14.9996C9.90046 14.9996 11.6021 14.7789 12.8126 14.4331C13.4213 14.2591 13.8775 14.0614 14.1701 13.8638C14.4801 13.6544 14.5 13.522 14.5 13.4996C14.5 13.4853 14.4959 13.4332 14.4114 13.3381C14.3241 13.2398 14.1732 13.1226 13.9405 12.9984C13.4756 12.7502 12.7756 12.5216 11.8889 12.346C11.618 12.2924 11.4419 12.0293 11.4955 11.7584Z' fill='%23666666'/%3E%3C/svg%3E");
          background-size: contain;
          width: 18px;
          height: 18px;
          display: inline-block;
          margin-right: 8px;
        }
      }

      &:last-of-type {
        &:before {
          content: '';
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.51857 4.47731C6.90966 2.08622 10.1527 0.74292 13.5342 0.74292C16.9157 0.74292 20.1587 2.08622 22.5498 4.47731C24.9409 6.8684 26.2842 10.1114 26.2842 13.4929C26.2842 16.8744 24.9409 20.1174 22.5498 22.5085C20.1587 24.8996 16.9157 26.2429 13.5342 26.2429C10.1527 26.2429 6.90966 24.8996 4.51857 22.5085C2.12748 20.1174 0.78418 16.8744 0.78418 13.4929C0.78418 10.1114 2.12748 6.8684 4.51857 4.47731ZM13.5342 2.24292C10.5505 2.24292 7.68901 3.42818 5.57923 5.53797C3.46944 7.64775 2.28418 10.5092 2.28418 13.4929C2.28418 16.4766 3.46944 19.3381 5.57923 21.4479C7.68901 23.5577 10.5505 24.7429 13.5342 24.7429C16.5179 24.7429 19.3793 23.5577 21.4891 21.4479C23.5989 19.3381 24.7842 16.4766 24.7842 13.4929C24.7842 10.5092 23.5989 7.64775 21.4891 5.53797C19.3793 3.42818 16.5179 2.24292 13.5342 2.24292ZM13.5342 8.45728C13.9484 8.45728 14.2842 8.79306 14.2842 9.20728V13.1823L19.4211 18.3204C19.714 18.6133 19.7139 19.0882 19.421 19.381C19.1281 19.6739 18.6532 19.6738 18.3604 19.3809L13.0099 14.0293C12.9858 14.0057 12.9632 13.9805 12.9424 13.9538C12.9084 13.9103 12.8799 13.8639 12.8569 13.8155C12.8106 13.7184 12.7845 13.6098 12.7842 13.4952C12.7842 13.4944 12.7842 13.4937 12.7842 13.493V13.4923V9.20728C12.7842 8.79306 13.12 8.45728 13.5342 8.45728Z' fill='%23666'/%3E%3C/svg%3E");
          background-size: contain;
          width: 18px;
          height: 18px;
          display: inline-block;
          margin-right: 8px;
        }
      }
    }
  }
}

::v-deep .accordion__content {
  .btn.primary {
    margin: 0 0 48px 0;
  }
}
</style>
