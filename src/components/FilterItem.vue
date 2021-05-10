<template>
<div class="is-flex is-justify-content-space-between filter-item">
    <p class="text">
        {{ filter.displayName }}
    </p>
    <vb-switch type="success" size="large" v-model="filter.isChecked"/>
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
