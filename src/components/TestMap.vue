<template>
  <l-map ref="testMap" 
  :center= "userLocation"
  :zoom="zoom"
  style="position: sticky; height: 100%; width: 100%;">
    <l-tile-layer
      :url="url"
      :attribution="attribution"
    />
    <v-locatecontrol/>
    <l-control class="leaflet-control-info leaflet-bar leaflet-control" :position="'bottomleft'">
      <a class="leaflet-bar-part leaflet-bar-part-single" title="Se info om kortet">
        <span class="fas fa-info-circle"></span>
      </a>
    </l-control>
    <l-marker-cluster>
      <l-marker 
        v-for="centre in centres" 
        :key="centre.id" 
        :lat-lng="getCoordinates(centre.latitude, centre.longitude)"
        :icon="getIcon(centre.type)"
        v-on:click="changeSelectedCenter(centre)"
        >
      </l-marker>
    </l-marker-cluster>
  </l-map>
</template>

<script>
import { latLng, icon } from "leaflet";
 
export default {
  name: 'TestMap',
  props: {
    centres: Array
  },
  data() {
      return {
        selectedCenter: Object,
        zoom: 12,
        center: latLng(55.906, 11.041),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          showInfo: true
      };
  },
  methods: {
    getCoordinates(lat, long) {
      return latLng(lat, long)
    },
    getIcon(type) {
      if(type == "Antigen")
      return icon({
        iconUrl: "https://covid-19-kort.dk/img/hurtigtest.png",
        iconSize: [20, 20],
        iconAnchor: [20, 20]
      })
      else if (type == "PCR") {
        return icon({
        iconUrl: "https://covid-19-kort.dk/img/pcr.png",
        iconSize: [20, 20],
        iconAnchor: [20, 20]
      })
      }
    },
    changeSelectedCenter: function (c) {
      this.$emit('update:selectedCenter', this.selectedCenter = c)
    }
  },
  computed: {
    userLocation: function() {
      return latLng(this.$store.state.location.latitude, this.$store.state.location.longitude)
    }
  },
  mounted() {
    this.$nextTick(() => {
  });
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
