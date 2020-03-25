<template>
  <section class="station-app">
    <header class="station-app-header">
      <router-link to="/station/new" class="station-app-header-link btn">Create A Station</router-link>
      <station-filter @emitingFilter="setFilter" class="station-app-header-filter-cmp"></station-filter>
    </header>
    <div class="container">
      <h2 class="station-app-list-title">Browse {{chosenLable}} Stations!</h2>
      <loader v-if="inProgress"></loader>
      <station-list :stations="stations"></station-list>
    </div>

    <station-app-player
      class="station-app-player"
      :playlist="playlist"
      :currSong="currSong"
      @playingStatusChanged="updatePlayigStatus"
      @emitCurrSongId="sendCurrSong"
    ></station-app-player>
  </section>
</template>

<script>
import stationList from "../cmps/station-list.cmp";
import stationFilter from "../cmps/station-filter.cmp";
import stationAppPlayer from "@/cmps/station-app-player.cmp";
import loader from "../cmps/icons/loader.cmp";
import { eventBusService } from "@/services/event-bus.service";

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
    chosenLable() {
      return "All"; 
    },
    inProgress() {
      return this.$store.getters.inProgress;
    },
    currSong(){
      return this.$store.getters.currSong;
    }
  },
  methods: {
    updatePlayigStatus(bool) {
      this.$store.commit("setIsPlaying", bool);
    },
    sendCurrSong(songId){      
      this.$store.commit("setCurrSong", songId);
    },
    setFilter(filterBy){
      this.$store.dispatch({
        type: 'loadStations',
        filterBy
      });
    }
  },
  mounted(){
    eventBusService.$on("UPDATE_CURR_STATION", currStation => {
       this.$store.commit("setCurrStation", currStation)
    });
  },
  components: {
    stationList,
    stationAppPlayer,
    stationFilter,
    loader
  }
};
</script> 