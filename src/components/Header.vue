<template>
<div>
  <nav class="grid-nav__container">
  <p class="grid-nav__item has-text-centered">
    <span class="link is-info" v-on:click="isFilterView = true, isSearchView = false" v-if="!isFilterView"><i class="fas fa-filter"></i></span>
    <span class="link is-info" v-on:click="isFilterView = false" v-if="isFilterView"><i class="fas fa-times"></i></span>
  </p>
  <h1 class="grid-nav__item has-text-centered">
    <img src="@/assets/virus.svg"/>
  </h1>
  <p class="grid-nav__item has-text-centered">
    <span class="link is-info" v-on:click="isSearchView = true, isFilterView = false" v-if="!isSearchView"><i class="fas fa-search"></i></span>
    <span class="link is-info" v-on:click="isSearchView = false" v-if="isSearchView"><i class="fas fa-times"></i></span>
  </p>
</nav>
<FilterView v-on:filterMap="SaveFilters" v-on:clearFilters="ClearFilters" v-if="isFilterView" />
<SearchView v-on:selectedCenter="changeSelectedCenter" v-if="isSearchView" :centers="centers" />
</div>
</template>

<script>
import FilterView from '../components/FilterView'
import SearchView from '../components/SearchView'
export default {
    name: 'Header',
    data() {
        return {
            isFilterView: false,
            isSearchView: false
        };
    },
    props: {
      centers: Array
    },
    methods: {
      SaveFilters (e) {
        this.isFilterView = false;
        this.$emit('filterMap', e)
      },
      ClearFilters () {
        this.isFilterView = false;
        this.$emit('clearFilters')
      },
      changeSelectedCenter(e) {
        this.isSearchView = false;
        this.$emit('changeSelectedCenter', e)
      }
    },
    components: {
        FilterView,
        SearchView
    }
}
</script>

<style scoped lang="scss">
.header {
    margin-bottom: 10px !important;
    height: 100%;
}
.grid-nav {
  &__container {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    align-items: center;
    height: 75px;
  }
  &__item {
    color: rgba(0, 65, 90, 1);
  }
}
</style>