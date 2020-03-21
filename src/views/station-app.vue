<template>
  <section class="station-app">
    <header class="station-app-header">
      <!-- also make astation input? -->
      <!-- filter and whatnot -->
    </header>
    <section class="sliders-wrap">
      <station-app-slider :stations="playlist"></station-app-slider>
      <station-app-slider :stations="playlist"></station-app-slider>
      <station-app-slider :stations="playlist"></station-app-slider>
    </section>

    <station-app-player class="station-app-player" :playlist="playlist"></station-app-player>
  </section>
</template>

<script>
import stationAppSlider from "@/cmps/station-app-slider.cmp";
import stationAppPlayer from '@/cmps/station-app-player.cmp'

export default {
  props: {},
  data() {
    return {
      // this i gonna come from the store and should be a list of stations not a playlist
      playlist: [
        "naoknj1ebqI",
        "eZXS8Jpkiac",
        "jHfOqqQ1DLQ",
        "7s65Zc6ULbo",
        "l9BxObmqejw"
      ],
    };
  },
  components: {
    stationAppSlider,
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
.station-app-player{
  position: fixed;
  bottom: 0;
  width: 100vw;
}
</style>