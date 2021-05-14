<template>
<transition name="fade">
  <div class="modal">
    <div class="modal-background" v-on:click="removeSelectedCenter()"></div>
    <div class="modal-card is-centered">
      <header class="modal-card-head">
        <p class="modal-card-title" id="testcenterName"> {{ getCenterName(center.testcenterName) }}
          <span id="ruler"></span>
        </p>
        <button class="delete" aria-label="close" v-on:click="removeSelectedCenter()"></button>
      </header>
      <section class="modal-card-body">
        <address>{{center.address}}</address><br>
        <div class="notification is-danger" v-if=isClosed(center.openingHours)>
          <strong>OBS:</strong> Testcentret er lukket lige nu! Se åbningstider nedenfor.
        </div>
        <p>{{ center.description }}</p>
        <h1>Faciliteter:</h1>
        <table class="table is-fullwidth">
          <tbody>
            <tr>
              <th class="has-text-left">Type</th>
              <td class="has-text-right">{{ center.type }}</td>
            </tr>
            <tr>
              <th class="has-text-left">Tidsbestilling påkrævet</th>
              <td class="has-text-right">{{ isBookable(center.bookingLink) }}</td>
            </tr>
            <tr>
              <th class="has-text-left">Niveaufri adgang</th>
              <td class="has-text-right">{{ yesOrNo(center.levelFreeAccess) }}</td>
            </tr>
            <tr>
              <th class="has-text-left">Handicapparkering</th>
              <td class="has-text-right">{{ yesOrNo(center.disabledParking) }}</td>
            </tr>
          </tbody>
        </table>
        <h1>Åbningstider:</h1>
        <table class="table is-fullwidth">
          <tbody>
            <tr :class="{ 'is-selected': isToday(day.day) }" v-for="day in center.openingHours" :key="day.day">
              <th class="has-text-left">{{ convertToDanishDay(day.day) }}</th>
              <td class="has-text-right">{{day.timeStart}} - {{day.timeEnd}}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-flex-start	">
        <a class="button is-primary" target="_blank" :href="center.directionsLink">Vis vej</a>
        <a class="button is-primary" v-if="center.bookingLink" target="_blank" :href="center.bookingLink">Book tid</a>
        <a class="button is-primary" target="_blank" v-if="center.waitingTimeLink != null" :href="center.waitingTimeLink">Se ventetid</a>
      </footer>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'CenterModal',
  props: {
    center: Object
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      centerNameWidth: null
    }
  },
  methods: {
    removeSelectedCenter: function () {
      this.$emit('update:selectedCenter', this.selectedCenter = null)
    },
    convertToDanishDay: function(day) {
      switch (day) {
        case "Monday":
          return "Mandag"
        case "Tuesday":
          return "Tirsdag"
        case "Wednesday":
          return "Onsdag"
        case "Thursday":
          return "Torsdag"
        case "Friday":
          return "Fredag"
        case "Saturday":
          return "Lørdag"
        case "Sunday":
          return "Søndag"
      }
    },
    isToday(d) {
        let now = new Date();
        let day = null;
        switch (now.getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }

      if(d == day) {
        return true;
      }
      else {
        return false;
      }
    },
    isClosed(openingHours) {
        let now = new Date();
        let day = null;
        switch (now.getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }

      let time = this.FixClock(now.getHours()) + ":" + this.FixClock(now.getMinutes()) + ":" + this.FixClock(now.getSeconds());

      let todayOpeningHours = openingHours.filter(hour => hour.day == day)
      if(todayOpeningHours.length == 0) {
        return true
      }
      else if(time <= todayOpeningHours[0].timeStart && time <= todayOpeningHours[0].timeEnd) {
        return true;
      }
      else {
        return false;
      }
    },
    FixClock(num) {
        if(num <= 9) {
          return "0" + num;
        }
        else {
          return num;
        }
    },
    isBookable: function(bool) {
      if(bool != null) {
        return "Ja"
      }
      else {
        return "Nej"
      }
    },
    yesOrNo: function(bool) {
      if(bool) {
        return "Ja"
      }
      else {
        return "Nej"
      }
    },
    getCenterName: function(text) {
      if(this.centerNameWidth != null) {
        if((this.windowWidth -50) < this.centerNameWidth) {
          var length = text.length;
          var factor = this.centerNameWidth / length;
          var newLength = Math.round((this.windowWidth - 100) / factor);
          return this.truncateString(text, newLength)
        }
        else {
          return text;
        }
        }
      },
    truncateString: function (str, num) {
      if (str.length <= num) {
        return str
      }
        return str.slice(0, num) + '...'
      }
  },
  mounted() {
  this.$nextTick(function () {
      var centerName = this.center.testcenterName;
      var ruler = document.getElementById("ruler");
      ruler.innerHTML = centerName;
      this.centerNameWidth = ruler.offsetWidth;
  })
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.delete {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
}
#ruler { 
  visibility: hidden; 
  white-space: nowrap; }
</style>
