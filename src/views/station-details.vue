<template>
  <section v-if="station" class="station-details">
    <div class="container">
    <section class="station-details-player">
      <playlist-player :currSong="currSong" @next-song="nextSong"></playlist-player>
      <div class="station-details-player-playlist">
        <ul>
          <draggable v-model="playlist" @start="drag=true" @end="drag=false">
            <transition-group>
              <li v-for="(song, idx) in station.songs" :key="idx" class="drag-item">
                <span>{{song.title}}</span>
                <button @click="removeSong(idx)">&times;</button>
                <button @click="playSong(idx)">&#9654;</button>
              </li>
            </transition-group>
          </draggable>
        </ul>
      </div>
    </section>

    <aside class="station-details-side-window">
      <nav>
        <router-link class="station-details-side-window-link chat" :to="'/station/' + station._id ">Chat</router-link>
        <router-link
          class="station-details-side-window-link search" 
          v-if="isStationOwner"
          :to="'/station/' + station._id + '/search'"
        >Search Song</router-link>
        <router-link
          class="station-details-side-window-link settings"
          v-if="isStationOwner"
          :to="'/station/' + station._id + '/settings'"
        >Settings</router-link>
      </nav>
      <router-view @add-song="addSong" class="station-details-side-window-content"></router-view>
    </aside>
    </div>
  </section>
</template>

<script>
import playlistPlayer from "@/cmps/playlist-player.cmp.vue";
import { stationService } from "@/services/station.service";
import { eventBusService } from "@/services/event-bus.service";
import draggable from 'vuedraggable';


export default {
  data() {
    return {
      station: null,
      isStationOwner: false,
      currSong: null,
    };
  },
  computed: {
    playlist: {   
     get() {
       return this.station.songs;
     },
     async set(val) {
       this.station.songs = JSON.parse(JSON.stringify(val)); 
       const savedStation = await this.$store.dispatch({type: 'updateStation', station: JSON.parse(JSON.stringify(this.station))});
       this.station = JSON.parse(JSON.stringify(savedStation));
     }
    },
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
      this.currSong = {embedId: this.station.songs[0].embedId, idx: 0}
      if (!this.station._id) eventBusService.$emit('station-opened');
      if (!this.station.owner) { /// else check if it's loggedInUser
      if (this.$store.getters.LocalOwnerStationIds && this.$store.getters.LocalOwnerStationIds.includes(this.station._id)) this.isStationOwner = true;
      }
    },
    async addSong(song) {
      this.station.songs.push(song);
      const savedStation = await this.$store.dispatch({type: 'updateStation', station: JSON.parse(JSON.stringify(this.station))});
      this.station = JSON.parse(JSON.stringify(savedStation));
    },
    async removeSong(idx) {
      this.station.songs.splice(idx, 1);
      const savedStation = await this.$store.dispatch({type: 'updateStation', station: JSON.parse(JSON.stringify(this.station))});
      this.station = savedStation;
    },
    playSong(idx) {
      eventBusService.$emit('play-song', idx);
    },
    nextSong(idx){
      idx++
      this.currSong = {embedId: this.station.songs[idx], idx: idx}
      console.log('inside details curr song', this.currSong)
    }
  },
  created() {
    const stationId = this.$route.params.id;
    this.loadStation(stationId);
    eventBusService.$on('create-station', async ({ type, title }) => {
      this.station.type = type;
      this.station.title = title;

      const newStation = await this.$store.dispatch({
        type: 'addStation',
        station: JSON.parse(JSON.stringify(this.station))
      });
      this.$router.push('/station/' + newStation._id);
      this.loadStation(newStation._id);
    });
  },
  components: {
    playlistPlayer,
    draggable
  }
};
</script>

