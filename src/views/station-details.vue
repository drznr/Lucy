<template>
  <section class="station-details">
    <playlist-player></playlist-player>
    <router-view></router-view>
  </section>
</template>

<script>
import playlistPlayer from "@/cmps/playlist-player.cmp.vue";
import { stationService } from '@/services/station.service';

export default {
  data() {
    return {

      station: null
    };
  },
  computed: {},
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

