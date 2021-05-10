<template>
<transition name="fade">
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card is-centered">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ center.testcenterName }}</p>
        <button class="delete" aria-label="close" v-on:click="removeSelectedCenter()"></button>
      </header>
      <section class="modal-card-body">
        <address>{{center.address}}</address><br>
        <p><strong>Type:</strong> {{ center.type }}</p>
        <p><strong>Tidsbestilling påkrævet:</strong> {{ isBookable(center.bookingLink) }}</p><br>
        <p>{{ center.description }}</p><br>
        <table class="table">
          <tbody>
            <tr :class="{ 'is-selected': isToday(day.day) }" v-for="day in center.openingHours" :key="day.day">
              <th>{{ convertToDanishDay(day.day) }}</th>
              <td>{{day.timeStart}} - {{day.timeEnd}}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <footer class="modal-card-foot is-vcentered">
        <a class="button is-link" target="_blank" :href="center.directionsLink">Navigér til testcenter</a>
        <a class="button is-link" v-if="center.bookingLink" target="_blank" :href="center.bookingLink">Book tid!</a>
        <a class="button is-link" target="_blank" v-if="center.waitingTimeLink != null" :href="center.waitingTimeLink">Se ventetid</a>
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
    isBookable: function(bool) {
      if(bool != null) {
        return "Ja"
      }
      else {
        return "Nej"
      }
    }
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
</style>
