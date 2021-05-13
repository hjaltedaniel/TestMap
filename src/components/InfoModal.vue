<template>
<transition name="fade">
<div class="modal">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box has-text-centered	">
      <img src="@/assets/virus.svg" />
      <h1 class="is-uppercase">Testkort webapp</h1>
      <p class="is-size-7">Version 1.0.0</p><br>
      <p>Udvikling og idé af <a href="https://github.com/hjaltedaniel">Hjalte Daniel Hansen</a></p>
      <p>Ikoner og data er lånt fra <a href="https://covid-19-kort.dk">covid-19-kort.dk</a></p><br>
      <p>Spørgsmål og kommentarer kan sendes til <a href="mailto:testkort@hjaltedaniel.io">testkort@hjaltedaniel.io</a></p><br>
      <a  href="https://bulma.io/made-with-bulma/">
        <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24">
      </a>
    </div>
  </div>
  <button class="modal-close is-large" v-on:click="hideInfo()" aria-label="close"></button>
</div>
</transition>
</template>

<script>
export default {
  name: 'InfoModal',
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
    hideInfo() {
      this.$emit('hideInfo')
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal {
  display: flex;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
