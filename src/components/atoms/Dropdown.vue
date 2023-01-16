<template>
  <div class="checkbox-select">
    <div class="checkbox-select__trigger" :class="{ isActive: activeTrigger }"
         @click="toggleDropdown">
      <span
        class="checkbox-select__title">{{ (checkedFilters.length > 0) ? checkedFilters.join(', ') : 'Please select' }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
        <path
          d="M121.3 34.6c-1.6-1.6-4.2-1.6-5.8 0l-51 51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l53.9 53.9c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2.1-5.8z"/>
      </svg>
    </div>
    <div id="dropdown" class="checkbox-select__dropdown" :class="{ activeSearch: showLoader }">
      <ul id="customScroll" class="checkbox-select__filters-wrapp" data-simplebar-auto-hide="false">
        <li v-for="(filter, index) in filteredList" :key="index">
          <div class="checkbox-select__check-wrapp">
            <input :id="index" class="conditions-check" v-model="checkedFilters" :value="filter"
                   type="checkbox">
            <label :for="index">{{ filter }}</label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'Dropdown',
  components: {},
  //---------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------
  props: {
    filters: Array,
    dropdownLabel: String,
  },
  //---------------------------------------------------
  //
  //  Data model
  //
  //---------------------------------------------------
  data() {
    return {
      search: '',
      checkedFilters: [],
      allSelected: false,
      selectAllText: 'Select All',
      activeTrigger: false,
      dropdown: false,
      showLoader: false,
    };
  },
  //---------------------------------------------------
  //
  //  Computed Properties
  //
  //---------------------------------------------------
  computed: {
    filteredList() {
      return this.filters.filter((item) => item.toLowerCase()
        .includes(this.search.toLowerCase()));
    },
  },
  //---------------------------------------------------
  //
  //  Watch Properties
  //
  //---------------------------------------------------
  watch: {
    checkedFilters(newVal) {
      this.$emit('input', newVal);
    },
  },
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
    // const customScroll = new SimpleBar(document.getElementById('customScroll'));
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
    toggleDropdown() {
      if (this.dropdown === false) {
        this.dropdown = true;
        this.activeTrigger = true;
        window.addEventListener('click', this.handleClick);
        gsap.fromTo('#dropdown', {
          opacity: 0,
          visibility: 'hidden',
          y: -100,
        }, {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          duration: 0.25,
        });
      } else {
        window.removeEventListener('click', this.handleClick);
        this.dropdown = false;
        this.activeTrigger = false;
        gsap.to('#dropdown', {
          duration: 0.25,
          autoAlpha: 0,
          y: -10,
        });
      }
    },
    //----------------------------------
    // Event Handlers
    //----------------------------------
    handleClick(evt) {
      if (!this.$el.contains(evt.target)) {
        window.removeEventListener('click', this.handleClick);
        this.dropdown = false;
        this.activeTrigger = false;
        gsap.to('#dropdown', {
          duration: 0.25,
          autoAlpha: 0,
          y: -10,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox-select {
  position: relative;
  max-width: 310px;
  width: 100%;
  z-index: 11000;

  @media only screen and (max-width: 600px) {
    max-width: 100%;
  }

  &__trigger {
    padding: 11px 10px 11px 20px;
    width: calc(100% - 32px);
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    border: 1px solid #ccc;
    background: #fff;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.4s ease;
    user-select: none;
    @media only screen and (max-width: 600px) {
      padding: 10px 15px;
      // height: 70px;
    }

    &.isActive {
      background: #fff;

      svg {
        transform: rotate(-180deg);
      }
    }

    &:hover {
      // background: #f4f4f4;
    }

    svg {
      width: 14px;
      stroke: 2px;
      transition: all 0.4s ease;
      @media only screen and (max-width: 600px) {
        width: 22px;
      }
    }
  }

  &__title {
    flex: 1;
    padding-right: 25px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    @media only screen and (max-width: 600px) {
      // font-size: 19px;
    }
  }

  &__dropdown {
    opacity: 0;
    visibility: hidden;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    box-shadow: 0 12px 15px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    // padding-bottom: 25px;

    &:after,
    &:before {
      position: absolute;
      content: "";
      top: 0;
      display: block;
      height: 4px;
      z-index: 1;
    }

    &:after {
      opacity: 0;
      left: -200px;
      width: 200px;
      background-color: #2980b9;
      transition: opacity 0.3s ease;
      animation: load 1.8s linear infinite;
    }

    &:before {
      width: 100%;
      background-color: #f5f5f5;
    }

    &.activeSearch {
      &:after {
        opacity: 1;
      }
    }

    .simplebar-scrollbar {
      width: 3px;
      right: 1px;
    }
  }

  &__col {
    display: flex;
    font-size: 12px;
    padding: 0 25px;
    justify-content: space-between;
    text-transform: uppercase;
    @media only screen and (max-width: 600px) {
      padding: 0 15px;
    }
  }

  &__filters-wrapp {
    margin-top: 20px;
    // height: 157px;
    // overflow-y: auto;
    list-style-type: none;
    padding-left: 0;
  }

  &__check-wrapp {
    position: relative;
    padding: 0 25px;
    margin-bottom: 5px;
    @media only screen and (max-width: 600px) {
      padding: 0 15px;
    }

    input[type="checkbox"] {
      display: none;

      & + label {
        position: relative;
        cursor: pointer;
        font-size: 16px;
        line-height: 22px;
        padding-left: 30px;
        display: inline-block;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: padding 0.25s ease;

        &:after {
          border: solid 2px #ccc;
          content: "";
          width: 22px;
          height: 22px;
          top: 0;
          left: 0;
          position: absolute;
        }

        &:before {
          width: 18px;
          height: 18px;
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          background-color: var(--color-blue);
          opacity: 0;
          will-change: transform;
          transform: scale(0.5);
          transition: all 0.2s ease;
        }

        &:hover {
          padding-left: 32px;
        }
      }

      &:checked {
        & + label {
          &:before {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
    }
  }
}

@keyframes load {
  0% {
    left: -200px;
    width: 20%;
  }
  50% {
    width: 40%;
  }
  70% {
    width: 60%;
  }
  80% {
    left: 50%;
  }
  95% {
    left: 120%;
  }
  100% {
    left: 100%;
  }
}

.link {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 20px;
  z-index: 9999;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
  }

  .fa {
    font-size: 28px;
    margin-right: 8px;
    color: #fff;
  }
}
</style>
