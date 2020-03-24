<template>
  <section v-if="station" class="station-details">
    <div class="container">
      <station-player 
        :station="station" 
        :currSong="currSong" 
        :isStationOwner="isStationOwner"
        @order-changed="setPlaylist"
        @song-removed="removeSong"
        @switched-song="setCurrSong"
        ></station-player>

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
      <router-view @add-song="addSong" :routesProps="routesProps" class="station-details-side-window-content"></router-view>

    </aside>
    </div>
  </section>
</template>

<script>
import { stationService } from "@/services/station.service";
import { eventBusService } from "@/services/event-bus.service";
import stationPlayer from '@/cmps/station-player.cmp';


export default {
  data() {
    return {
      station: null,
      isStationOwner: false,
      currSong: null
    };
  },
  computed: {
    routesProps() {   
      switch (this.$route.name) {
        case 'station-settings': { return { station: this.station }}
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
      this.currSong = (this.station.songs && this.station.songs.length) ? {embedId: this.station.songs[0].embedId, idx: 0, title: this.station.songs[0].title} : null;
      if (!this.station._id) eventBusService.$emit('station-opened');
      if (!this.station.owner) { /// else check if it's loggedInUser
      if (this.$store.getters.LocalOwnerStationIds && this.$store.getters.LocalOwnerStationIds.includes(this.station._id)) this.isStationOwner = true;
      }
    },
    async setPlaylist(val) {
      this.station.songs = JSON.parse(JSON.stringify(val)); 
      const savedStation = await this.$store.dispatch({type: 'updateStation', station: JSON.parse(JSON.stringify(this.station))});
      this.station = JSON.parse(JSON.stringify(savedStation)); 
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
    setCurrSong(song) { 
      this.currSong = song;
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
    stationPlayer
  }
};
</script>
