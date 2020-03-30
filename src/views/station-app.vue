<template>
  <section class="station-app">
    <header class="station-app-header">
      <station-filter @emitingFilter="setFilter" class="station-app-header-filter-cmp"></station-filter>
    </header>
    <div class="container">
      <h2 class="station-app-list-title">Browse Stations!</h2>
      <loader v-if="inProgress"></loader>
      <span>
        <station-list :stations="stations"></station-list>
        <h2 v-if="userStations.length" class="station-app-list-title">My Stations!</h2>
        <station-slider v-if="userStations.length" :stations="userStations"></station-slider>
      </span>
    </div>

<!-- Controler and Player -->
    <div class="station-app-player">
      <youtube ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>

<!-- TODO upgrade fade into slide up with fade (?) -->
<transition name="fade">
    <player-controller v-if="currStation"
      class="player-controller"
      :elPlayer="elPlayer"
      :currStation="currStation"
      :currSong="currSong"
      :playerEv="playerEvNum"
      @playingStatusChanged="updatePlayigStatus"
      @songChanged="sendCurrSong"
      @timeElapsed="sendNewTime"
    ></player-controller>
</transition>
<!-- Controler and Player -->
  </section>
</template>
 
<script>
import stationList from "../cmps/station-list.cmp";
import stationFilter from "../cmps/station-filter.cmp";
import stationSlider from "@/cmps/station-slider.cmp";
import playerController from "@/cmps/player-controller.cmp";
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
    inProgress() {
      return this.$store.getters.inProgress;
    },
    currSong() {
      return this.$store.getters.currSong;
    },
    loggedInUser() {
      return this.$store.getters.loggedUser;
    },
    userStations() {
      if (this.loggedInUser) return this.$store.getters.stations.filter(station => station.owner && station.owner._id === this.loggedInUser._id);
      else {
        const stationIds = this.$store.getters.LocalOwnerStationIds;
        if (!stationIds) return [];
        return stationIds.reduce((acc, id) => {
            const ownStation = this.$store.getters.stations.find(station => station._id === id);  
            if (ownStation) acc.push(ownStation);
            return acc;
        }, []); 
      };
    }
  },
  methods: {
    // <!-- Controler and Player Functions -->

    setupYoutubePlayer() {
      this.elPlayer = this.$refs.youtube.player;
      this.elPlayer.addEventListener("onStateChange", this.handleStateChange);
    },
    handleStateChange(ev) {
      this.playerEvNum = ev.data;
    },
    updatePlayigStatus(bool) {
      this.$store.commit("setIsPlaying", bool);
    },
    sendNewTime(timeObj) {
      this.$store.commit("setNewTime", timeObj); 
    },
    sendCurrSong(song) {
      this.$store.commit("setCurrSong", song);
    },
    // <!-- Controler and Player Functions -->
    setFilter(filterBy) {
      this.$store.dispatch({
        type: "loadStations",
        filterBy
      });
    }
  },
  mounted() {
    this.setupYoutubePlayer();

    eventBusService.$on("UPDATE_CURR_STATION", currStation => {
      this.$store.commit("setCurrStation", currStation);
    });
  },
  destroyed() {
    eventBusService.$off("UPDATE_CURR_STATION");
  },
  components: {
    stationList,
    playerController,
    stationFilter,
    stationSlider,
    loader
  }
};
</script> 

<style scoped>

.station-app-player {
  display: none;
}
</style>