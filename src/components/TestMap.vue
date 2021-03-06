<template>
  <l-map ref="testMap" 
  :center= "center"
  :zoom="zoom"
  style="position: sticky; height: 100%; width: 100%;">
    <l-tile-layer
      :url="url"
      :attribution="attribution"
    />
    <v-locatecontrol/>
    <l-control  class="leaflet-control-info leaflet-bar leaflet-control" :position="'bottomleft'">
      <a class="leaflet-bar-part leaflet-bar-part-single" v-on:click="showInfo()" title="Se info om kortet">
        <span class="fas fa-info-circle"></span>
      </a>
    </l-control>
    <l-control  class="leaflet-control-info leaflet-bar leaflet-control is-flex signatur" :position="'bottomright'">
      <div class="info">
      <div class="is-flex info__item">
        <img alt="PCR" title="undefined" src="https://covid-19-kort.dk/img/pcr.png"><span>PCR</span>
      </div>
      <div class="is-flex info__item">
        <img alt="Hurtigtest" title="undefined" src="https://covid-19-kort.dk/img/hurtigtest.png"><span>Hurtigtest</span>
      </div>
    </div>
    </l-control>
    <l-marker-cluster>
      <l-marker 
        v-for="centre in centres" 
        :key="centre.id" 
        :lat-lng="getCoordinates(centre.latitude, centre.longitude)"
        :icon="getIcon(centre)"
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
        zoom: 7,
        center: latLng(55.906, 11.041),
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      };
  },
  methods: {
    getCoordinates(lat, long) {
      return latLng(lat, long)
    },
    getIcon(center) {
      if(center.type == "Antigen")
        if(center.load == 1) {
          return icon({
          iconUrl: "/img/hurtigtest-load1.png",
          iconSize: [25, 25],
          iconAnchor: [20, 20]
          })
        }
        else if(center.load == 2) {
          return icon({
          iconUrl: "/img/hurtigtest-load2.png",
          iconSize: [25, 25],
          iconAnchor: [20, 20]
          })
        }
        else if (center.load == 3) {
          return icon({
          iconUrl: "/img/hurtigtest-load3.png",
          iconSize: [25, 25],
          iconAnchor: [20, 20]
          })
        }
        else if (center.load == 4) {
          return icon({
          iconUrl: "/img/hurtigtest-load4.png",
          iconSize: [25, 25],
          iconAnchor: [20, 20]
          })
        }
        else {
        return icon({
          iconUrl: "https://covid-19-kort.dk/img/hurtigtest.png",
          iconSize: [20, 20],
          iconAnchor: [20, 20]
          })
        }

      else if (center.type == "PCR") {
        return icon({
        iconUrl: "https://covid-19-kort.dk/img/pcr.png",
        iconSize: [20, 20],
        iconAnchor: [20, 20]
      })
      }
    },
    changeSelectedCenter: function (c) {
      this.$emit('update:selectedCenter', this.selectedCenter = c)
    },
    showInfo() {
      this.$emit('showInfo')
    }
  },
  computed: {
    userLocation: function() {
      return latLng(this.$store.state.location.latitude, this.$store.state.location.longitude)
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.userLocation != null) {
        this.$refs.testMap.mapObject.setView(this.userLocation, 12);
      }
  });
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signatur {
  background-color: white; 
}
.info {
  margin: 10px 10px 0px 10px;
  &__item {
    margin-bottom: 10px;
    img {
      margin-right: 5px;
    }
  }
}
</style>
