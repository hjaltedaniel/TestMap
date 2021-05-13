<template>
<div class=" filter-view">
    <FilterItem v-for="item in filters" :key="item.name" :filter="item" :model="item"/>
    <div class="level is-mobile">
        <div class="level-item">
            <button class="button is-success is-fullwidth filter-button" v-on:click="SaveFilters()">Gem filtre</button>
        </div>
        <div class="level-item">
            <button class="button is-danger is-fullwidth filter-button" v-on:click="ClearFilters()">Ryd filtre</button>
        </div>
    </div>
</div>
</template>

<script>
import FilterItem from '../components/FilterItem'

export default {
  name: 'FilterView',
  props: {
  },
      data() {
      return {
      };
    },
  methods: {
      ClearFilters() {
          this.$emit('clearFilters')
          var filters = this.filters;
          filters.forEach((element => element.isChecked = false))
          this.$store.commit('setFilters', filters)
      },
      SaveFilters () {
          this.$emit('filterMap', this.filters)
      }
  },
  computed: {
    filters: function() {
      return this.$store.state.filters
    }
  },
  components: {
      FilterItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-view {
    position: fixed;
    z-index: 1001;
    height: 100vh;
    width: 100vw;
    padding: 2rem;
    background-color: white;
}
</style>
