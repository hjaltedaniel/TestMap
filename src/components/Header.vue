<template>
<div>
  <nav class="level is-mobile header">
  <p class="level-item has-text-centered">
    <span class="link is-info" v-on:click="isFilterView = true" v-if="!isFilterView">Filtre</span>
    <span class="link is-info" v-on:click="isFilterView = false" v-if="isFilterView">Luk</span>
  </p>
  <h1 class="level-item has-text-centered">
    <a class="link is-info logo">Testkort.dk</a>
  </h1>
  <p class="level-item has-text-centered">
    <span class="link is-info" v-on:click="isSearchView = true">Søg</span>
  </p>
</nav>
<FilterView v-if="isFilterView" />
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
    components: {
        FilterView
    }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');

.logo {
    font-family: 'Abel', sans-serif;
    font-size: 30px;
    text-transform: uppercase;
    color: grey;
    font-weight: bold;
}
.header {
    margin-bottom: 10px !important;
}
</style>