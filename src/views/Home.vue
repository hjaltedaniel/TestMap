<template>
<div class="app-container is-flex is-flex-direction-column" v-if="isFetching == false">
  <Header v-on:filterMap="FilterMap"/>
  <div class="map">
    <TestMap :centres="centres" v-bind:selectedCenter.sync="selectedCenter"/>
    <CenterModal v-if="selectedCenter != null" :center="selectedCenter" v-bind:selectedCenter.sync="selectedCenter"/>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import TestMap from '../components/TestMap'
import Header from '../components/Header'
import CenterModal from '../components/CenterModal'

  export default {
    data() {
      return {
        isFetching: true,
        isCenterModalActive: true,
        centres: null,
        filters: null,
        filteredCenters: null,
        selectedCenter: null
      };
    },
    components: {
      TestMap,
      CenterModal,
      Header
    },
    methods: {
      FilterMap(e) {
        let filteredCenters = this.centres;
        e.forEach(filter => {
          if(filter.name == "openNow" && filter.isChecked == true) {
            console.log("Open now filter active")
          }
          else if(filter.name == "quickTest" && filter.isChecked == true) {
            filteredCenters = this.FilterByAntigen(filteredCenters);
          }
          else if(filter.name == "disabledParking" && filter.isChecked == true) {
            filteredCenters = this.FilterByDisabledParking(filteredCenters);
          }
          else if(filter.name == "levelAccess" && filter.isChecked == true) {
            filteredCenters = this.FilterByLevelFreeAccess(filteredCenters);
          }
          else if(filter.name == "levelAccess" && filter.isChecked == true) {
            filteredCenters = this.FilterByLevelFreeAccess(filteredCenters);
            console.log(filteredCenters)
          }
          else if(filter.name == "bookable" && filter.isChecked == true) {
            console.log("Bookable filter active");
          }
          else if(filter.name == "24hr" && filter.isChecked == true) {
            console.log("24 hr filter active");
          }
        });
        this.filteredCenters = filteredCenters;
        this.filters = e;
      },
      FilterByAntigen(centers) {
        return centers.filter(center => center.type == "Antigen");
      },
      FilterByDisabledParking(centers) {
        return centers.filter(center => center.disabledParking == "true");
      },
      FilterByLevelFreeAccess(centers) {
        return centers.filter(center => center.levelFreeAccess == "true");
      }
    },
    mounted() {
      this.$nextTick(() => {
        //this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
      });
      axios
        .get('https://covid-19-kort.dk/testcentre.json')
        .then(response => (this.centres = response.data.centres, this.isFetching = false))
    },
  };
</script>
<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
}
.map {
  height: 100%;
}

#filter-button {
  position: fixed;
  background-color: white;
  padding: 5px;
  border-radius: 2px;
  box-shadow: 1px black;
  right: 0;
  margin: 10px;
  height: 20px;
  width: 20px;
  z-index: 401;
}
.filter-modal {
  position: fixed;
  top: 0;
  z-index: 402;
  background-color: white;
  width: 100px;
  height: 100px;
}
</style>
