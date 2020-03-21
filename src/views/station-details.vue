<template>
  <section class="station-details">
    <playlist-player></playlist-player>
    <router-view></router-view>
  </section>
</template>

<script>
import playlistPlayer from "@/cmps/playlist-player.cmp.vue";
export default {
  data() {
    return {

      station: null
    };
  },
  computed: {},
  methods: {
    async loadStation() {
      const stationId = this.$route.params.id;
      if (stationId) {
        const station = await this.$store.dispatch({
          type: "loadStation",
          stationId
        });
        this.station = station;
      }
    }
  },
  created() {
    const stationId = this.$route.params.id;
      
  },
  components: {
    playlistPlayer
  }
}
</script>

<style scoped>
</style>

