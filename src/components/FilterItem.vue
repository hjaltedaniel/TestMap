<template>
<div class="card filter-item">
  <header class="card-header">
    <p class="card-header-title is-justify-content-space-between">
      {{ filter.displayName }}
      <vb-switch type="success" size="large" v-model="filter.isChecked"/>
    </p>
  </header>
</div>
</template>

<script>
import VbSwitch from 'vue-bulma-switch'
export default {
  name: 'FilterItem',
  props: {
      filter: Object
  },
  methods: {
    change (val) {
      this.text = val ? 'Right' : 'Wrong'
    }
  },
  components: {
      VbSwitch
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-item {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>
