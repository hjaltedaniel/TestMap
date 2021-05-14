<template>
<div class="search-view">
  <input type="text" class="input" v-model="search" placeholder="Søg..."/>
  <SearchItem v-on:changeSelectedCenter="changeSelectedCenter" v-for="item in selectCenters " :key="item.id" :center="item"/>
</div>
</template>

<script>
import SearchItem from '../components/SearchItem'

export default {
  name: 'SearchView',
  props: {
    centers: Array
  },
      data() {
      return {
        search: null
      };
    },
  methods: {
    toRad: function (Value) {
      return Value * Math.PI / 180;
    },
    getDistance: function (lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var dlat1 = this.toRad(lat1);
      var dlat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(dlat1) * Math.cos(dlat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    },
    changeSelectedCenter: function (e) {
      this.$emit('selectedCenter', e)
    }
  },
  computed: {
    distancedCenters: function () {
      var centers = this.centers;
      centers.forEach(center => {
        center.distance = this.getDistance(this.location.latitude, this.location.longitude, center.latitude, center.longitude)
      });
      return centers.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
    },
    location: function() {
      return this.$store.state.location
    },
    filteredCenters() {
      return this.distancedCenters.filter(center => {
        return center.testcenterName.toLowerCase().includes(this.search.toLowerCase()) || center.address.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    selectCenters() {
      if(this.search != null) {
        return this.filteredCenters
      }
      else {
        return this.distancedCenters
      }
    }
  },
  components: {
    SearchItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search-view {
    position: fixed;
    z-index: 1001;
    height: 100vh;
    width: 100vw;
    padding: 2rem;
    background-color: white;
    overflow: scroll;
}
</style>
