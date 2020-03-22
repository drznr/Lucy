<template>
  <section v-if="station" class="station-details container">
    <section class="-player-container">
      <playlist-player :playlist="playlistIds"></playlist-player>
      <div class="-songs-container">
        <ul>
          <li>Song1</li>
          <li>Song2</li>
          <li>Song3</li>
        </ul>
      </div>
    </section>
    
    <section class="-side-window">
      <nav>
        <router-link :to="'/station/' + station._id ">Chat</router-link>|
        <router-link :to="'/station/' + station._id + '/search'">Search Song</router-link>
      </nav>
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import playlistPlayer from "@/cmps/playlist-player.cmp.vue";
import { stationService } from "@/services/station.service";
import { eventBusService } from "@/services/event-bus.service";

export default {
  data() {
    return {
      station: null
    };
  },
  computed: {
    playlistIds() {
      return this.station.songs.map(song => song.embedId);
    }
  },
  methods: {
    async loadStation(stationId) {
      const station = await this.$store.dispatch({
        type: "loadStation",
        stationId 
      });
      this.station = station;
    }
  },
  created() {
    const stationId = this.$route.params.id;
    if (stationId && stationId !== "new") this.loadStation(stationId);
    else {
      this.station = stationService.getNewStation();
      eventBusService.$emit('open-station-info');
      }
  },
  components: {
    playlistPlayer
  }
};
</script>

<style scoped>
</style>

