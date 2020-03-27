<template>
  <section class="genre-cubes container" v-if="topLabels.length">
    <h3 class="genre-cubes-header">Most Poupular Genres</h3>
    <div class="genre-cubes-container">
      <div
        v-for="(label, idx) in topLabels"
        :key="idx"
        class="genre-cubes-container-card ratio-square"
        :style="labelImg(label)"
        @click="stationAppFiltered">
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
      console.log('entered labelImg')
      const imgUrl =
        require(`@/assets/imgs/labels/${label}.jpg`) ||
        require("@/assets/imgs/labels/default.jpg");
      return `background-image: url(${imgUrl});`;
    },
    getTopLabels(stations) {
      var labelsMap = stations.reduce((acc, station) => {
        station.labels.forEach(label => {
          if (!acc[label]) acc[label] = 0;
          acc[label]++;
        });
        return acc;
      }, {});
      labelsMap = utilService.orderMap(labelsMap);
      let topLabels = Object.keys(labelsMap).slice(0, 3);
      // return topLabels;
      return ['rock', 'rap', 'disco']
    },
    stationAppFiltered() {
      this.$router.push(`/station`);
    }
  },
  created() {
    this.topLabels = this.getTopLabels(this.stations);
    console.log('topLabels',this.topLabels)
  }
};
</script>

<style scoped>
</style>
