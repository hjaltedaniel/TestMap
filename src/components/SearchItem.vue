<template>
<div v-on:click="changeSelectedCenter(center)" class="card">
  <header class="card-header">
    <p class="card-header-title is-justify-content-space-between">
      {{center.testcenterName }}
      <span class="tag is-danger" v-if="isClosed(center.openingHours)">Lukket</span>
      <span class="tag is-success" v-if="!isClosed(center.openingHours)">Åben</span>
    </p>
  </header>
  <div class="card-content">
    <div class="content is-flex is-align-content-center	">
      <address>{{center.address}}</address>
      <p class="distance has-text-right has-text-weight-bold is-size-5	">{{ Math.round(center.distance * 100)/100 }} km.</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
      center: Object
  },
  methods: {
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
    changeSelectedCenter: function(c) {
      this.$emit('changeSelectedCenter', c)
    }
  },
  components: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  margin-bottom: 20px;
  margin-top: 20px;
}
.distance {
  width: 50%; 
}
</style>
