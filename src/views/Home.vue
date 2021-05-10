<template>
<div class="map" v-if="isFetching == false">
  <Header/>
  <TestMap :centres="centres" v-bind:selectedCenter.sync="selectedCenter"/>
  <CenterModal v-if="selectedCenter != null" :center="selectedCenter" v-bind:selectedCenter.sync="selectedCenter"/>
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
        selectedCenter: null
      };
    },
    components: {
      TestMap,
      CenterModal,
      Header
    },
    methods: {
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
.map {
  width: 100vw;
  height: 100vh;
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
