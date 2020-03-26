<template>
  <section class="station-app">
    <header class="station-app-header">
      <router-link to="/station/new" class="station-app-header-link btn">Create A Station</router-link>
      <station-filter @emitingFilter="setFilter" @emitingSort="setSort" class="station-app-header-filter-cmp"></station-filter>
    </header>
    <div class="container">
      <h2 class="station-app-list-title">Browse {{chosenLable}} Stations!</h2>
      <loader v-if="inProgress"></loader>
      <station-list :stations="stations"></station-list>
    </div>

<!-- Controler and Player -->
    <div class="station-app-youtube">
      <youtube ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>

<!-- TODO upgrade fade into slide up with fade (?) -->
<transition name="fade">
    <station-app-player v-if="currStation"
      class="station-app-player"
      :elPlayer="elPlayer"
      :currStation="currStation"
      :currSong="currSong"
      :playerEv="playerEvNum"
      @playingStatusChanged="updatePlayigStatus"
      @songChanged="sendCurrSong"
      @timeElapsed="sendNewTime"
    ></station-app-player>
</transition>
<!-- Controler and Player -->
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
      playerEvNum: -1,
      elPlayer: null,
      playerVars: {
        // TODO: make video quality lowest for faster loading time
      }
    };
  },
  computed: {
    stations() {
      return this.$store.getters.stations;
    },
    currStation() {
      return this.$store.getters.currStation;
    },
    chosenLable() {
      return "All"; 
    },
    inProgress() {
      return this.$store.getters.inProgress;
    },
    currSong(){
      return this.$store.getters.currSong
    }
  },
  methods: {
    // <!-- Controler and Player Functions -->

    setupYoutubePlayer() {
      this.elPlayer = this.$refs.youtube.player;
      this.elPlayer.addEventListener("onStateChange", this.handleStateChange);
    },
    handleStateChange(ev) {
      this.playerEvNum = ev.data
    },
    updatePlayigStatus(bool) {
      this.$store.commit("setIsPlaying", bool);
    },
    sendNewTime(timeObj){
      this.$store.commit("setNewTime", timeObj);
    },
    sendCurrSong(song) {      
      this.$store.commit("setCurrSong", song);
    },
    // <!-- Controler and Player Functions -->
    setFilter() {
      console.log("Sending Filter");
    },
    setSort() {
      console.log("Sorting dat shit");
    }
  },
  mounted(){
    this.setupYoutubePlayer()
    
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

<style scoped>

.station-app-youtube{
  display: none;
}

</style>