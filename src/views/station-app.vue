<template>
  <section class="station-app">
    <header class="station-app-header">
      <!-- also make astation input? -->
      <!-- filter and whatnot -->
    </header>
    <section class="sliders-wrap">
      <station-slider
        v-if="stations"
        :stations="stations"
        :isPlaying="isPlaying"
      ></station-slider>
    </section>

    <station-app-player class="station-app-player" :playlist="playlist"></station-app-player>
  </section>
</template>

<script>
import stationSlider from "@/cmps/station-slider.cmp";
import stationAppPlayer from "@/cmps/station-app-player.cmp";

export default {
  data() {
    return {
      // this i gonna come from the store and should be a list of stations not a playlist
      playlist: [
        "naoknj1ebqI",
        "eZXS8Jpkiac",
        "jHfOqqQ1DLQ",
        "7s65Zc6ULbo",
        "l9BxObmqejw"
      ]
    };
  },
  computed: {
    stations() {
      return this.$store.getters.stations;
    },
    isPlaying() {
      return this.$store.getters.isPlaying;
    },
    // playlistIds() {
    //   return this.station.songs.map(song => song.embedId);
    // }
  },
  // methods: {
  //   setPlaying(bool) {
  //     // this has a bug - btn dosnt always work
  //     // this.$store.commit('setIsPlaying', bool)
  //   },
  //   async getStation(stationId) {      
  //     const station = await this.$store.dispatch({
  //       type: "loadStation",
  //       stationId
  //     });
  //     this.station = station;
  //   }
  // },
  components: {
    stationSlider,
    stationAppPlayer
  }
};
</script> 






<style scoped>
.station-app-header {
  height: 35vh;
  background-color: #5cdb95;
}
.sliders-wrap {
  max-width: 700px;
  padding: 0 20px 0 20px;
  margin: auto;
  position: sticky;
}
.station-app-player {
  position: fixed;
  bottom: 0;
  width: 100vw;
}
</style>