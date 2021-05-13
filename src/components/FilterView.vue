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
          filters: [
            {
              name: "openNow",
              displayName: "Åben nu",
              isChecked: true
            },
            {
              name: "quickTest",
              displayName: "Kviktest",
              isChecked: false
            },
            {
              name: "disabledParking",
              displayName: "Handicapparkering",
              isChecked: false
            },
            {
              name: "levelAccess",
              displayName: "Niveufri adgang",
              isChecked: false
            },
            {
              name: "bookable",
              displayName: "Tidsbestilling kræves",
              isChecked: false
            },
            {
              name: "24hr",
              displayName: "Døgnåben",
              isChecked: false
            }
          ]
      };
    },
  methods: {
      ClearFilters() {
          this.filters.forEach((element => element.isChecked = false))
          this.$emit('clearFilters')
      },
      SaveFilters () {
          this.$emit('filterMap', this.filters)
      }
  },
  computed: {
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
