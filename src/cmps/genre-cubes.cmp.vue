<template>
  <section v-if="topLabels" class="genre-cubes container">
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
export default {
  props: { labelsMap: Object },
  computed: {
    topLabels() {
      return Object.keys(this.labelsMap).slice(0, 3);
    }
  },
  methods: {
    labelImg(label) {
      const imgUrl =
        require(`@/assets/imgs/labels/${label}.jpg`) ||
        require("@/assets/imgs/labels/default.jpg");
      return `background-image: url(${imgUrl});`;
    },
    stationAppFiltered(){
      console.log('aaaaa')
    }
  }
};
</script>

<style scoped>
</style>
