<template>
  <section class="station-list">
    <station-preview v-for="station in stations" :station="station" v-bind:key="station._id"></station-preview>
  </section>
</template>
 
<script>
import stationPreview from "./station-preview.cmp";

export default {
  name: "station-list",
  props: {
    stations: {
      type: Array
    }
  },
  components: {
    stationPreview
  }
};
</script>

<style scoped>

</style>