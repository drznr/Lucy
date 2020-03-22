<template>
  <section v-if="station" class="station-details container">
    <section class="station-details-player">
      <playlist-player :playlist="playlistIds"></playlist-player>
      <div class="station-details-player-playlist">
        <ul>
          <li v-for="(song, idx) in station.songs" :key="idx">
            {{song.title}}
            <button @click="removeSong(song)">x</button>
          </li>
        </ul>
      </div>
    </section>

    <section class="station-details-side-window">
      <nav>
        <router-link class="station-details-side-window-link" :to="'/station/' + station._id ">Chat</router-link>|
        <router-link
          class="station-details-side-window-link"
          :to="'/station/' + station._id + '/search'"
        >Search Song</router-link>|
        <router-link
          class="station-details-side-window-link"
          :to="'/station/' + station._id + '/settings'"
        >Settings</router-link>
      </nav>
      <router-view @add-song="addSong"></router-view>
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
      station: null,
      youtubeSongs: []
    };
  },
  computed: {
    playlistIds() {
      return this.station.songs.map(song => song.embedId);
    },
    routesProps() {   /// PASS PROPS TO ROUTER VIEW WITH THIS
      switch (this.$route.params) {
        case 'station-settings':
          break;
        case 'search-song':
            return
          break;
        case 'char-room':
          break;
        default:
          break;
      }
    }
  },
  methods: {
    async loadStation(stationId) {
      const station = await this.$store.dispatch({
        type: 'loadStation',
        stationId
      });
      this.station = station || stationService.getNewStation();
    },
    async addSong(song) {
      console.log(song.snippet.title, 'will be added soon!');
    },
    async removeSong(song) {
      console.log(song.title, 'will be removed soon!');
    }
  },
  created() {
    const stationId = this.$route.params.id;
    this.loadStation(stationId);
  },
  components: {
    playlistPlayer
  }
};
</script>

<style scoped>
</style>

