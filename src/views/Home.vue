<template>
<div class="app-container is-flex is-flex-direction-column" v-if="isFetching == false">
  <Header v-on:filterMap="FilterMap" v-on:clearFilters="ClearFilters" :centers="centres" v-on:changeSelectedCenter="changeSelectedCenter" v-bind:selectedCenter.sync="selectedCenter"/>
  <div class="map">
    <TestMap :centres="GetCentersToPopulateMap()" v-on:showInfo="showInfo = true" v-bind:selectedCenter.sync="selectedCenter"/>
    <CenterModal v-if="selectedCenter != null" :center="selectedCenter" v-bind:selectedCenter.sync="selectedCenter"/>
    <InfoModal v-if="showInfo" v-on:hideInfo="showInfo = false"/>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import TestMap from '../components/TestMap'
import Header from '../components/Header'
import CenterModal from '../components/CenterModal'
import InfoModal from '../components/InfoModal'

  export default {
    data() {
      return {
        isFetching: true,
        centres: null,
        carelinkCenters: null,
        cphMedCenters: null,
        filteredCenters: null,
        selectedCenter: null,
        showInfo: false
      };
    },
    components: {
      TestMap,
      CenterModal,
      Header,
      InfoModal
    },
    methods: {
      changeSelectedCenter: function(e) {
        this.selectedCenter = e;
      },
      FilterMap(e) {
        let filteredCenters = this.enrichtedCenters;
        e.forEach(filter => {
          if(filter.name == "openNow" && filter.isChecked == true) {
            filteredCenters = this.FilterByOpen(filteredCenters);
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
          else if(filter.name == "bookable" && filter.isChecked == true) {
            filteredCenters = this.FilterByBookable(filteredCenters);
          }
        });
        this.filteredCenters = filteredCenters;
      },
      GetCentersToPopulateMap() {
        if(this.filteredCenters != null) {
          return this.filteredCenters;
        }
        else {
          return this.enrichtedCenters;
        }
      },
      FilterByOpen(centers) {
        let now = new Date();
        let day = null;
        let filteredByDay;
        switch (now.getDay()) {
        case 0:
          day = "Sunday";
          filteredByDay = centers.filter(center => center.openSunday == true);
          break;
        case 1:
          day = "Monday";
          filteredByDay = centers.filter(center => center.openMonday == true);
          break;
        case 2:
          day = "Tuesday";
          filteredByDay = centers.filter(center => center.openTuesday == true);
          break;
        case 3:
          day = "Wednesday";
          filteredByDay = centers.filter(center => center.openWednesday == true);
          break;
        case 4:
          day = "Thursday";
          filteredByDay = centers.filter(center => center.openThursday == true);
          break;
        case 5:
          day = "Friday";
          filteredByDay = centers.filter(center => center.openFriday == true);
          break;
        case 6:
          day = "Saturday";
          filteredByDay = centers.filter(center => center.openSaturday == true);
      }

      let time = this.FixClock(now.getHours()) + ":" + this.FixClock(now.getMinutes()) + ":" + this.FixClock(now.getSeconds());
      
      const openCenters = [];

      filteredByDay.forEach(center => {
        let openingHours = this.GetTodayOpeningHours(center, day);
        if(time >= openingHours[0].timeStart && time <= openingHours[0].timeEnd) {
          openCenters.push(center);
        }
      });

      return openCenters;
      },

      FixClock(num) {
        if(num <= 9) {
          return "0" + num;
        }
        else {
          return num;
        }
      },
      GetTodayOpeningHours(center, day) {
        return center.openingHours.filter(hour => hour.day == day)
      },
      FilterByAntigen(centers) {
        return centers.filter(center => center.type == "Antigen");
      },
      FilterByDisabledParking(centers) {
        return centers.filter(center => center.disabledParking == true);
      },
      FilterByLevelFreeAccess(centers) {
        return centers.filter(center => center.levelFreeAccess == true);
      },
      FilterByBookable(centers) {
        return centers.filter(center => center.bookingLink != null);
      },
      FilterBy24hrOpen(centers) {
        let filtered;
        centers.forEach(center => {
          center.openingHours.forEach(day => {
            if(day.timeStart == "00:00:00" && day.timeEnd == "00:00:00") {
              filtered.push(center);
            }
          })
        });
      },
      ClearFilters() {
        this.filters = null;
        this.filteredCenters = null;
      },
      setPosition: function(position) {
        this.$store.commit('setUserLocation', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      getLoad : function(center) {
        var load = null;

        if(center.company == "Carelink") {
          var carelink = this.carelinkCenters;
          var centerAddress = center.street + " " + center.streetNumber
          var clCenter = carelink.filter(c => {
            return c.Address.includes(centerAddress) || c.Name.includes(center.testcenterName)
          })
          if(clCenter[0] != null) {
            return clCenter[0].Load;
          }
          else {
            return null
          }
        }
        else if(center.company == "Copenhagen Medical") {
          var cphmed = this.cphMedCenters;
          var centerAddress2 = center.street + " " + center.streetNumber
          var cmCenter = cphmed.filter(c => {
            return c.streetaddress.includes(centerAddress2) || c.name.includes(center.testcenterName)
          })
          if(cmCenter[0] != null) {
            return this.setCphMedLoad(cmCenter[0].description);
          }
          else {
            return null
          }
        }
        else {
          return load
        }
      },
      setCphMedLoad: function(desc) {
        switch (desc) {
          case "🟢 Estimeret kø: 0 - 15 min":
            return 1
          case "🟡 Estimeret kø: 15 - 30 min":
            return 2;
          case "🟠 Estimeret kø: 30 - 60 min":
            return 3
          case "":
            return null;
        }
      }
    },
    computed: {
      filters: function() {
        return this.$store.state.filters
      },
      enrichtedCenters: function () {
        var centers = this.centres;
        centers.forEach(center => {
          center.load = this.getLoad(center)
        });
        return centers;
      },
    },
    watch: {
      filters: function(val) {
        this.FilterMap(val);
      }
    },
    mounted() {
      this.$nextTick(() => {
        navigator.geolocation.getCurrentPosition(this.setPosition);
      });
      axios
        .get('https://covid-19-kort.dk/testcentre.json')
        .then(response => (this.centres = response.data.centres));
      axios
        .get('https://fileupload.carelink.dk/activefeed.json')
        .then(response => (this.carelinkCenters = response.data));
      axios
        .get('https://api2.storepoint.co/v1/16055d043d2f37/locations')
        .then(response => (this.cphMedCenters = response.data.results.locations, this.isFetching = false));
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
