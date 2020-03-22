<template>
  <section class="station-app">
    <header class="station-app-header">
      <router-link to="/station/new" class="station-app-header-link">Create A Station</router-link>
      <!-- filter and whatnot -->
      <station-filter class="station-app-header-filter-cmp"></station-filter>
    </header>
    <section class="station-app-list-wrap">
      <station-list :stations="stations"></station-list>
    </section>

    <station-app-player
      class="station-app-player"
      :playlist="playlist"
      @playingStatusChanged="updatePlayigStatus"
    ></station-app-player>
  </section>
</template>

<script>
import stationList from "../cmps/station-list.cmp";
import stationFilter from "../cmps/station-filter.cmp";
import stationAppPlayer from "@/cmps/station-app-player.cmp";

export default {
  data() {
    return {
      playlist: [
        "jHfOqqQ1DLQ",
        "eZXS8Jpkiac",
        "naoknj1ebqI",
        "7s65Zc6ULbo",
        "l9BxObmqejw"
      ]
    };
  },
  computed: {
    stations() {
      return this.$store.getters.stations;
    }
    // isPlaying() {
    //   return this.$store.getters.isPlaying;
    // },
  },
  methods: {
    updatePlayigStatus(bool) {
      this.$store.commit("setIsPlaying", bool);
    }
  },
  components: {
    stationList,
    stationAppPlayer,
    stationFilter
  }
};
</script> 






<style scoped>
/* .station-app-header {
  height: 35vh;
  background-color: #5cdb95;
  margin-bottom: 20px;
}
.staions-app-list-wrap {
  max-width: 960px;
  padding: 0 20px 0 20px;
  margin: auto;
  position: sticky;
}
.station-app-player {
  position: fixed;
  bottom: 0;
  width: 100vw;
} */
</style>