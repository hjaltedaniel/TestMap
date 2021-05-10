<template>
<div class="container filter-view">
    <FilterItem v-for="item in filters" :key="item.name" :filter="item"/>
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
              isChecked: false
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
              displayName: "Kan bookes",
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
    background-color: white;
}
.field {
    display: flex;
}
.is-divider {
    margin: 0;
}
</style>
