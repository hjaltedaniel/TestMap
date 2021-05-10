<template>
<div class="is-flex is-justify-content-space-between">
    <p class="text">
        {{ filter.displayName }}
    </p>
    <div class="field">
        <input :id="filter.name" type="checkbox" :name="filter.name" class="switch is-rounded is-outlined" :checked="filter.isChecked">
        <label :for="filter.name"></label>
    </div> 
</div>
</template>

<script>
export default {
  name: 'FilterItem',
  props: {
      filter: Object
  },
  methods: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.field {
    display: flex;
}
.is-divider {
    margin: 0;
}
</style>
