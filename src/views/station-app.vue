<template>
  <section class="station-app">
    <header class="station-app-header">
      <!-- also make astation input? -->
      <!-- filter and whatnot -->
    </header>
    <section class="staions-app-list-wrap">
      <station-list :stations="stations"></station-list>
    </section>

    <station-app-player class="station-app-player" :playlist="playlist"></station-app-player>
  </section>
</template>

<script>
import stationList from '../cmps/station-list.cmp'
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
    },
    // isPlaying() {
    //   return this.$store.getters.isPlaying;
    // },
  },
  methods: {
    // getSongIds(songs) {
    //   const readyPlaylist = songs.map(song => song.embedId);
    //   this.playlist = readyPlaylist
    //   console.log('mapped', readyPlaylist);
    // }
  },
  components: {
    stationList,
    stationAppPlayer
  }
};
</script> 






<style scoped>
.station-app-header {
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
}
</style>