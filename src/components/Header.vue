<template>
<div>
  <nav class="grid-nav__container">
  <p class="grid-nav__item has-text-centered">
    <span class="link is-info" v-on:click="isFilterView = true" v-if="!isFilterView">Filtre</span>
    <span class="link is-info" v-on:click="isFilterView = false" v-if="isFilterView">Luk</span>
  </p>
  <h1 class="grid-nav__item has-text-centered">
    <img src="@/assets/virus.svg"/>
  </h1>
  <p class="grid-nav__item has-text-centered">
    <span class="link is-info" v-on:click="isSearchView = true">Søg</span>
  </p>
</nav>
<FilterView v-on:filterMap="SaveFilters" v-on:clearFilters="ClearFilters" v-if="isFilterView" />
</div>
</template>

<script>
import FilterView from '../components/FilterView'
export default {
    name: 'Header',
    data() {
        return {
            isFilterView: false,
            isSearchView: false
        };
    },
    methods: {
      SaveFilters (e) {
        this.isFilterView = false;
        this.$emit('filterMap', e)
      },
      ClearFilters () {
        this.isFilterView = false;
        this.$emit('clearFilters')
      }
    },
    components: {
        FilterView
    }
}
</script>

<style scoped lang="scss">

.logo {
    font-family: 'Abel', sans-serif;
    font-size: 30px;
    text-transform: uppercase;
    color: grey;
    font-weight: bold;
}
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
}
</style>