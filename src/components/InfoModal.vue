<template>
<transition name="fade">
<div class="modal">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box">
      <a  href="https://bulma.io/made-with-bulma/">
        <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24">
      </a>
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
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
  },
  mounted() {
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
