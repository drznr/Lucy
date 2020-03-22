<template>
  <section v-if="station" class="station-details">
    <div class="container">
    <section class="station-details-player">
      <playlist-player :playlist="playlistIds"></playlist-player>
      <div class="station-details-player-playlist">
        <ul>
          <li v-for="(song, idx) in station.songs" :key="idx">
            {{song.title}}
            <button @click="removeSong(idx)">x</button>
          </li>
        </ul>
      </div>
    </section>

    <aside class="station-details-side-window">
      <nav>
        <router-link class="station-details-side-window-link chat" :to="'/station/' + station._id ">Chat</router-link>
        <router-link
          class="station-details-side-window-link search"
          :to="'/station/' + station._id + '/search'"
        >Search Song</router-link>
        <router-link
          class="station-details-side-window-link settings"
          :to="'/station/' + station._id + '/settings'"
        >Settings</router-link>
      </nav>
      <router-view @add-song="addSong"></router-view>
    </aside>
    </div>
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
    },
    routesProps() {   /// PASS PROPS TO ROUTER VIEW WITH THIS
      switch (this.$route.name) {
        case 'station-settings':
          break;
        case 'search-song':
            return
          break;
        case 'chat-room':
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
      this.station = JSON.parse(JSON.stringify(station));            
      if (!this.station._id) eventBusService.$emit('station-opened');
    },
    async addSong(song) {
      this.station.songs.push(song);
      const savedStation = await this.$store.dispatch({type: 'saveStation', station: JSON.parse(JSON.stringify(this.station))});
      this.station = JSON.parse(JSON.stringify(savedStation));
    },
    async removeSong(idx) {
      this.station.songs.splice(idx, 1);
      const savedStation = await this.$store.dispatch({type: 'saveStation', station: JSON.parse(JSON.stringify(this.station))});
      this.station = savedStation;
    } 
  },
  created() {
    const stationId = this.$route.params.id;
    this.loadStation(stationId);
    eventBusService.$on('create-station', async ({ type, title }) => {
      this.station.type = type;
      this.station.title = title;
      const newStation = await this.$store.dispatch({
        type: 'saveStation',
        station: JSON.parse(JSON.stringify(this.station))
      });
      this.$router.push('/station/' + newStation._id);
      this.loadStation(newStation._id);
    });
  },
  components: {
    playlistPlayer
  }
};
</script>

<style scoped>
</style>

