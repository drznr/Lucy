<template>
  <section class="genre-cubes">
    <h3 class="genre-cubes-header">Most Poupular Genres</h3>
    <div class="genre-cubes-container">
      <div
        v-for="(label, idx) in topLabels"
        :key="idx"
        class="genre-cubes-container-card ratio-square"
        :style="labelImg(label)"
        @click="stationAppFiltered"
      >
        <h4 class="genre-cubes-container-card-title">{{label}}</h4>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "@/services/util.service";
export default {
  props: { stations: Array },
  data() {
    return {
      topLabels: []
    };
  },
  methods: {
    labelImg(label) {
      const imgUrl =
        // require(`@/assets/imgs/labels/${label}.jpg`) ||
        require("@/assets/imgs/labels/default.jpg");
      return `background-image: url(${imgUrl});`;
    },
    getTopLabels(stations) {
      const labelsMap = stations.reduce((acc, station) => {
        station.labels.forEach(label => {
          if (!acc[label]) acc[label] = 0;
          acc[label]++;
        });
        return acc;
      }, {});
      const sorted = utilService.orderMap(labelsMap);
      const topLabels = Object.keys(sorted).slice(0, 3);
      return topLabels;
    },
    stationAppFiltered() {
      this.$router.push(`/station`);
    }
  },
  created() {
    this.topLabels = this.getTopLabels(this.stations);
  }
};
</script>

<style scoped>
</style>
