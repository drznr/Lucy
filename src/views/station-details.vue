<template>
  <section v-if="station" class="station-details">
    <playlist-player :playlist="playlistIds"></playlist-player>
    <router-view></router-view>
  </section>
</template>

<script>
import playlistPlayer from "@/cmps/playlist-player.cmp.vue";
import { stationService } from '@/services/station.service';
import { eventBusService } from '@/services/event-bus.service';

export default {
  data() {
    return {
      station: null
    };
  },
  computed: {
      playlistIds(){
        return this.station.songs.map(song => song.embedId);
      }
  },
  methods: {
    async loadStation(stationId) {
        const station = await this.$store.dispatch({
          type: 'loadStation',
          stationId
        });
        this.station = station; 
      }
  },
  created() {
    const stationId = this.$route.params.id;
    if (stationId && stationId !== 'new') this.loadStation(stationId);
    else this.station = stationService.getNewStation();
  },
  components: {
    playlistPlayer
  }
}
</script>

<style scoped>
</style>

